using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LiveScore.Data;
using LiveScore.Model;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoachesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoachesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Coaches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coach>>> GetCoach()
        {
          if (_context.Coach == null)
          {
              return NotFound();
          }
            return await _context.Coach.ToListAsync();
        }

        // GET: api/Coaches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Coach>> GetCoach(int id)
        {
          if (_context.Coach == null)
          {
              return NotFound();
          }
            var coach = await _context.Coach.FindAsync(id);

            if (coach == null)
            {
                return NotFound();
            }

            return coach;
        }

        [HttpPut("UpdateCoach")]
        public async Task<IActionResult> PutCoach(Coach coach)
        {
           
          if(coach == null || coach.CoachId == 0)
            {
                return BadRequest(new { error = "Enter Valid Id" });
            }

          var ucoach = await _context.Coach.FindAsync(coach.CoachId);
            if (ucoach == null)
            {
                return NotFound(new { error = "Coach Not Found" });
            }
            ucoach.CoachName = coach.CoachName;
            ucoach.CoachEmail = coach.CoachEmail;
            ucoach.Achievements = coach.Achievements;
            ucoach.Experience   = coach.Experience;
            ucoach.Gender = coach.Gender;
            ucoach.ContactNo = coach.ContactNo;
            await _context.SaveChangesAsync();

            return Ok(new {mag = "Updated Successfully" });
        }

        [HttpPost]
        public async Task<ActionResult<Coach>> PostCoach(Coach coach)
        {
          if (_context.Coach == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Coach'  is null.");
          }
            _context.Coach.Add(coach);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCoach", new { id = coach.CoachId }, coach);
        }

        private bool CoachExists(int id)
        {
            return (_context.Coach?.Any(e => e.CoachId == id)).GetValueOrDefault();
        }

        // DELETE: api/Coaches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoach(int id)
        {
            if (_context.Coach == null)
            {
                return NotFound(new { error = "coach Not Found" });
            }
            var coach = await _context.Coach.FindAsync(id);
            if (coach == null)
            {
                return NotFound(new { error = "Coach Not Found" });
            }

            _context.Coach.Remove(coach);
            await _context.SaveChangesAsync();

            return Ok(new { msg = "Successfully Deleted" });
        }

    
    }
}
