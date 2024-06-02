using LiveScore.Model.ViewModel;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace LiveScore.Services
{
    public class TimerServices : BackgroundService
    {
        private readonly IHubContext<ScoreHub> _hubContext;
        private readonly ILogger<TimerServices> _logger;
        private readonly ConcurrentDictionary<int, TimerInfo> _timers;

        public TimerServices(IHubContext<ScoreHub> hubContext, ILogger<TimerServices> logger)
        {
            _hubContext = hubContext;
            _logger = logger;
            _timers = new ConcurrentDictionary<int, TimerInfo>();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                foreach (var timer in _timers.Values)
                {
                    if (timer.IsRunning && timer.TimeLeft > 0)
                    {
                        timer.TimeLeft--;
                        await _hubContext.Clients.Group(timer.MatchGroup.ToString()).SendAsync("TimerUpdate", timer.TimeLeft);
                    }
                    else if (timer.TimeLeft <= 0)
                    {
                        timer.IsRunning = false;
                        await _hubContext.Clients.Group(timer.MatchGroup.ToString()).SendAsync("TimerEnded");
                    }
                }

                await Task.Delay(1000, stoppingToken);
            }
        }

        public void StartTimer(int matchGroup, int duration)
        {
            var timer = _timers.GetOrAdd(matchGroup, new TimerInfo
            {
                MatchGroup = matchGroup,
                TimeLeft = duration,
                IsRunning = true
            });
            timer.TimeLeft = duration;
            timer.IsRunning = true;

            _logger.LogInformation($"Timer started for matchGroup: {matchGroup} with duration: {duration}");
        }




        public void StopTimer(int matchGroup)
        {
            if (_timers.TryGetValue(matchGroup, out var timer))
            {
                timer.IsRunning = false;
            }
        }

        public void ResumeTimer(int matchGroup)
        {
            if (_timers.TryGetValue(matchGroup, out var timer) && !timer.IsRunning)
            {
                timer.IsRunning = true;
            }
        }
    }

    public class TimerInfo
    {
        public int MatchGroup { get; set; }
        public int TimeLeft { get; set; }
        public bool IsRunning { get; set; }
    }
}

