using LiveScore.Data;
using LiveScore.Model.ViewModel;
using LiveScoring.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoundsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RoundsController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet("GetRounds")]
        public async Task<ActionResult<IEnumerable<Round>>> GetRounds()
        {
            if (_context.Rounds == null)
            {
                return NotFound(new { error = "Rounds Not Found" });
            }
            return await _context.Rounds.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> ManageRounds([FromBody] RoundVm roundDto, int MatchId)
        {
            if (roundDto.MatchId == null)
            {
                return BadRequest("MatchId is required.");
            }

            // Validate the MatchId exists
            var matchExists = await _context.Matchss.AnyAsync(m => m.MId == MatchId);
            if (!matchExists)
            {
                return NotFound("Match not found.");
            }
            // Get the match record
            var match = await _context.Matchss.FindAsync(MatchId);

            // Initialize a list to store RoundWinner values
            List<int?> roundWinners = new List<int?>();

            int r = 1;

            // Insert initial round without sensitive fields
            var initialRound = new Round
            {
                MatchId = MatchId,
                Rounds = r,
                RoundTime = roundDto.RoundTime
            };

            _context.Rounds.Add(initialRound);
            await _context.SaveChangesAsync();

            // Loop to create and update rounds including the initial round
            for (r = 1; r <= 3; r++)
            {
                Round roundToUpdate;

                if (r == 1)
                {
                    roundToUpdate = initialRound;
                }
                else
                {
                    var newRound = new Round
                    {
                        MatchId = MatchId,
                        Rounds = r,
                        RoundTime = DateTime.Now // or set as needed
                    };
                    _context.Rounds.Add(newRound);
                    await _context.SaveChangesAsync();
                    roundToUpdate = newRound;
                }

                // Simulate update logic
                roundToUpdate.RedTotalScore = 10;
                roundToUpdate.BlueTotalScore = 12;
                roundToUpdate.RoundWinner =3;

                // Validate RoundWinner
                if (roundToUpdate.RoundWinner.HasValue)
                {
                    // Check if the RoundWinner is one of the athletes in the match
                    if (roundToUpdate.RoundWinner != match.AthleteRed && roundToUpdate.RoundWinner != match.AthleteBlue)
                    {
                        return BadRequest("RoundWinner must be one of the athletes in the match.");
                    }
                }

                _context.Rounds.Update(roundToUpdate);
                await _context.SaveChangesAsync();

                // Store the RoundWinner value temporarily
                roundWinners.Add(roundToUpdate.RoundWinner);

                // Check if this is round 2 and RoundWinner for round 1 and round 2 are same
                if (r == 2 && roundWinners[0] != roundWinners[1])
                {
                    continue; // Continue with round 3 if round 1 and round 2 winners are not the same
                }

                // Check if this is round 2 and RoundWinner for round 1 and round 2 are same
                if (r == 2 && roundWinners[0] == roundWinners[1])
                {
                    return Ok(new { Message = $"The winner is: {roundWinners[0]}", AllRoundWinners = roundWinners });// Return the winner if round 1 and round 2 winners are the same
                }
            }

            return Ok(new { Message = "Rounds inserted and updated.", RoundWinners = roundWinners });
        }


        [HttpGet("GetRoundByMId/{MId}")]
        public async Task<ActionResult<IEnumerable<Round>>> GetRoundByMId(int MId)
        {
            // Find rounds by MatchId
            var rounds = await _context.Rounds.Where(r => r.MatchId == MId).ToListAsync();

            if (rounds == null || rounds.Count == 0)
            {
                return NotFound(new { error = "Rounds Not Found for given MId" });
            }

            return rounds;
        }


        private bool RoundExists(int id)
        {
            return (_context.Rounds?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
