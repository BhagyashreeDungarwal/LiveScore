using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LiveScore.Data;
using LiveScore.Model;
using LiveScore.Model.ViewModel;
using LiveScore.Services;
using LiveScoring.Model;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoachesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailSender _emailSender;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CoachesController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment, IEmailSender emailSender)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
            _emailSender = emailSender;                
        }

        // GET: api/Coaches
        [HttpGet("GetCoaches")]
        public async Task<ActionResult<IEnumerable<Coach>>> GetCoaches()
        {
          if (_context.Coaches == null)
          {
              return NotFound();
          }
            return await _context.Coaches.ToListAsync();
        }

        // GET: api/Coaches/5
        [HttpGet("GetCoachesById/{id}")]
        public async Task<ActionResult<Coach>> GetCoach(int id)
        {
          if (_context.Coaches == null)
          {
              return NotFound(new { msg = "Coaches Not Found" });
          }
            var coach = await _context.Coaches.FindAsync(id);

            if (coach == null)
            {
                return NotFound(new { msg = "Coaches Not Found" });
            }

            return coach;
        }

        // PUT: api/Coaches/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("PutCoach/{id}")]
        public async Task<IActionResult> PutCoach(int id, [FromForm] ImageCoach coachimg)
        {
            //if (id != coachimg.CoachId)
            //{
            //    return BadRequest();
            //}

            var coach = await _context.Coaches.FindAsync(id);
            if (coach == null)
            {
                return NotFound(new { error = "Coach not found" });
            }

            string imageUrl = coach.ImageUrl;
            if (coachimg.ImageFile != null)
            {
                imageUrl = await UploadImage(coachimg.ImageFile);
            }

            // Update coach properties
            coach.CoachName = coachimg.CoachName;
            coach.CoachEmail = coachimg.CoachEmail;
            coach.Achievements = coachimg.Achievements;
            coach.Experience = coachimg.Experience;
            coach.ContactNo = coachimg.ContactNo;
            coach.Gender = coachimg.Gender;
            coach.ImageUrl = imageUrl;

            string messageBody = "<!DOCTYPE html>" +
                                 "<html>" +
                                 "<head>" +
                                 "<title>Welcome to Live Score!</title>" +
                                 "</head>" +
                                "<body>" +
                                $" <h2>Respected {coach.CoachName},</h2>" +
                                "< p > Congratulations on your recent update at Live Score! You're now on board as a Coach. Get ready to manage live score updates and ensure seamless sports experiences for our users.</p>"+
                                "< p > Explore our platform tools to optimize your coordination tasks. For assistance, our support team is here to help.</ p >" +
                                "< p > Welcome aboard! </ p >"+
                                "< p > Best regards,< br />"+
                                "Live Score </ p >" +
                                 "</body>" +
                                   "</html>";

            _emailSender.SendEmail(coach.CoachEmail, "SucessFully Registered", messageBody);

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { msg = "Successfully Updated!!" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoachExists(id))
                {
                    return NotFound(new { error = "Coach Id Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/Coaches
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("PostCoach")]
        public async Task<ActionResult<Coach>> PostCoach([FromForm]ImageCoach coachimg)
        {
          if (_context.Coaches == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Coaches'  is null.");
          }

            string imageUrl = await UploadImage(coachimg.ImageFile);

            var coach = new Coach
            {
                CoachName = coachimg.CoachName,
                CoachEmail = coachimg.CoachEmail,
                Achievements = coachimg.Achievements,
                Experience = coachimg.Experience,
                ContactNo = coachimg.ContactNo,
                Gender = coachimg.Gender,
                ImageUrl = imageUrl,
            };

            _context.Coaches.Add(coach);
            await _context.SaveChangesAsync();
            string messageBody = "<!DOCTYPE html>" +
                                  "<html>" +
                                  "<head>" +
                                  "<title>Welcome to Live Score!</title>" +
                                  "</head>" +
            "<body>" +
                                 $" <h2>Respected  {coach.CoachName},</h2>" +
                                  "<p>Congratulations on joining Live Score! You're now registered as a Coach. Get ready to manage live score updates and ensure seamless sports experiences for our users.</p>" +
                                  "<p>Explore our platform tools to optimize your coordination tasks. For assistance, our support team is here to help.</p>" +
                                  "<p>Welcome aboard!</p>" +
                                  "<p>Best regards,<br />" +
                                  " Live Score</p>" +
                                  "</body>" +
            "</html>";

            _emailSender.SendEmail(coach.CoachEmail, "SucessFully Registered", messageBody);

            return Ok(new { msg = "Successfully Added Coach"});
        }

        private async Task<string> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return null;
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "coach");
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"{Request.Scheme}://{Request.Host}/coach/{fileName}";
        }

        // DELETE: api/Coaches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoach(int id)
        {
            if (_context.Coaches == null)
            {
                return NotFound();
            }
            var coach = await _context.Coaches.FindAsync(id);
            if (coach == null)
            {
                return NotFound();
            }

            _context.Coaches.Remove(coach);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CoachExists(int id)
        {
            return (_context.Coaches?.Any(e => e.CoachId == id)).GetValueOrDefault();
        }
    }
}
