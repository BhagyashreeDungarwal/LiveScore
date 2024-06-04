using LiveScore.Model.ViewModel;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Timers;

namespace LiveScore.Services
{
    public class TimerServices : ITimerService
    {
        private readonly IHubContext<ScoreHub> _hubContext;
        private readonly ILogger<TimerServices> _logger;
        private readonly ConcurrentDictionary<int, TimerInfo> _timers = new();

        public event EventHandler<int> TimerElapsed;

        public TimerServices(IHubContext<ScoreHub> hubContext, ILogger<TimerServices> logger)
        {
            _hubContext = hubContext;
            _logger = logger;
        }

        public void StartTimer(int matchGroup, int duration)
        {
            var timerInfo = _timers.GetOrAdd(matchGroup, new TimerInfo
            {
                MatchGroup = matchGroup,
                TimeLeft = duration,
                IsRunning = true
            });

            timerInfo.TimeLeft = duration;
            timerInfo.IsRunning = true;

            if (timerInfo.Timer != null)
            {
                timerInfo.Timer.Stop();
                timerInfo.Timer.Dispose();
            }

            timerInfo.Timer = new System.Timers.Timer(1000); // Timer interval set to 1 second
            timerInfo.Timer.Elapsed += (sender, e) => OnTimerElapsed(sender, e, matchGroup);
            timerInfo.Timer.AutoReset = true; // Ensure it triggers repeatedly every second
            timerInfo.Timer.Start();

            _logger.LogInformation($"Timer started for matchGroup: {matchGroup} with duration: {duration}");
        }

        private async void OnTimerElapsed(object sender, ElapsedEventArgs e, int matchGroup)
        {
            if (_timers.TryGetValue(matchGroup, out var timerInfo))
            {
                if (timerInfo.IsRunning && timerInfo.TimeLeft > 0)
                {
                    timerInfo.TimeLeft--;
                    await _hubContext.Clients.Group(timerInfo.MatchGroup.ToString()).SendAsync("TimerUpdate", timerInfo.TimeLeft);
                }
                else if (timerInfo.TimeLeft <= 0)
                {
                    timerInfo.IsRunning = false;
                    timerInfo.Timer.Stop();
                    timerInfo.Timer.Dispose();
                    _timers.TryRemove(matchGroup, out _);

                    await _hubContext.Clients.Group(timerInfo.MatchGroup.ToString()).SendAsync("TimerEnded");
                    TimerElapsed?.Invoke(this, matchGroup);
                    _logger.LogInformation($"Timer elapsed for matchGroup: {matchGroup}");
                }
            }
        }

        public void StopTimer(int matchGroup)
        {
            if (_timers.TryGetValue(matchGroup, out var timerInfo))
            {
                timerInfo.IsRunning = false;
                timerInfo.Timer.Stop();
                timerInfo.Timer.Dispose();
                _timers.TryRemove(matchGroup, out _);
                _logger.LogInformation($"Timer stopped for matchGroup: {matchGroup}");
            }
        }

        public void ResumeTimer(int matchGroup)
        {
            if (_timers.TryGetValue(matchGroup, out var timerInfo) && !timerInfo.IsRunning)
            {
                timerInfo.IsRunning = true;
                timerInfo.Timer.Start();
                _logger.LogInformation($"Timer resumed for matchGroup: {matchGroup}");
            }
        }
    }

    public interface ITimerService
    {
        void StartTimer(int matchGroup, int duration);
        event EventHandler<int> TimerElapsed;
        void StopTimer(int matchGroup);
        void ResumeTimer(int matchGroup);
    }

    public class TimerInfo
    {
        public int MatchGroup { get; set; }
        public int TimeLeft { get; set; }
        public bool IsRunning { get; set; }
        public System.Timers.Timer Timer { get; set; }
    }
}
