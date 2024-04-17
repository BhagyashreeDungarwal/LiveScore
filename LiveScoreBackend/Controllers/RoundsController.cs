using LiveScore.Data;
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

        [HttpGet("GetRoundById/{id}")]
        public async Task<ActionResult<Round>> GetRound(int id)
        {
            if (_context.Rounds == null)
            {
                return NotFound(new { error = "Rounds Not Found" });
            }
            var round = await _context.Rounds.FindAsync(id);
            if (round == null)
            {
                return NotFound(new { error = "Rounds Not Found" });
            }
            return round;
        }

        [HttpPost("PostRound")]
        public async Task<ActionResult<Round>> PostRound(Round round)
        {
            if (round == null)
            {
                return BadRequest(new { error = "Invalid Round DATA" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_context.Rounds == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Rounds' is null.");
            }
            _context.Rounds.Add(round);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRounds", new { id = round.Id }, round);
        }



        private bool RoundExists(int id)
        {
            return (_context.Rounds?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
