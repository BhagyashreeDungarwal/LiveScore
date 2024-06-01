﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LiveScore.Data;
using LiveScoring.Model;
using LiveScore.Model.ViewModel;
using Microsoft.OpenApi.Writers;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ScoresController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Scores
        [HttpGet("GetScores")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetScores()
        {
          if (_context.Scores == null)
          {
              return NotFound();
          }
            return await _context.Scores.Include((a) => a.Round)
                .Include((r) => r.AthleteRedObj)
                .Include((b) => b.AthleteBlueObj)
                .Select(s => new
                {
                    scoreId = s.ScoreId,
                    redPoints = s.RedPoints,
                    bluePoints = s.BluePoints,
                    //scoreType = s.ScoreType,
                    //paneltyPlayer = s.PaneltyPlayer,
                    //panelty = s.Panelty,
                    scoreTime = s.ScoreTime,
                    //paneltyTime = s.PaneltyTime,
                    rounds = s.Round.Rounds,
                    athleteRed = s.AthleteRedObj.AthleteName,
                    athleteBlue = s.AthleteBlueObj.AthleteName
                }).ToListAsync();
        }

        // GET: api/Scores/5
        [HttpGet("GetScoreById/{id}")]
        public async Task<ActionResult<dynamic>> GetScoreById(int id)
        {
          if (_context.Scores == null)
          {
              return NotFound();
          }
            var score = await _context.Scores.Include((a) => a.Round)
                .Include((r) => r.AthleteRedObj)
                .Include((b) => b.AthleteBlueObj)
                .Where(s => s.ScoreId == id)
                .Select(s => new
                {
                    scoreId = s.ScoreId,
                    redPoints = s.RedPoints,
                    bluePoints = s.BluePoints,
                    //scoreType = s.ScoreType,
                    //paneltyPlayer = s.PaneltyPlayer,
                    //panelty = s.Panelty,
                    scoreTime = s.ScoreTime,
                    //paneltyTime = s.PaneltyTime,
                    rounds = s.Round.Rounds,
                    athleteRed =s.AthleteRedObj.AthleteName,
                    athleteBlue = s.AthleteBlueObj.AthleteName
                })
                .FirstOrDefaultAsync();

            if (score == null)
            {
                return NotFound();
            }

            return score;
        }

        // PUT: api/Scores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("PutScore/{id}")]
        public async Task<IActionResult> PutScore(int id, Score score)
        {
            if (id != score.ScoreId)
            {
                return BadRequest();
            }

            _context.Entry(score).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScoreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Scores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("PostScore")]
        public async Task<ActionResult<Score>> PostScore(ScoreVm scores)
        {
          if (_context.Scores == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Scores'  is null.");
          }

            var score = new Score()
            {
                RedPoints = scores.RedPoints,
                BluePoints = scores.BluePoints,
                //ScoreType = scores.ScoreType,
                //PaneltyPlayer = scores.PaneltyPlayer,
                //Panelty = scores.Panelty,
                ScoreTime = scores.ScoreTime,
                //PaneltyTime = scores.PaneltyTime,
                Rounds = scores.Rounds,
                AthleteBlue = scores.AthleteBlue,
                AthleteRed = scores.AthleteRed,
            };

            _context.Scores.Add(score);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScore", new { id = score.ScoreId }, score);
        }

        // DELETE: api/Scores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScore(int id)
        {
            if (_context.Scores == null)
            {
                return NotFound();
            }
            var score = await _context.Scores.FindAsync(id);
            if (score == null)
            {
                return NotFound();
            }

            _context.Scores.Remove(score);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScoreExists(int id)
        {
            return (_context.Scores?.Any(e => e.ScoreId == id)).GetValueOrDefault();
        }
    }
}
