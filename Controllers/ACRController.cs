using LiveScore.Data;
using LiveScore.Model;
using LiveScore.Services;
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
        private readonly PasswordService _pservice;

        public ACRController(ApplicationDbContext dbContext, ILogger<ACR> logger,PasswordService pservice)
        {
            _dbcontext = dbContext;
            _logger = logger;
            _pservice = pservice;

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

        [HttpPost("AddSAdmin")]
        public async Task<ActionResult<ACR>> PostSAdmin(ACR acr)
        {
           
                if (string.IsNullOrEmpty(acr.Password))
                {
                    return BadRequest("Please Enter all Field");
                }

            // Check if the email already exists in the database
            if (_dbcontext.Admin.Any(a => a.Email == acr.Email))
            {
                return BadRequest("Email already exists");
            }

            acr.RoleId = 1; // Set to the appropriate RoleId value
                acr.Password = _pservice.HashPassword(acr.Password);
                _dbcontext.Admin.Add(acr);
                await _dbcontext.SaveChangesAsync();
                acr.Password = null;

                return Ok(acr);

        }

        [HttpPost("AddAdmin")]
        public async Task<ActionResult<ACR>> PostAdmin(ACR acr)
        {
           
                if (string.IsNullOrEmpty(acr.Password))
                {
                    return BadRequest("Please Enter all Field");
                }

            // Check if the email already exists in the database
            if (_dbcontext.Admin.Any(a => a.Email == acr.Email))
            {
                return BadRequest("Email already exists");
            }

            acr.RoleId = 2; // Set to the appropriate RoleId value
                acr.Password = _pservice.HashPassword(acr.Password);
                _dbcontext.Admin.Add(acr);
                await _dbcontext.SaveChangesAsync();
                acr.Password = null;

                return Ok(acr);

        }


        [HttpPost("AddCoordinator")]
        public async Task<ActionResult<ACR>> PostCoordinator(ACR acr)
        {
            if (string.IsNullOrEmpty(acr.Password))
            {
                return BadRequest("Please Enter all Field");
            }
            acr.RoleId = 3;
            acr.Password = _pservice.HashPassword(acr.Password);
            _dbcontext.Admin.Add(acr);
            await _dbcontext.SaveChangesAsync();
            acr.Password = null;

            return Ok(acr);
        }
        [HttpPost("AddReferee")]
        public async Task<ActionResult<ACR>> PostReferee(ACR acr)
        {
            if (string.IsNullOrEmpty(acr.Password))
            {
                return BadRequest("Please Enter all Field");
            }
            acr.RoleId = 4;
            acr.Password = _pservice.HashPassword(acr.Password);
            _dbcontext.Admin.Add(acr);
            await _dbcontext.SaveChangesAsync();
            acr.Password = null;

            return Ok(acr);
        }
    }
   
 
}
