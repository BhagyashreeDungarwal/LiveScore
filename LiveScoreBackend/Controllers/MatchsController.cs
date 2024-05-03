using LiveScore.Data;
using LiveScore.Model.ViewModel;
using LiveScoring.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
                return NotFound(new { error = "Matchs Not Found" });
            }

            return await _context.Matchss.Include((c) => c.Category)
                .Include((o) => o.AthleteBlueObj)
                .Include((o) => o.AthleteRedObj)
                .Include((t) => t.Tournament)
                .Select((a) => new {
                   mid = a.MId,
                    matchStatus = a.MatchStatus,
                    matchType = a.MatchType,
                    numberOfRound = a.NumberOfRound,
                    matchDate = a.MatchDate,
                    matchtime = a.Matchtime,
                    athleteRed = a.AthleteRedObj.AthleteName,
                    athleteBlue = a.AthleteBlueObj.AthleteName,
                    categoryId = a.Category.CategoryName,
                    tournamentId = a.Tournament.TournamentName,

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
                return BadRequest(new { error = "Invalid Match DATA" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_context.Matchss == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Matchss' is null.");
            }

           
            var match = new Matchs
            {
                MatchStatus = matchs.MatchStatus,
                MatchType = matchs.MatchType,
                NumberOfRound = matchs.NumberOfRound,
                MatchDate = matchs.MatchDate,
                Matchtime = matchs.Matchtime,
                AthleteBlue = matchs.AthleteBlue,
                AthleteRed= matchs.AthleteRed,
                CategoryId = matchs.CategoryId,
                TournamentId = matchs.TournamentId
            };
            _context.Matchss.Add(match);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMatchs", new {id = match.MId }, match);
        }

        // PUT: api/Athletes/UpdateMatch/5
        [HttpPut("UpdateMatch/{id}")]
        public async Task<IActionResult> UpdateMatch(int id, Matchs match)
        {
            if (id != match.MId)
            {
                return BadRequest();
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

        private bool MatchExists(int id)
        {
            return _context.Matchss.Any(e => e.MId == id);
        }
        //private bool MatchsExists(int id)
        //{
        //    return (_context.Matchss?.Any(e => e.MId == id)).GetValueOrDefault();
        //}

    }
}
