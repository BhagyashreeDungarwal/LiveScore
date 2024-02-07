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
                return NotFound();
            }
            return await _dbContext.Roles.ToListAsync();
        }
       
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetRoleById(int id)
        {
            if (_dbContext.Roles == null)
            {
                return NotFound();
            }

            var role = await _dbContext.Roles.FindAsync(id);
            if(role == null)
            {
                return NotFound();
            }
            return role;
        }

        [HttpPost]
        public async Task<ActionResult<Role>> PostRole(Role role)
        {
            _dbContext.Roles.Add(role);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoleById), new {id = role.Id},role);
        }

        [HttpPut]
        public async Task<ActionResult> PutRole(int id, Role role)
        {
            if(id != role.Id)
            {
                return BadRequest();
            }
            _dbContext.Entry(role).State = EntityState.Modified;
            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (!RoleAvailable(id)){
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();
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
                return NotFound();
            }
            var role = await _dbContext.Roles.FindAsync(id);
            if(role == null)
            {
                return NotFound();
            }
            _dbContext.Roles.Remove(role);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }


    }
}
