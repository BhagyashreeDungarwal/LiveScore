using LiveScoring.Model;
using Microsoft.AspNetCore.SignalR;

namespace LiveScore.Services
{
    public class ScoreHub : Hub
    {
        public async Task SendScoreUpdate(int matchId, int redPoints, int bluePoints)
        {
            await Clients.Group(matchId.ToString()).SendAsync("ReceiveScoreUpdate", redPoints, bluePoints);
        }

        public async Task JoinMatchGroup(int matchId, string role)
        {
            var groupName = GetGroupName(matchId, role);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task LeaveMatchGroup(int matchId, string role)
        {
            var groupName = GetGroupName(matchId, role);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        private string GetGroupName(int matchId, string role)
        {
            return $"{matchId}_{role}";
        }

    }
}
