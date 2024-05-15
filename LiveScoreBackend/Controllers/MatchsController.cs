using LiveScore.Data;
using LiveScore.Model.ViewModel;
using LiveScoring.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MatchsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetMatchs")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetMatchs()
        {
            if (_context.Matchss == null)
            {
                return NotFound(new { msg = "Matchs Not Found" });
            }

            return await _context.Matchss.Include((c) => c.Category)
                .Include((o) => o.AthleteBlueObj)
                .Include((o) => o.AthleteRedObj)
                .Include((t) => t.Tournament)
                .Select((a) => new {
                   mid = a.MId,
                    matchGroup = a.MatchGroup,
                    matchStatus = a.MatchStatus,
                    matchType = a.MatchType,
                    numberOfRound = a.NumberOfRound,
                    matchDate = a.MatchDate,
                    matchTime = a.Matchtime,
                    athleteRed = a.AthleteRedObj.AthleteName,
                    athleteBlue = a.AthleteBlueObj.AthleteName,
                    nextMatchId =  a.NextMatchId,
                    flag = a.Flag,                   
                    category = a.Category.CategoryName,
                    tournament = a.Tournament.TournamentName,

                }).ToListAsync();
        }

        // GET: api/Athletes/GetMatchById/5
        [HttpGet("GetMatchById/{id}")]
        public async Task<ActionResult<dynamic>> GetMatchById(int id)
        {
            var match = await _context.Matchss.Include((c) => c.Category)
                                              .Include((o) => o.AthleteRedObj)
                                              .Include((p)=> p.AthleteBlueObj)
                                              .Include((t) => t.Tournament)
                                              .Where(m => m.MId == id)
                                              .Select(m => new {
                                                  mid = m.MId,
                                                  matchStatus = m.MatchStatus,
                                                  matchType = m.MatchType,
                                                  numberOfRound = m.NumberOfRound,
                                                  matchDate = m.MatchDate,
                                                  matchtime = m.Matchtime,
                                                  athleteRed = m.AthleteRedObj.AthleteName,
                                                  athleteBlue = m.AthleteBlueObj.AthleteName,
                                                  nextMatchId = m.NextMatchId,
                                                  flag = m.Flag,
                                                  categoryId = m.Category.CategoryName,
                                                  tournamentId = m.Tournament.TournamentName
                                              })
                                              .FirstOrDefaultAsync();
            if (match == null)
            {
                return NotFound(new { error = "Match Not Found" });
            }
            return match;
        }

        [HttpPost("PostMatch")]
        public async Task<ActionResult<Matchs>> PostMatch(MatchVm matchs)
        {
            if (matchs == null)
            {
                return BadRequest(new { msg = "Please Enter All Details" });
            }

            // Validate other parameters as needed

            // Check if either AthleteRed or AthleteBlue is already participating in another match
            var existingMatch = await _context.Matchss
                .Where(m => m.MatchStatus != "Completed") // Exclude completed matches
                .FirstOrDefaultAsync(m => m.AthleteRed == matchs.AthleteRed || m.AthleteBlue == matchs.AthleteBlue);

            //if (existingMatch != null)
            //{
            //    return BadRequest(new { msg = "One of the athletes is already participating in another match." });
            //}

            try
            {
                // Call the stored procedure
                await _context.Database.ExecuteSqlRawAsync(
                    "EXEC InsertMatch @MatchStatus, @MatchType, @NumberOfRound, @MatchDate, @MatchTime, @AthleteRed, @AthleteBlue, @CategoryId, @TournamentId",
                    parameters: new[]
                    {
                        new SqlParameter("@MatchStatus", "Upcoming"),
                        new SqlParameter("@MatchType", matchs.MatchType),
                        new SqlParameter("@NumberOfRound", matchs.NumberOfRound),
                        new SqlParameter("@MatchDate", matchs.MatchDate),
                        new SqlParameter("@MatchTime", matchs.Matchtime),
                        new SqlParameter("@AthleteRed", matchs.AthleteRed),
                        new SqlParameter("@AthleteBlue", matchs.AthleteBlue),
                        new SqlParameter("@CategoryId", matchs.CategoryId),
                        new SqlParameter("@TournamentId", matchs.TournamentId)
                    });

                return Ok(new { msg = "Successfully Added Match" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "An error occurred while processing the request.", error = ex.Message });
            }
        }

        // PUT: api/Athletes/UpdateMatch/5
        [HttpPut("UpdateMatch/{id}")]
        public async Task<IActionResult> UpdateMatch(int id, Matchs match)
        {
            if (id != match.MId)
            {
                return BadRequest(new { msg = "Match Not Found" });
            }

            _context.Entry(match).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPut("UpdateNextMatchId/{id}")]
        public async Task<IActionResult> UpdateNextMatchId(int id, [FromBody] Matchs match)
        {
            if (id != match.MId)
            {
                return BadRequest(new { msg = "Match Not Found" });
            }

            try
            {
                // Call the stored procedure directly through DbContext.Database.ExecuteSqlRawAsync
                await _context.Database.ExecuteSqlRawAsync("EXEC UpdateNextMatchId @Umid, @Flag, @MatchStatus, @MatchType, @NumberOfRound",
                    new SqlParameter("@Umid",id),
                    new SqlParameter("@Flag", match.Flag),
                    new SqlParameter("@MatchStatus", match.MatchStatus),
                    new SqlParameter("@MatchType", match.MatchType),
                    new SqlParameter("@NumberOfRound", match.NumberOfRound));

                //Console.WriteLine(match.Flag);
                //Console.WriteLine(Console.ReadLine());
              
                               
                // Exclude 'MId' column from the INSERT statement
                var modifiedMatch = new Matchs
                {
                    AthleteRed = match.AthleteRed,
                    AthleteBlue = match.AthleteBlue,
                    NextMatchId = match.NextMatchId,
                    CategoryId = match.CategoryId,
                    TournamentId = match.TournamentId,
                    MatchStatus = match.MatchStatus,
                    MatchDate = match.MatchDate,
                    Matchtime = match.Matchtime
                };


                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        private bool MatchExists(int id)
        {
            return _context.Matchss.Any(e => e.MId == id);
        }
    }
}
