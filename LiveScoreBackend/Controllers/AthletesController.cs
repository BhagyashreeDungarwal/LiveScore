using CloudinaryDotNet.Actions;
using LiveScore.Data;
using LiveScore.Model;
using LiveScore.Model.ViewModel;
using LiveScore.Services;
//using LiveScore.Model.ViewModel;
using LiveScoring.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AthletesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IEmailSender _emailSender;

        public AthletesController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment, IEmailSender emailSender)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
            _emailSender = emailSender;
        }

        // GET: api/Athletes
        [HttpGet("getAthelete")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetAthletes()
        {
            if (_context.Athletes == null)
            {
                return NotFound(new { msg = "Athelete Not Found" });
            }
            return await _context.Athletes.Include((e)=> e.Coach).Include((c) => c.Category).Include((o)=> o.acr)
                .Select((a)=> new {
                    id = a.Id,
                    athleteName = a.AthleteName,
                    email = a.Email,
                    contact = a.Contact,
                    imageUrl = a.ImageUrl,
                    dateOfBirth = a.DateOfBirth,
                    age = a.Age,
                    gender = a.Gender,
                    city = a.City,
                    state = a.State,
                    coachName = a.Coach.CoachName,
                    categoryName = a.Category.CategoryName,
                    coordinater = a.acr.Name,
                }).ToListAsync();
        }

        //// GET: api/Athletes/5
        [HttpGet("GetAthelete/{id}")]
        public async Task<ActionResult<dynamic>> GetAthlete(int id)
        {
            var athlete = await _context.Athletes.Include((e) => e.Coach).Include((c) => c.Category).Include((o) => o.acr)
                .Where(a => a.Id == id)
                .Select(a => new {
                    id = a.Id,
                    athleteName = a.AthleteName,
                    email = a.Email,
                    contact = a.Contact,
                    imageUrl = a.ImageUrl,
                    dateOfBirth = a.DateOfBirth,
                    age = a.Age,
                    height = a.Height,
                    weight = a.Weight,
                    gender = a.Gender,
                    city = a.City,
                    state = a.State,
                    coachName = a.Coach.CoachName,
                    categoryName = a.Category.CategoryName,                   
                    coordinater = a.acr.Name,
                    
                })
                .FirstOrDefaultAsync();

            if (athlete == null)
            {
                return NotFound();
            }

            return athlete;
        }
        //PUT: api/Athletes/5
         //To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("PutAthelete/{id}")]
        //public async Task<IActionResult> PutAthlete(int id, [FromForm] Images athleteDto)
        //{
        //    //if (id != athleteDto.Id)
        //    //{
        //    //    return BadRequest(new { msg = "Mismatched ID in the request body" });
        //    //}

        //    var athlete = await _context.Athletes.FindAsync(id);
        //    if (athlete == null)
        //    {
        //        return NotFound(new { msg = "Athlete not found" });
        //    }

        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (athleteDto.ImageFile != null)
        //    {
        //        string imageUrl = await UploadImage(athleteDto.ImageFile);
        //        athlete.ImageUrl = imageUrl;
        //    }

        //    // Update athlete properties
        //    athlete.AthleteName = athleteDto.AthleteName;
        //    athlete.Email = athleteDto.Email;
        //    athlete.Contact = athleteDto.Contact;
        //    athlete.DateOfBirth = athleteDto.DateOfBirth;
        //    athlete.Gender = athleteDto.Gender;
        //    athlete.Height = athleteDto.Height;
        //    athlete.Weight = athleteDto.Weight;
        //    athlete.City = athleteDto.City;
        //    athlete.State = athleteDto.State;
        //    athlete.CategoryId = athleteDto.CategoryId;
        //    athlete.CoachId = athleteDto.CoachId;
        //    athlete.Coordinater = athleteDto.CoordinatorId;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //        return Ok(new { msg = "Successfully Updated!!" });
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!AthleteExists(id))
        //        {
        //            return NotFound(new { msg = "Athelete Not Found" });
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }
        //}

        [HttpPut("UpdateAthlete/{id}")]
        public async Task<IActionResult> UpdateAthlete(int id,UpAthelete athleteDto)
        {
            var athlete = await _context.Athletes.FindAsync(id);
            if (athlete == null)
            {
                return NotFound(new { msg = "Athlete not found" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var coach = await _context.Coaches.FirstOrDefaultAsync(c => c.CoachName == athleteDto.CoachName);
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.CategoryName == athleteDto.CategoryName);

            // Update athlete properties
            athlete.AthleteName = athleteDto.AthleteName;
            athlete.Email = athleteDto.Email;
            athlete.Contact = athleteDto.Contact;
            athlete.DateOfBirth = athleteDto.DateOfBirth;
            athlete.Gender = athleteDto.Gender;
            athlete.Height = athleteDto.Height;
            athlete.Weight = athleteDto.Weight;
            athlete.City = athleteDto.City;
            athlete.State = athleteDto.State;
            athlete.CategoryId = category.Id;
            athlete.CoachId = coach.CoachId;

            string messageBody = "<!DOCTYPE html>" +
                                  "<html>" +
                                  "<head>" +
                                  "<title>Welcome to Live Score!</title>" +
                                  "</head>" +
           "<body>" +
                                 $" <h2>Respected  {athlete.AthleteName},</h2>" +
                                  "<p>Congratulations on joining Live Score! You're now registered as a coordinator. Get ready to manage live score updates and ensure seamless sports experiences for our users.</p>" +
                                  "<p>Explore our platform tools to optimize your coordination tasks. For assistance, our support team is here to help.</p>" +
                                  "<p>Welcome aboard!</p>" +
                                  "<p>Best regards,<br />" +
                                  " Live Score</p>" +
                                  "</body>" +
                                  "</html>";

            _emailSender.SendEmail(athlete.Email, "SucessFully Registered", messageBody);

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { msg = "Athlete information successfully updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AthleteExists(id))
                {
                    return NotFound(new { msg = "Athlete Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        [HttpPut("UpdateAthleteImage/{id}")]
        public async Task<IActionResult> UpdateAthleteImage(int id, [FromForm] UpdateImg updateImg)
        {
            var athlete = await _context.Athletes.FindAsync(id);
            if (athlete == null)
            {
                return NotFound(new { msg = "Athlete not found" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

                if (updateImg.ImageFile != null)
                {
                    string imageUrl = await UploadImage(updateImg.ImageFile);
                    athlete.ImageUrl = imageUrl;
                }

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { msg = "Athlete image successfully updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AthleteExists(id))
                {
                    return NotFound(new { msg = "Athlete Not Found" });
                }
                else
                {
                    throw;
                }
            }
            return BadRequest(new { msg = "Image file is missing" });
        }


        // POST: api/Athletes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("PostAthelete")]
        public async Task<ActionResult<Athlete>> PostAthlete([FromForm]Images athleteDto)
        {
           
            if (athleteDto == null)
            {
                return BadRequest("Invalid athlete data");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            string imageUrl = await UploadImage(athleteDto.ImageFile);

            var athlete = new Athlete
            {
                AthleteName = athleteDto.AthleteName,
                Email = athleteDto.Email,
                Contact = athleteDto.Contact,
                DateOfBirth = athleteDto.DateOfBirth,
                Gender = athleteDto.Gender,
                Height = athleteDto.Height,
                Weight = athleteDto.Weight,
                City = athleteDto.City,
                State = athleteDto.State,
                CategoryId = athleteDto.CategoryId,
                CoachId = athleteDto.CoachId,
                Coordinater = athleteDto.CoordinatorId,
                ImageUrl = imageUrl
            };

            _context.Athletes.Add(athlete);
            await _context.SaveChangesAsync();

            string messageBody = "<!DOCTYPE html>" +
                                   "<html>" +
                                   "<head>" +
                                   "<title>Welcome to Live Score!</title>" +
                                   "</head>" +
            "<body>" +
                                  $" <h2>Respected  {athlete.AthleteName},</h2>" +
                                   "<p>Congratulations on joining Live Score! You're now registered as a coordinator. Get ready to manage live score updates and ensure seamless sports experiences for our users.</p>" +
                                   "<p>Explore our platform tools to optimize your coordination tasks. For assistance, our support team is here to help.</p>" +
                                   "<p>Welcome aboard!</p>" +
                                   "<p>Best regards,<br />" +
                                   " Live Score</p>" +
                                   "</body>" +
                                   "</html>";

            _emailSender.SendEmail(athlete.Email, "SucessFully Registered", messageBody);

            return Ok("Athlete created successfully.");

        }
        private async Task<string> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return null;
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }


            return $"{Request.Scheme}://{Request.Host}/images/{fileName}";
        }

        // DELETE: api/Athletes/5
        [HttpDelete("DeleteAthelete/{id}")]
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
