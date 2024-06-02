using LiveScore.Data;
using LiveScore.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimerController : ControllerBase
    {
        private readonly IHubContext<ScoreHub> _hubContext;
        private readonly TimerServices _timerService;
        private readonly ApplicationDbContext _context;

        public TimerController(IHubContext<ScoreHub> hubContext, TimerServices timerService, ApplicationDbContext context)
        {
            _hubContext = hubContext;
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

        private bool MatchExists(int matchGroup)
        {
            return _context.Matchss.Any(e => e.MatchGroup == matchGroup);
        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinGroup(int matchGroup, int userId, string connectionId)
        {
            try
            {
                var match = _context.Matchss.FirstOrDefault(m => m.MatchGroup == matchGroup);
                if (match == null) return NotFound("Match not found");

                if (!IsCoordinator(matchGroup, userId) && !IsReferee1(matchGroup, userId))
                    return Forbid("Only MatchCoordinator and Referee1 can join the group");

                await _hubContext.Groups.AddToGroupAsync(connectionId, matchGroup.ToString());

                var joinDetails = new
                {
                    MatchId = match.MId,
                    UserId = userId,
                    Group = match.MatchGroup
                };

                return Ok(joinDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while adding the user to the group: {ex.Message}");
            }
        }

        [HttpPost("leave")]
        public async Task<IActionResult> LeaveGroup(int matchGroup, int userId, string connectionId)
        {
            try
            {
                var match = _context.Matchss.FirstOrDefault(m => m.MatchGroup == matchGroup);
                if (match == null) return NotFound(new { msg = "Match not found" });

                await _hubContext.Groups.RemoveFromGroupAsync(connectionId, matchGroup.ToString());
                return Ok(new { msg = "Leave the Group" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while removing the user from the group: {ex.Message}");
            }
        }

        [HttpPost("start/{matchGroup}/{userId}/{duration}")]
        public async Task<IActionResult> StartCountdown(int matchGroup, int userId, int duration)
        {
            try
            {
                Console.WriteLine(matchGroup);
                var match = _context.Matchss.FirstOrDefault(m => m.MatchGroup == matchGroup);
                if (match == null) return NotFound(new { msg = "Match not found" });

                if (!IsCoordinator(matchGroup, userId))
                    return BadRequest(new { msg = "Only MatchCoordinator can start the countdown" });

                _timerService.StartTimer(matchGroup, duration);
                await _hubContext.Clients.Group(matchGroup.ToString()).SendAsync("StartCountdown", duration);
                return Ok(new { msg = $"Timer is Start {duration}" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { msg = $"An error occurred while starting the countdown: {ex.Message}" });
            }
        }

        [HttpPost("stop/{matchGroup}/{userId}")]
        public async Task<IActionResult> StopCountdown(int matchGroup, int userId)
        {
            try
            {
                var match = _context.Matchss.FirstOrDefault(m => m.MatchGroup == matchGroup);
                if (match == null) return NotFound(new { msg = "Match not found" });

                if (!IsCoordinator(matchGroup, userId))
                    return BadRequest(new { msg = "Only MatchCoordinator can stop the countdown" });

                _timerService.StopTimer(matchGroup);
                await _hubContext.Clients.Group(matchGroup.ToString()).SendAsync("StopCountdown");
                return Ok(new { msg = "Timer is Stop" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { msg = $"An error occurred while stopping the countdown: {ex.Message}" });
            }
        }

        [HttpPost("resume/{matchGroup}/{userId}")]
        public async Task<IActionResult> ResumeCountdown(int matchGroup, int userId)
        {
            try
            {
                var match = _context.Matchss.FirstOrDefault(m => m.MatchGroup == matchGroup);
                if (match == null) return NotFound(new { msg = "Match not found" });

                if (!IsCoordinator(matchGroup, userId))
                    return BadRequest(new { msg = "Only MatchCoordinator can resume the countdown" });

                _timerService.ResumeTimer(matchGroup);
                await _hubContext.Clients.Group(matchGroup.ToString()).SendAsync("ResumeCountdown");
                return Ok(new { msg = "Timer is Resume" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while resuming the countdown: {ex.Message}");
            }
        }
    }
}
