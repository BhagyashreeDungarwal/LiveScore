using LiveScore.Data;
using LiveScoring.Model;
using Microsoft.AspNetCore.SignalR;

namespace LiveScore.Services
{
    public class ScoreHub : Hub
    {
        private readonly TimerServices _timerService;
        private readonly ApplicationDbContext _context;
        public ScoreHub(TimerServices timerService, ApplicationDbContext context)
        {
            _timerService = timerService;
            _context = context;
        }

        private bool IsCoordinator(int matchGroup, int userId)
        {
            var match = _context.Matchss.FirstOrDefault(m => m.MatchGroup == matchGroup);
            return match != null && match.MatchCoordinator == userId;
        }

        private bool IsReferee1(int matchGroup, int userId)
        {
            var match = _context.Matchss.FirstOrDefault(m => m.MatchGroup == matchGroup);
            return match != null && match.Referee1 == userId;
        }

        public async Task JoinGroup(string groupName)   
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task LeaveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task StartCountdown(int matchGroup, int duration)
        {
            _timerService.StartTimer(matchGroup, duration);
            await Clients.Group(matchGroup.ToString()).SendAsync("StartCountdown", duration);
        }

        public async Task StopCountdown(int matchGroup)
        {
            _timerService.StopTimer(matchGroup);
            await Clients.Group(matchGroup.ToString()).SendAsync("StopCountdown");
        }

        public async Task ResumeCountdown(int matchGroup)
        {
            _timerService.ResumeTimer(matchGroup);
            await Clients.Group(matchGroup.ToString()).SendAsync("ResumeCountdown");
        }
    }
}
