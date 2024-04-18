﻿using LiveScore.Data;
using LiveScore.Model;
using LiveScore.Model.ViewModel;
using LiveScore.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Data;
using System.Xml.Linq;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ACRController : ControllerBase
    {
        private readonly ApplicationDbContext _dbcontext;
        private readonly ILogger<ACR> _logger;
        private readonly PasswordService _pservice;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ACRController(ApplicationDbContext dbContext, ILogger<ACR> logger, PasswordService pservice, IWebHostEnvironment webHostEnvironment)
        {
            _dbcontext = dbContext;
            _logger = logger;
            _pservice = pservice;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("GetACR")]
        public async Task<ActionResult<IEnumerable<ACR>>> GetAllACR()
        {
            var acrs = await _dbcontext.Admin.ToListAsync();
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


        //Super Admin Section


        //Adding Super Admin
        [HttpPost("AddSAdmin")]
        public async Task<ActionResult<ACR>> PostSAdmin(ACR acr)
        {

            if (string.IsNullOrEmpty(acr.Password))
            {
                return BadRequest(new { msg = "Please Enter all Field" });
            }

            // Check if the email already exists in the database
            if (_dbcontext.Admin.Any(a => a.Email == acr.Email))
            {
                return BadRequest(new { msg = "Email already exists" });
            }
            //checked if the contact already exists in the database
            if (_dbcontext.Admin.Any(a => a.Contact == acr.Contact))
            {
                return BadRequest(new { msg = "Contact already exists" });
            }
            acr.RoleId = 1; // Set to the appropriate RoleId value
            acr.Password = _pservice.HashPassword(acr.Password);
            _dbcontext.Admin.Add(acr);
            await _dbcontext.SaveChangesAsync();
            acr.Password = null;

            return Ok(new { msg = "Successfully Added Super Admin" });

        }

        //Updating Super Coordinator

        [HttpPut("updateSAdmin")]
        public async Task<ActionResult<ACR>> UpdateSAdmin(ACR acr)
        {
            if (acr == null || acr.Id == 0)
            {
                return BadRequest(new { msg = "Please Enter All Field" });
            }

            var uacr = await _dbcontext.Admin.FindAsync(acr.Id);
            if (uacr == null)
            {
                return NotFound(new { msg = "Super Admin Not Found" });
            }

            // Check if the new email already exists
            if (await _dbcontext.Admin.AnyAsync(a => a.Id != acr.Id && a.Email == acr.Email))
            {
                return BadRequest(new { msg = "Email already exists for another Super Admin." });
            }

            // Check if the new contact already exists
            if (await _dbcontext.Admin.AnyAsync(a => a.Id != acr.Id && a.Contact == acr.Contact))
            {
                return BadRequest(new { msg = "Contact already exists for another Super Admin." });
            }
            acr.RoleId = 1;
            acr.Password = _pservice.HashPassword(acr.Password);


            uacr.Email = acr.Email;
            uacr.Name = acr.Name;
            uacr.Password = acr.Password;
            uacr.ImageURL = acr.ImageURL;
            uacr.Contact = acr.Contact;
            uacr.Age = acr.Age;
            uacr.DateOfBirth = acr.DateOfBirth;
            uacr.LastLogin = acr.LastLogin;
            uacr.Status = true;
            uacr.Gender = acr.Gender;
            uacr.City = acr.City;
            uacr.State = acr.State;
            uacr.RoleId = acr.RoleId;
            await _dbcontext.SaveChangesAsync();


            return Ok(new { msg = "Successfully Updated Super Admin" });
        }

        [HttpDelete("DeleteACR/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id < 1)
                return BadRequest(new { msg = "Please Enter Proper Id" });
            var product = await _dbcontext.Admin.FindAsync(id);
            if (product == null)
                return NotFound();
            _dbcontext.Admin.Remove(product);
            await _dbcontext.SaveChangesAsync();
            return Ok(new { msg = "Successfully Deleted" });

        }



        //Admin Section

        //Adding Admin
        [HttpPost("AddAdmin")]
        public async Task<ActionResult<ACR>> PostAdmin(ACR acr)
        {

            if (string.IsNullOrEmpty(acr.Password))
            {
                return BadRequest(new { msg = "Please Enter all Field" });
            }

            // Check if the email already exists in the database
            if (_dbcontext.Admin.Any(a => a.Email == acr.Email))
            {
                return BadRequest(new { msg = "Email already exists" });
            }

            //checked if the contact already exists in the database
            if (_dbcontext.Admin.Any(a => a.Contact == acr.Contact))
            {
                return BadRequest(new { msg = "Contact already exists" });
            }

            acr.RoleId = 2; // Set to the appropriate RoleId value
            acr.Password = _pservice.HashPassword(acr.Password);
            _dbcontext.Admin.Add(acr);
            await _dbcontext.SaveChangesAsync();
            acr.Password = null;

            return Ok(new { msg = "Successfully Added Admin" });

        }

        //Updating Admin

        [HttpPut("updateAdmin")]
        public async Task<ActionResult<ACR>> UpdateAdmin(ACR acr)
        {
            if (acr == null || acr.Id == 0)
            {
                return BadRequest(new { msg = "Please Enter All Field" });
            }

            var uacr = await _dbcontext.Admin.FindAsync(acr.Id);
            if (uacr == null)
            {
                return NotFound(new { msg = "Admin Not Found" });
            }

            // Check if the new email already exists
            if (await _dbcontext.Admin.AnyAsync(a => a.Id != acr.Id && a.Email == acr.Email))
            {
                return BadRequest(new { msg = "Email already exists for another Admin." });
            }

            // Check if the new contact already exists
            if (await _dbcontext.Admin.AnyAsync(a => a.Id != acr.Id && a.Contact == acr.Contact))
            {
                return BadRequest(new { msg = "Contact already exists for another Admin." });
            }
            acr.RoleId = 2;
            acr.Password = _pservice.HashPassword(acr.Password);


            uacr.Email = acr.Email;
            uacr.Name = acr.Name;
            uacr.Password = acr.Password;
            uacr.ImageURL = acr.ImageURL;
            uacr.Contact = acr.Contact;
            uacr.Age = acr.Age;
            uacr.DateOfBirth = acr.DateOfBirth;
            uacr.Status = true;
            uacr.LastLogin = acr.LastLogin;
            uacr.Gender = acr.Gender;
            uacr.City = acr.City;
            uacr.State = acr.State;
            uacr.RoleId = acr.RoleId;
            await _dbcontext.SaveChangesAsync();


            return Ok(new { msg = "Successfully Updated Admin" }); ;
        }




        //Coordinator Section
        [HttpGet("Coordinator")]
        public async Task<ActionResult<ACR>> GetCoordinator()
        {
            // Assuming role ID 3 corresponds to the coordinator role
            int coordinatorRoleId = 3;

            // Fetch the coordinator from ACR table with the specified ID and role ID 3
            var coordinator = await _dbcontext.Admin.Where(acr => acr.RoleId == coordinatorRoleId).ToListAsync();

            if (coordinator == null)
            {
                _logger.LogWarning($"Coordinator with ID not found");
                return NotFound();
            }

            return Ok(coordinator);
        }


        //Adding Coordinator
        [HttpPost("AddCoordinator")]
        public async Task<ActionResult<ACR>> PostCoordinator([FromForm] Imageacr acrimg)
        {
            if (string.IsNullOrEmpty(acrimg.Password))
            {
                return BadRequest(new { msg = "Please Enter all Field" });
            }


            // Check if the email already exists in the database
            if (_dbcontext.Admin.Any(a => a.Email == acrimg.Email))
            {
                return BadRequest(new { msg = "Email already exists" });
            }

            //checked if the contact already exists in the database
            if (_dbcontext.Admin.Any(a => a.Contact == acrimg.Contact))
            {
                return BadRequest(new { msg = "Contact already exists" });
            }
            string imageUrl = await UploadImage(acrimg.ImageFile);

            var acr = new ACR
            {
                Email = acrimg.Email,
                Name = acrimg.Name,
                Password = acrimg.Password,
                Contact = acrimg.Contact,
                Age = acrimg.Age,
                DateOfBirth = acrimg.DateOfBirth,
                Gender = acrimg.Gender,
                City = acrimg.City,
                State = acrimg.State,
                ImageURL = imageUrl
            };

            acr.RoleId = 3;
            acr.Password = _pservice.HashPassword(acr.Password);
            _dbcontext.Admin.Add(acr);
            await _dbcontext.SaveChangesAsync();
            acr.Password = null;

            return Ok(new { msg = "Successfully Added  Coordinator" });
        }

        //Updating Coordinator

        [HttpPut("updateCoordinator")]
        public async Task<ActionResult<ACR>> UpdateCoordinator(ACR acr)
        {
            if (acr == null || acr.Id == 0)
            {
                return BadRequest(new { msg = "Please Enter All Feild"});
            }

            var uacr = await _dbcontext.Admin.FindAsync(acr.Id);
            if (uacr == null)
            {
                return NotFound(new { msg = "Coordinator Not Found"});
            }

            // Check if the new email already exists
            if (await _dbcontext.Admin.AnyAsync(a => a.Id != acr.Id && a.Email == acr.Email))
            {
                return BadRequest(new { msg = "Email already exists for another coordinator." });
            }

            // Check if the new contact already exists
            if (await _dbcontext.Admin.AnyAsync(a => a.Id != acr.Id && a.Contact == acr.Contact))
            {
                return BadRequest(new { msg = "Contact already exists for another coordinator." });
            }
            acr.RoleId = 3;
            acr.Password = _pservice.HashPassword(acr.Password);


            uacr.Email = acr.Email;
            uacr.Name = acr.Name;
            uacr.Password = acr.Password;
            uacr.ImageURL  = acr.ImageURL;
            uacr.Contact = acr.Contact;
            uacr.Age = acr.Age;
            uacr.DateOfBirth = acr.DateOfBirth;
            uacr.Status = true;
            uacr.LastLogin = acr.LastLogin;
            uacr.Gender = acr.Gender;
            uacr.City = acr.City;
            uacr.State = acr.State;
            uacr.RoleId = acr.RoleId;
            await _dbcontext.SaveChangesAsync();


            return Ok(new { msg = "Successfully updated Coordinator" });
        }




        //Refree Section

        [HttpGet("Referee")]
        public async Task<ActionResult<ACR>> GetReferee()
        {
            // Assuming role ID 3 corresponds to the coordinator role
            int refereeRoleId = 4;

            // Fetch the coordinator from ACR table with the specified ID and role ID 4
            var referee = await _dbcontext.Admin.Where(acr => acr.RoleId == refereeRoleId).ToListAsync();

            if (referee == null)
            {
                _logger.LogWarning($"Referee with ID  not found");
                return NotFound();
            }

            return Ok(referee);
        }

        //Adding referee
        [HttpPost("AddReferee")]
        public async Task<ActionResult<ACR>> PostReferee(ACR acr)
        {
            if (string.IsNullOrEmpty(acr.Password))
            {
                return BadRequest(new { msg = "Please Enter all Field" });
            }

            // Check if the email already exists in the database
            if (_dbcontext.Admin.Any(a => a.Email == acr.Email))
            {
                return BadRequest( new { msg = "Email already exists" });
            }

            //checked if the contact already exists in the database
            if (_dbcontext.Admin.Any(a => a.Contact == acr.Contact))
            {
                return BadRequest(new { msg = "Contact already exists" });
            }

            acr.RoleId = 4;
            acr.Password = _pservice.HashPassword(acr.Password);
            _dbcontext.Admin.Add(acr);
            await _dbcontext.SaveChangesAsync();
            acr.Password = null;

            return Ok(new { msg = "Successfully Added Referee" });
        }

        //Update Referee

        [HttpPut("updateReferee")]
        public async Task<ActionResult<ACR>> UpdateReferee(ACR acr)
        {
            if (acr == null || acr.Id == 0)
            {
                return BadRequest(new { msg = "Please Enter All Field"});
            }

            var uacr = await _dbcontext.Admin.FindAsync(acr.Id);
            if (uacr == null)
            {
                return NotFound(new { msg = "Referee NOt Found"});
            }

            // Check if the new email already exists
            if (await _dbcontext.Admin.AnyAsync(a => a.Id != acr.Id && a.Email == acr.Email))
            {
                return BadRequest(new { msg = "Email already exists for another Referee." });
            }

            // Check if the new contact already exists
            if (await _dbcontext.Admin.AnyAsync(a => a.Id != acr.Id && a.Contact == acr.Contact))
            {
                return BadRequest(new { msg = "Contact already exists for another Referee." });
            }
            acr.RoleId = 4;
            acr.Password = _pservice.HashPassword(acr.Password);


            uacr.Email = acr.Email;
            uacr.Name = acr.Name;
            uacr.Password = acr.Password;
            uacr.ImageURL = acr.ImageURL;
            uacr.Contact = acr.Contact;
            uacr.Age = acr.Age;
            uacr.DateOfBirth = acr.DateOfBirth;
            uacr.Status = true;
            uacr.LastLogin = acr.LastLogin;
            uacr.Gender = acr.Gender;
            uacr.City = acr.City;
            uacr.State = acr.State;
            uacr.RoleId = acr.RoleId;
            await _dbcontext.SaveChangesAsync();


            return Ok(new { msg = "Successfully Updated Referee" });
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
    }
   
 
}
