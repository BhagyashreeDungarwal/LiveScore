﻿using LiveScore.Services;
using Microsoft.Extensions.Configuration;


    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
     

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<PasswordService>();
      
    }

        public void Configure(WebApplication app, IWebHostEnvironment env)
        {
    }
    }

