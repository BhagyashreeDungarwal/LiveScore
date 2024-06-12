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

        [HttpGet("GetRoundsByMatchId/{mid}")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetRoundsByMatchId(int mid)
        {
            try
            {
                var rounds = await _context.Rounds
                    .Include((a) => a.Athlete)
                    .Where(r => r.MatchId == mid)
                    .Select(r => new
                    {
                        //RoundId = r.Id,
                        Rounds = r.Rounds,
                        RoundWinner = r.Athlete.AthleteName,
                        RedTotalScore = r.RedTotalScore,
                        BlueTotalScore = r.BlueTotalScore,
                    })
                    .ToListAsync();

                if (rounds == null || !rounds.Any())
                {
                    return NotFound();
                }

                return rounds;
            }
            catch (Exception ex)
            {
                // Log the exception (you can use any logging library)
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error, please try again later.");
            }
        }


        [HttpGet("GetScoresandRounds/{mid}/{round}")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetScoresandRounds(int mid, int round)
        {
            try
            {
                var query = from score in _context.Scores
                            join roundData in _context.Rounds on score.MatchId equals roundData.Rounds
                            where score.MatchId == mid && roundData.Rounds == round
                            select new
                            {
                                sid = score.ScoreId,
                                RedPoints = score.RedPoints,
                                BluePoints = score.BluePoints,
                                RedPanelty = score.RedPanelty,
                                BluePanelty = score.BluePanelty,
                                ScoreTime = score.ScoreTime,
                                Rounds = score.Rounds,
                                AthleteRed = score.AthleteRedObj.AthleteName,
                                AthleteBlue = score.AthleteBlueObj.AthleteName,
                                MatchId = score.Match.MatchType,
                                RoundTime = roundData.RoundTime,
                                RedTotalScore = roundData.RedTotalScore,
                                BlueTotalScore = roundData.BlueTotalScore,
                                RoundWinner = roundData.RoundWinner
                            };

                var scores = await query.ToListAsync();

                if (scores == null || !scores.Any())
                {
                    // Check if there are no matches pending for the given round
                    var isRoundCompleted = await _context.Scores.AnyAsync(s => s.MatchId == mid && s.Rounds == round);
                    if (!isRoundCompleted)
                    {
                        return NotFound($"Match is pending for round {round}.");
                    }
                    else
                    {
                        return NotFound($"No scores found for match {mid} and round {round}.");
                    }
                }

                return scores;
            }
            catch (Exception ex)
            {
                // Log the exception (you can use any logging library)
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error, please try again later.");
            }
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

        [HttpPost("insertRound/{matchId}")]
        public async Task<IActionResult> InsertRound([FromBody] RoundVm roundDto, int matchId)
        {
            if (matchId == null)
            {
                return BadRequest("MatchId is required.");
            }

            // Validate the matchId exists
            var match = await _context.Matchss.FirstOrDefaultAsync(m => m.MId == matchId);
            if (match == null)
            {
                return NotFound("Match not found.");
            }

            // Update the match status
            match.MatchStatus = "Live";
            _context.Matchss.Update(match);

            // Insert initial round with user-specified values
            var initialRound = new Round
            {
                MatchId = matchId,
                Rounds = roundDto.Rounds,
                RoundTime = roundDto.RoundTime
            };

            _context.Rounds.Add(initialRound);
            await _context.SaveChangesAsync();

            return Ok(new { msg = "Round inserted and match status updated.", round = initialRound });
        }


        [HttpPost("updateRound/{matchId}/{round}")]
        public async Task<IActionResult> UpdateRound(Round roundDto, int matchId, int round)
        {
            // Validate the matchId exists
            var matchExists = await _context.Matchss.AnyAsync(m => m.MId == matchId);
            if (!matchExists)
            {
                return NotFound(new { msg = "Match not found." });
            }

            // Find the specific round to update
            var roundToUpdate = await _context.Rounds.FirstOrDefaultAsync(r => r.MatchId == matchId && r.Rounds == round);

            if (roundToUpdate == null)
            {
                return NotFound(new { msg = "Round not found." });
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
                    return BadRequest(new { msg = "RoundWinner must be one of the athletes in the match." });
                }
            }

            _context.Rounds.Update(roundToUpdate);
            await _context.SaveChangesAsync();

            if (round == 1)
            {
                var updatedRound1 = await _context.Rounds
                    .Include(r => r.Athlete) // Include the Athlete navigation property
                    .FirstOrDefaultAsync(r => r.MatchId == matchId && r.Rounds == 1);

                var roundWinnerName = updatedRound1?.Athlete?.AthleteName; // Assuming the Athlete class has a Name property

                return Ok(new { msg = "Round 1 updated successfully.", roundWinner =  roundWinnerName });
            }
            // Check if round is 2 and fetch round 1 details
            if (round == 2)
            {
                var round1 = await _context.Rounds
                    .Include(r => r.Athlete)
                    .FirstOrDefaultAsync(r => r.MatchId == matchId && r.Rounds == 1);

                if (round1 != null && round1.RoundWinner == roundDto.RoundWinner)
                {
                    var rounds = await _context.Rounds
                        .Include(r => r.Athlete) // Include the Athlete navigation property for rounds
                        .Where(r => r.MatchId == matchId)
                        .Select(r => new { r.Rounds, RoundWinnerName = r.Athlete.AthleteName })
                        .ToListAsync();
                    var roundwinnerName = round1.Athlete?.AthleteName;

                    return Ok(new { msg = "Round winner for round 2 or 3 is same as round 1", rounds , roundWinner = roundwinnerName });
                }
            }

            if (round == 3)
            {
                var round1 = await _context.Rounds
                    .Include(r => r.Athlete)
                    .FirstOrDefaultAsync(r => r.MatchId == matchId && r.Rounds == 1);

                var round2 = await _context.Rounds
                    .Include(r => r.Athlete)
                    .FirstOrDefaultAsync(r => r.MatchId == matchId && r.Rounds == 2);

                if (round1 != null && round2 != null)
                {
                    var rounds = new List<object>
            {
                new { Round = 1, RoundWinner = round1.Athlete?.AthleteName },
                new { Round = 2, RoundWinner = round2.Athlete?.AthleteName },
                new { Round = 3, RoundWinner = (roundDto.RoundWinner == match.AthleteRed ? match.AthleteRedObj.AthleteName : match.AthleteBlueObj.AthleteName) }
            };


                    // Calculate total time each athlete has spent as RoundWinner
                    var roundWinners = new List<int?> { round1.RoundWinner, round2.RoundWinner, roundDto.RoundWinner };
                    var athleteRoundTime = roundWinners
                        .GroupBy(w => w)
                        .ToDictionary(g => g.Key, g => g.Count());

                    // Determine the winner of the match
                    int? matchWinnerId = athleteRoundTime.OrderByDescending(x => x.Value).FirstOrDefault().Key;
                    var matchWinnerName = matchWinnerId.HasValue
                        ? (matchWinnerId == match.AthleteRed ? match.AthleteRedObj.AthleteName : match.AthleteBlueObj.AthleteName)
                        : null;

                    return Ok(new
                    {
                        msg = "Round 3 validation",
                        rounds,
                        roundWinner = matchWinnerName
                    });
                }
            }

            return Ok(new { msg = "Round updated successfully.", round = roundToUpdate, roundRes = roundToUpdate.Rounds });
        }


        //[HttpGet("GetRoundByMId/{MId}")]
        //public async Task<ActionResult<IEnumerable<Round>>> GetRoundByMId(int MId)
        //{
        //    // Find rounds by MatchId
        //    var rounds = await _context.Rounds.Where(r => r.MatchId == MId).ToListAsync();

        //    if (rounds == null || rounds.Count == 0)
        //    {
        //        return NotFound(new { error = "Rounds Not Found for given MId" });
        //    }

        //    return rounds;
        //}



        private bool RoundExists(int id)
        {
            return (_context.Rounds?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
