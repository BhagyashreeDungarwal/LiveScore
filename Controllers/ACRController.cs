using LiveScore.Data;
using LiveScore.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ACRController : ControllerBase
    {
        private readonly ApplicationDbContext _dbcontext;
        private readonly ILogger<ACR> _logger;

        public ACRController(ApplicationDbContext dbContext, ILogger<ACR> logger)
        {
            _dbcontext = dbContext;
            _logger = logger;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ACR>>> GetAllACR()
        {
            var acrs = await _dbcontext.Admin.Include(a => a.RoleId).ToListAsync();
            return acrs;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ACR>> GetACR(int id)
        {
            var acr = await _dbcontext.Admin.FindAsync(id);

            if (acr == null)
            {
                _logger.LogWarning($"ACR with ID {id} not found");
                return NotFound();
            }

            return Ok(acr);
        }

        [HttpPost("addAdmin")]
        public async Task<ActionResult<ACR>> PostAdmin(ACR acr)
        {
            if (string.IsNullOrEmpty(acr.Password))
            {
                return BadRequest("Please Enter all Field");
            }

            // Set the RoleId based on your logic (e.g., fetching RoleId from the database)
            acr.RoleId = 1; // Set to the appropriate RoleId value

            _dbcontext.Admin.Add(acr);
            await _dbcontext.SaveChangesAsync();
            acr.Password = null;

            return Ok(acr);
            // if (acr == null)
            // {
            //     _logger.LogWarning("Invalid  data. Please provide valid information.");
            //     return BadRequest("Invalid Entry");
            // }

            // var parameters = new[]
            //{
            //     new SqlParameter("@role", acr.Role),
            //     new SqlParameter("@name", acr.Name),
            //     new SqlParameter("@email", acr.Email),
            //     new SqlParameter("@password", acr.Password),
            //     new SqlParameter("@contact", acr.Contact),
            //     new SqlParameter("@age", acr.Age),
            //     new SqlParameter("@city", acr.City),
            //     new SqlParameter("@state", acr.State),
            // };

            // await _dbcontext.Database.ExecuteSqlRawAsync("EXEC acrInsert @role, @name, @email, @password, @contact, @age, @city, @state", parameters);

            // var insertedacr = await _dbcontext.Admin.SingleOrDefaultAsync(p => p.Name == acr.Email);

            // if (insertedacr == null)
            // {
            //     return BadRequest("Cannot Fetch");
            // }

            // return CreatedAtAction(nameof(GetACR), new { acrId = insertedacr.Id }, insertedacr);
        }
    }
}
