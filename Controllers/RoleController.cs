using LiveScore.Data;
using LiveScoring.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public RoleController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetAllRole()
        {
            if (_dbContext.Roles == null)
            {
                return NotFound(new {error = "Role Not Found"});
            }
            return await _dbContext.Roles.ToListAsync();
        }
       
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetRoleById(int id)
        {
            if (_dbContext.Roles == null)
            {
                return NotFound(new { error = "Role Not Found"});
            }

            var role = await _dbContext.Roles.FindAsync(id);
            if(role == null)
            {
                return NotFound(new { error = "Role Not Found"});
            }
            return role;
        }

        [HttpPost("addRole")]
        public async Task<ActionResult<Role>> PostRole(Role role)
        {
            _dbContext.Roles.Add(role);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoleById), new {id = role.Id},role);
        }

        [HttpPut("updateRole")]
        public async Task<ActionResult> PutRole(Role role)
        {
            if (role == null || role.Id  == 0)
            {
                return BadRequest(new {error = "Please Enter All Fields"});
            }

            var urole =  await _dbContext.Roles.FindAsync(role.Id);

            if (urole == null)
            {
                return NotFound(new {error = "Role Not Found"});
            }
            urole.role = role.role;
            
            return Ok(new { error = "Sucessfully Updated Role" });
        }
        private bool RoleAvailable(int id)
        {
            return(_dbContext.Roles?.Any(x => x.Id == id)).GetValueOrDefault();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            if(_dbContext.Roles == null)
            {
                return NotFound(new {error = "Role Not Found"});
            }
            var role = await _dbContext.Roles.FindAsync(id);
            if(role == null)
            {
                return NotFound(new {error = "Role Not Found"});
            }
            _dbContext.Roles.Remove(role);
            await _dbContext.SaveChangesAsync();
            return Ok(new { msg = "Successfully Deleted"});
        }


    }
}
