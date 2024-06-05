using LiveScore.Data;
using LiveScore.Model.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefereeScoreController : ControllerBase
    {
        private readonly TempDbContext _context;

        public RefereeScoreController(TempDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddScore([FromBody] RefScore score)
        {
            _context.RefScores.Add(score);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        public async Task<IEnumerable<RefScore>> GetScores()
        {
            return await _context.RefScores.ToListAsync ();
        }
    }
}
