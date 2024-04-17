using LiveScore.Data;
using LiveScoring.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public TournamentsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetTournaments")]
        public async Task<ActionResult<IEnumerable<Tournament>>> GetTournaments()
        {
            if (_dbContext.Tournaments == null)
            {
                return NotFound(new { error = "Tournament Not Found" });
            }
            return await _dbContext.Tournaments.ToListAsync();
        }

        [HttpGet("GetTournamentById/{id}")]
        public async Task<ActionResult<Tournament>> GetTournament(int id)
        {
            if(_dbContext.Tournaments == null)
            {
                return NotFound(new {error = "Tournamnet Not Found"});
            }

            var tournament = await _dbContext.Tournaments.FindAsync(id);

            if (tournament == null)
            {
                return NotFound(new { error = "Tournamnet Not Found" });
            }
            return tournament;
        }

        [HttpPost("PostTournament")]
        public async Task<ActionResult<Tournament>> PostTournament(Tournament tournament)
        {
            if (tournament == null)
            {
                return BadRequest(new {error = "Invalid Tournament DATA"});
            }

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_dbContext.Tournaments == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Tournaments' is null.");
            }

            _dbContext.Tournaments.Add(tournament);
             await _dbContext.SaveChangesAsync();

            return CreatedAtAction("GetTournament", new {id = tournament.TId},tournament);
        }

        [HttpPut("PutTournament/{id}")]
        public async Task<IActionResult> PutTournament(int id,Tournament tournament)
        {
            if(id != tournament.TId)
            {
                return BadRequest(new { error = "Id Didn't Match" });
            }

            _dbContext.Entry(tournament).State = EntityState.Modified;
            try
            {
                await _dbContext.SaveChangesAsync();
            }catch (DbUpdateConcurrencyException) {
                if (!TournamentExists(id))
                {
                    return NotFound(new { error = "Tournament Not Found" });
                }
                else
                {
                    throw;
                }
            }
            return Ok(new { msg = "Successfully Updated...." });
        }

        private bool TournamentExists(int id)
        {
            return (_dbContext.Tournaments?.Any(e => e.TId == id)).GetValueOrDefault();
        }
    }
}
