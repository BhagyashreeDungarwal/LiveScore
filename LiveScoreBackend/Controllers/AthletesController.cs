using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LiveScore.Data;
using LiveScoring.Model;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AthletesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AthletesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Athletes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Athlete>>> GetAthletes()
        {
          if (_context.Athletes == null)
          {
              return NotFound(new { error = "Athelete Not Found" });
          }
            return await _context.Athletes.ToListAsync();
        }

        // GET: api/Athletes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Athlete>> GetAthlete(int id)
        {
          if (_context.Athletes == null)
          {
              return NotFound();
          }
            var athlete = await _context.Athletes.FindAsync(id);

            if (athlete == null)
            {
                return NotFound();
            }

            return athlete;
        }

        // PUT: api/Athletes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAthlete(int id, Athlete athlete)
        {
            if (id != athlete.Id)
            {
                return BadRequest(new { error = "Mismatched ID in the request body" });
            }

            _context.Entry(athlete).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AthleteExists(id))
                {
                    return NotFound(new { error = "Athelete Not Found" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { msg = "Successfully Updated!!" });
        }

        // POST: api/Athletes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Athlete>> PostAthlete(Athlete athlete)
        {
            if (athlete == null)
            {
                return BadRequest("Invalid athlete data");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Additional null checks if necessary
            if (_context.Athletes == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Athletes' is null.");
            }

            _context.Athletes.Add(athlete);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAthlete", new { id = athlete.Id }, athlete);
        }

        // DELETE: api/Athletes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAthlete(int id)
        {
            if (_context.Athletes == null)
            {
                return NotFound();
            }
            var athlete = await _context.Athletes.FindAsync(id);
            if (athlete == null)
            {
                return NotFound();
            }

            _context.Athletes.Remove(athlete);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AthleteExists(int id)
        {
            return (_context.Athletes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
