using LiveScore.Data;
using LiveScore.Model;
using LiveScore.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;


    var builder = WebApplication.CreateBuilder(args);

//For Bcrypt Password
var startup = new Startup(builder.Configuration);

startup.ConfigureServices(builder.Services);

// Add services to the container.

//for cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder
        .WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();
//JWT Token
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    }
    );

//For Database Connection
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")
    ));

//For Email Services

builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.AddTransient<IImageUploader, UploadImage>();

//SignalR
builder.Services.AddSignalR();

//for In Memory cache
builder.Services.AddMemoryCache();
var app = builder.Build();          

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Fetch image
app.UseStaticFiles();

//signalR
app.MapHub<ScoreHub>("/scoreHub");

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
