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

        //[httppost("managerounds")]
        //public async task<iactionresult> managerounds([frombody] roundvm rounddto, int matchid)
        //{
        //    if (rounddto.matchid == null)
        //    {
        //        return badrequest("matchid is required.");
        //    }

        //    // validate the matchid exists
        //    var matchexists = await _context.matchss.anyasync(m => m.mid == matchid);
        //    if (!matchexists)
        //    {
        //        return notfound("match not found.");
        //    }
        //    // get the match record
        //    var match = await _context.matchss.findasync(matchid);

        //    // initialize a list to store roundwinner values
        //    list<int?> roundwinners = new list<int?>();

        //    int r = 1;

        //    // insert initial round without sensitive fields
        //    var initialround = new round
        //    {
        //        matchid = matchid,
        //        rounds = r,
        //        roundtime = rounddto.roundtime
        //    };

        //    _context.rounds.add(initialround);
        //    await _context.savechangesasync();

        //    // loop to create and update rounds including the initial round
        //    for (r = 1; r <= 3; r++)
        //    {
        //        round roundtoupdate;

        //        if (r == 1)
        //        {
        //            roundtoupdate = initialround;
        //        }
        //        else
        //        {
        //            var newround = new round
        //            {
        //                matchid = matchid,
        //                rounds = r,
        //                roundtime = datetime.now // or set as needed
        //            };
        //            _context.rounds.add(newround);
        //            await _context.savechangesasync();
        //            roundtoupdate = newround;
        //        }


        //        // start the timer
        //        //await task.delay(12000);

        //        // simulate update logic
        //        roundtoupdate.redtotalscore = 10;
        //        roundtoupdate.bluetotalscore = 12;
        //        roundtoupdate.roundwinner = 3;

        //        // validate roundwinner
        //        if (roundtoupdate.roundwinner.hasvalue)
        //        {
        //            // check if the roundwinner is one of the athletes in the match
        //            if (roundtoupdate.roundwinner != match.athletered && roundtoupdate.roundwinner != match.athleteblue)
        //            {
        //                return badrequest("roundwinner must be one of the athletes in the match.");
        //            }
        //        }

        //        _context.rounds.update(roundtoupdate);
        //        await _context.savechangesasync();

        //        // store the roundwinner value temporarily
        //        roundwinners.add(roundtoupdate.roundwinner);

        //        // check if this is round 2 and roundwinner for round 1 and round 2 are same
        //        if (r == 2 && roundwinners[0] != roundwinners[1])
        //        {
        //            continue; // continue with round 3 if round 1 and round 2 winners are not the same
        //        }

        //        // check if this is round 2 and roundwinner for round 1 and round 2 are same
        //        if (r == 2 && roundwinners[0] == roundwinners[1])
        //        {
        //            return ok(new { message = $"the winner is: {roundwinners[0]}", allroundwinners = roundwinners });// return the winner if round 1 and round 2 winners are the same
        //        }
        //    }

        //    return ok(new { message = "rounds inserted and updated.", roundwinners = roundwinners });
        //}

        [HttpPost("insertRound")]
        public async Task<IActionResult> InsertRound([FromBody] RoundVm roundDto, int matchId)
        {
            if (roundDto.MatchId == null)
            {
                return BadRequest("MatchId is required.");
            }

            // Validate the matchId exists
            var matchExists = await _context.Matchss.AnyAsync(m => m.MId == matchId);
            if (!matchExists)
            {
                return NotFound("Match not found.");
            }

            // Insert initial round with user-specified values
            var initialRound = new Round
            {
                MatchId = matchId,
                Rounds = roundDto.Rounds ?? 1, // default to 1 if not provided
                RoundTime = roundDto.RoundTime
            };

            _context.Rounds.Add(initialRound);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Initial round inserted.", round = initialRound });
        }

        [HttpPost("updateRound")]
        public async Task<IActionResult> UpdateRound([FromBody] Round roundDto, int matchId , int round)
        {
            // Validate the matchId exists
            var matchExists = await _context.Matchss.AnyAsync(m => m.MId == matchId);
            if (!matchExists)
            {
                return NotFound("Match not found.");
            }

            // Find the specific round to update
            var roundToUpdate = await _context.Rounds.FirstOrDefaultAsync(r => r.MatchId == matchId && r.Rounds == round);

            if (roundToUpdate == null)
            {
                return NotFound("Round not found.");
            }

            // Update the specified fields
            roundToUpdate.RedTotalScore = roundDto.RedTotalScore;
            roundToUpdate.BlueTotalScore = roundDto.BlueTotalScore;
            roundToUpdate.RoundWinner = roundDto.RoundWinner;

            // Validate RoundWinner
            var match = await _context.Matchss.FindAsync(matchId);
            if (roundToUpdate.RoundWinner.HasValue)
            {
                if (roundToUpdate.RoundWinner != match.AthleteRed && roundToUpdate.RoundWinner != match.AthleteBlue)
                {
                    return BadRequest("RoundWinner must be one of the athletes in the match.");
                }
            }

            _context.Rounds.Update(roundToUpdate);
            await _context.SaveChangesAsync();
            // Check if round is 2 and fetch round 1 details
            if (round == 2 )
            {
                var round1 = await _context.Rounds.FirstOrDefaultAsync(r => r.MatchId == matchId && r.Rounds == 1);
                if (round1 != null && round1.RoundWinner == roundDto.RoundWinner)
                {
                    var rounds = await _context.Rounds.Where(r => r.MatchId == matchId).ToListAsync();
                    return Ok(new { message = "Round winner for round 2 or 3 is same as round 1", rounds });
                }
            }
            if (round == 3)
            {
                var round1 = await _context.Rounds.FirstOrDefaultAsync(r => r.MatchId == matchId && r.Rounds == 1);
                var round2 = await _context.Rounds.FirstOrDefaultAsync(r => r.MatchId == matchId && r.Rounds == 2);

                if (round1 != null && round2 != null)
                {
                    var rounds = new List<object>
                     {
                        new { Round = 1, RoundWinner = round1.RoundWinner },
                        new { Round = 2, RoundWinner = round2.RoundWinner },
                        new { Round = 3, RoundWinner = roundDto.RoundWinner }
                    };
                    // Calculate total time each athlete has spent as RoundWinner
                    var roundWinners = new List<int?> { round1.RoundWinner, round2.RoundWinner, roundDto.RoundWinner };
                    var athleteRoundTime = roundWinners
                        .GroupBy(w => w)
                        .ToDictionary(g => g.Key, g => g.Count());

                    // Determine the winner of the match
                    int? matchWinner = athleteRoundTime.OrderByDescending(x => x.Value).FirstOrDefault().Key;

                    return Ok(new
                    {
                        message = "Round 3 validation",
                        rounds,
                        mostFrequentWinner = matchWinner
                    });
                }
            }

            return Ok(new { message = "Round updated successfully.", round = roundToUpdate });
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
