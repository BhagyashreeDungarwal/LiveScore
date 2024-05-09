﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LiveScore.Data;
using LiveScoring.Model;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetCategories")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
          if (_context.Categories == null)
          {
              return NotFound();
          }
            return await _context.Categories.ToListAsync();
        }

        [HttpGet("GetCategoriesById/{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
          if (_context.Categories == null)
          {
              return NotFound();
          }
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        [HttpGet("GetAthleteByCategory/{categoryId}")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetAthleteByCategory(int categoryId)
        {
            // Retrieve the category with the specified ID including its associated athletes
            var athletes = await _context.Athletes.Where(a => a.CategoryId ==  categoryId).ToListAsync();

            if (athletes == null)
            {
                return NotFound();
            }

            // Extract the athletes from the category's associated athletes
            //var athletes = category.Athletes.ToList();

            return Ok(athletes);
        }


        [HttpPut("PutCategory/{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest(new { error = "Mismatched ID in the request body" });
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound(new { error = "Category Not Found" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new {msg ="Successfully Updated!!"});
        }

        [HttpPost("PostCategory")]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
          if (category == null)
          {
              return BadRequest(new {msg = "the value is null." });
          }
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return Ok(new  {  msg = "Sucessfully Added Category"});
        }

        // DELETE: api/Categories/5
        [HttpDelete("DeleteCategory/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound(new { error = "Category Not Found" });
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return Ok(new { msg = "Successfully Addedd!!" });
        }

        private bool CategoryExists(int id)
        {
            return (_context.Categories?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
