﻿using LiveScore.Data;
using LiveScore.Model;
using LiveScore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using Microsoft.Win32;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LiveScore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Logincontroller : ControllerBase
    {
        private readonly ApplicationDbContext _dbcontext;
        private readonly PasswordService _pservice;
        private readonly IConfiguration _config;
       

        public Logincontroller(ApplicationDbContext dbcontext,PasswordService pservice , IConfiguration config)
        {
            _dbcontext = dbcontext;
            _pservice = pservice;
            _config = config;
            
        }


        [HttpPost("Login")]
        public async Task<ActionResult<Login>> Login(Login login)
        {
            var user = await _dbcontext.Admin.FirstOrDefaultAsync(u => u.Email == login.Email);


            if (user == null)
            {
                return NotFound(" Email not Found...");
            }

            bool passwordMatches = _pservice.VerifyPassword(login.Password, user.Password);

            if (passwordMatches)
            {

                  user.LastLogin = DateTime.Now;
                //_dbcontext.Update(user);
                //_dbcontext.Admin.Update(user);

                //user.City = "Surat";
             await _dbcontext.SaveChangesAsync();
                var token = GenerateToken(user);
                //return Ok("Hey Queen You Drop Your Crown");
                return Ok(new { token = token , role = user.RoleId });
            }
            else
            {
                // Incorrect password
                return Unauthorized("Invalid credentials");
            }
        }



        private string GenerateToken(ACR user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Name),
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}