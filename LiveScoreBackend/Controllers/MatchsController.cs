using LiveScore.Data;
using LiveScoring.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<IEnumerable<Matchs>>> GetMatchs()
        {
            if (_context.Matchss == null)
            {
                return NotFound(new { error = "Matchs Not Found" });
            }

            return await _context.Matchss.ToListAsync();
        }

        [HttpGet("GetMatchById{id}")]
        public async Task<ActionResult<Matchs>> GetMatch(int id)
        {
            if (_context.Matchss == null)
            {
                return NotFound(new { error = "Matchs Not Found" });
            }
            var match = await _context.Matchss.FindAsync(id);
            if (match == null)
            {
                return NotFound(new { error = "Matchs Not Found" });
            }
            return match;
        }

        [HttpPost("PostMatch")]
        public async Task<ActionResult<Matchs>> PostMatch(Matchs matchs)
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
            _context.Matchss.Add(matchs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMatchs", new {id =matchs.MId },matchs);
        }



        private bool MatchsExists(int id)
        {
            return (_context.Matchss?.Any(e => e.MId == id)).GetValueOrDefault();
        }

    }
}
