using LiveScore.Data;
using LiveScore.Model;
//using LiveScore.Model.ViewModel;
using LiveScoring.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AthletesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
       
        public AthletesController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Athletes
        [HttpGet("getAthelete")]
        public async Task<ActionResult<IEnumerable<Athlete>>> GetAthletes()
        {
            if (_context.Athletes == null)
            {
                return NotFound(new { msg = "Athelete Not Found" });
            }
            return await _context.Athletes.ToListAsync();
        }

        // GET: api/Athletes/5
        [HttpGet("GetAthelete/{id}")]
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
        [HttpPut("PutAthelete/{id}")]
        public async Task<IActionResult> PutAthlete(int id, Athlete athlete)
        {
            if (id != athlete.Id)
            {
                return BadRequest(new { msg = "Mismatched ID in the request body" });
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
                    return NotFound(new { msg = "Athelete Not Found" });
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
