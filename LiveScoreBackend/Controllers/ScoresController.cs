﻿    using System;
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
    using LiveScore.Services;
    using Microsoft.AspNetCore.SignalR;

    namespace LiveScore.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class ScoresController : ControllerBase
        {
            private readonly ApplicationDbContext _context;
            private readonly TempDbContext _tempContext;
            private readonly ITimerService _timerService;
            private readonly IHubContext<ScoreHub> _hubContext;

            public ScoresController(ApplicationDbContext context, TempDbContext tempContext, ITimerService timerService, IHubContext<ScoreHub> hubContext)
            {
                _context = context;
                _tempContext = tempContext;
                _timerService = timerService;
                _hubContext = hubContext;

            // Subscribe to the TimerElapsed event
            _timerService.TimerElapsed += async (sender, matchGroup) => await TransferScores(matchGroup);

        }

            // GET: api/Scores
            [HttpGet("GetScores")]
            public async Task<ActionResult<IEnumerable<dynamic>>> GetScores()
            {
                if (_context.Scores == null)
                {
                    return NotFound();
                }
                return await _context.Scores
                //.Include((a) => a.Round)
                    .Include((r) => r.AthleteRedObj)
                    .Include((b) => b.AthleteBlueObj)
                    .Include((m) => m.Match)
                    .Select(s => new
                    {
                        scoreId = s.ScoreId,
                        redPoints = s.RedPoints,
                        bluePoints = s.BluePoints,
                        redPanelty = s.RedPanelty,
                        bluePanelty = s.BluePanelty,
                        scoreTime = s.ScoreTime,
                        rounds = s.Rounds,
                        athleteRed = s.AthleteRedObj.AthleteName,
                        athleteBlue = s.AthleteBlueObj.AthleteName,
                        matchId = s.Match.MatchType
                    }).ToListAsync();
            }

        // Add this code to the ScoresController class
        [HttpGet("GetTemporaryScores")]
        public async Task<ActionResult<IEnumerable<TemporaryScore>>> GetTemporaryScores()
        {
            if (_tempContext.TemporaryScores == null)
            {
                return NotFound();
            }
            return await _tempContext.TemporaryScores.ToListAsync();
        }

        [HttpGet("getTotalScore")]
        public async Task<ActionResult<dynamic>> GetTotalScore()
        {
            var totalRedPoints = await _tempContext.TemporaryScores.SumAsync(ts => (ts.RedPoints ?? 0) + (ts.BluePanelty ?? 0));
            var totalBluePoints = await _tempContext.TemporaryScores.SumAsync(ts => (ts.BluePoints ?? 0) + (ts.RedPanelty ?? 0));

            return Ok(new
            {
                totalRedPoints,
                totalBluePoints
            });
        }

        [HttpPost("insert/{rounds}/{athleteRed}/{athleteBlue}/{matchId}")]
            public async Task<IActionResult> InsertTemporaryScore([FromBody] TempScoreVm tempScorevm,int rounds,int athleteRed, int athleteBlue, int matchId)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var tempScore = new TemporaryScore
                {
                    RedPoints =tempScorevm.RedPoints,
                    BluePoints =tempScorevm.BluePoints,
                    RedPanelty =tempScorevm.RedPanelty,
                    BluePanelty =tempScorevm.BluePanelty,
                    ScoreTime = DateTime.Now,
                    Rounds =rounds,
                    AthleteRed =athleteRed,
                    AthleteBlue =athleteBlue,
                    MatchId =matchId,

                };

            _tempContext.TemporaryScores.Add(tempScore);
                await _tempContext.SaveChangesAsync();

                var totalRedPoints = await _tempContext.TemporaryScores.SumAsync(ts => (ts.RedPoints ?? 0) + (ts.BluePanelty ?? 0));
                var totalBluePoints = await _tempContext.TemporaryScores.SumAsync(ts => (ts.BluePoints ?? 0) + (ts.RedPanelty ?? 0));

                return Ok(new
                {
                    msg = "Score inserted into temporary table",
                    totalRedPoints,
                    totalBluePoints
                }); 
        }

        [HttpPost("transfer/{mid}")]
        public async Task<IActionResult> TransferScores(int mid)
        {
            var tempScores = _tempContext.TemporaryScores.Where(ts => ts.MatchId == mid).ToList();
            if (tempScores.Count == 0)
            {
                return NotFound(new { msg = "No scores found in temporary table for the match group" });
            }

            foreach (var tempScore in tempScores)
            {
                // Check if related entities exist with combined condition for Rounds and MatchId
                var roundExists = _context.Rounds.Any(r => r.MatchId == tempScore.MatchId && r.Rounds == tempScore.Rounds);
                var athleteRedExists = _context.Athletes.Any(a => a.Id == tempScore.AthleteRed);
                var athleteBlueExists = _context.Athletes.Any(a => a.Id == tempScore.AthleteBlue);
                var matchExists = _context.Matchss.Any(m => m.MId == tempScore.MatchId);

                if (!roundExists || !athleteRedExists || !athleteBlueExists || !matchExists)
                {
                    return BadRequest(new { msg = "One or more foreign key references are invalid." });
                }

                var score = new Score
                {
                    RedPoints = tempScore.RedPoints ?? 0,
                    BluePoints = tempScore.BluePoints ?? 0,
                    RedPanelty = tempScore.RedPanelty ?? 0,
                    BluePanelty = tempScore.BluePanelty ?? 0,
                    ScoreTime = tempScore.ScoreTime,
                    Rounds = tempScore.Rounds,
                    AthleteRed = tempScore.AthleteRed,
                    AthleteBlue = tempScore.AthleteBlue,
                    MatchId = tempScore.MatchId
                };
                _context.Scores.Add(score);
            }
                _tempContext.TemporaryScores.RemoveRange(tempScores);
                await _context.SaveChangesAsync();
                await _tempContext.SaveChangesAsync();

                return Ok(new { msg = "Scores transferred from temporary to real table" });
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
        }
    }
