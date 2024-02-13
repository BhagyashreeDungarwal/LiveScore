﻿using LiveScore.Model;
using LiveScoring.Model;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace LiveScore.Data
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext()
        {
            
        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Role> Roles { get; set; } = null!;
        public DbSet<ACR> Admin { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Coach> Coaches { get; set; } = null!;
        public DbSet<Athlete> Athletes { get; set; } = null!;
        public DbSet<Matchs> Matchss { get; set; } = null!;
        public DbSet<Round> Rounds { get; set; } = null!;
        public DbSet<Score> Scores { get; set; } = null!;
        public DbSet<Tournament> Tournaments { get; set; } = null!;
        public DbSet<Viewers> Viewerss { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.role)
                    .HasMaxLength(101);
            });

            modelBuilder.Entity<ACR>(entity =>
            {
                entity.HasKey(e => e.Id); 

                entity.Property(e => e.Email).IsRequired().HasMaxLength(101); 

                entity.Property(e => e.Name).IsRequired().HasMaxLength(101); 

                entity.Property(e => e.Password).IsRequired().HasMaxLength(101);

                entity.Property(e => e.Image).IsRequired(); 

                entity.Property(e => e.Contact).IsRequired().HasMaxLength(10); 

                entity.Property(e => e.Age).IsRequired().HasMaxLength(10); 

                entity.Property(e => e.DateOfBirth).IsRequired(); 

                entity.Property(e => e.LastLogin).IsRequired(false);  

                entity.Property(e => e.Gender).IsRequired(false).HasMaxLength(101); 

                entity.Property(e => e.City).IsRequired(false).HasMaxLength(101); 

                entity.Property(e => e.State).IsRequired(false).HasMaxLength(101); 

                entity.Property(e => e.RoleId).IsRequired(false);

                entity.HasOne(e => e.Role)
                    .WithMany()
                    .HasForeignKey(e => e.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(c => c.Id);

                entity.Property(c => c.Id).HasColumnName("Cid"); 
                entity.Property(c => c.CategoryName).IsRequired().HasMaxLength(101); 
            });
            modelBuilder.Entity<Coach>(entity =>
            {
                entity.HasKey(c => c.CoachId); 
                entity.Property(c => c.CoachName).IsRequired().HasMaxLength(101); 
                entity.Property(c => c.Gender).IsRequired().HasMaxLength(101); 
                entity.Property(c => c.CoachEmail).IsRequired().HasMaxLength(101);
                entity.Property(c => c.ContactNo).IsRequired().HasMaxLength(101); 
                entity.Property(c => c.Experience).IsRequired().HasMaxLength(101); 
                entity.Property(c => c.Achievements).IsRequired().HasMaxLength(101);

            });

            modelBuilder.Entity<Athlete>(entity =>
            {
                entity.HasKey(a => a.Id); 

                entity.Property(a => a.AthleteName).IsRequired().HasMaxLength(101);
                entity.Property(a => a.Email).IsRequired().HasMaxLength(101); 
                entity.Property(a => a.Contact).IsRequired().HasMaxLength(101); 
                entity.Property(a => a.ImageUrl).IsRequired(); 
                entity.Property(a => a.DateOfBirth).IsRequired().HasMaxLength(101); 
                entity.Property(a => a.Gender).IsRequired().HasMaxLength(101); 
               
                entity.Property(a => a.Height).IsRequired(); 
                entity.Property(a => a.Weight).IsRequired(false); 
                entity.Property(a => a.City).IsRequired().HasMaxLength(101); 
                entity.Property(a => a.State).IsRequired().HasMaxLength(101);
                entity.Property(a => a.CoachId).IsRequired();
                entity.Property(a => a.Coordinater).IsRequired(); 
                entity.Property(a => a.CategoryId).IsRequired(); 

                entity.HasOne(a => a.Category)
                    .WithMany()
                    .HasForeignKey(a => a.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict); 

                entity.HasOne(a => a.Coach)
                .WithMany()
                .HasForeignKey(a => a.CoachId)
                .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(a => a.acr)
                    .WithMany()
                    .HasForeignKey(a => a.Coordinater)
                    .OnDelete(DeleteBehavior.Restrict); 
            });

            modelBuilder.Entity<Matchs>(entity =>
            {
                entity.HasKey(m => m.MId); 

                entity.Property(m => m.MatchStatus).IsRequired().HasMaxLength(101); 
                entity.Property(m => m.NumberOfRound).IsRequired().HasMaxLength(101);
                entity.Property(r => r.MatchDate).IsRequired().HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(r => r.Matchtime).IsRequired().HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(m => m.AthleteRed).IsRequired(); 
                entity.Property(m => m.AthleteBlue).IsRequired(); 
                entity.Property(m => m.CategoryId).IsRequired(false); 

                entity.HasOne(m => m.Category)
                    .WithMany()
                    .HasForeignKey(m => m.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict); 

                entity.HasOne(m => m.Athlete)
                    .WithMany()
                    .HasForeignKey(m => m.AthleteRed)
                    .OnDelete(DeleteBehavior.Restrict); 

                entity.HasOne(m => m.Athlete)
                    .WithMany()
                    .HasForeignKey(m => m.AthleteBlue)
                    .OnDelete(DeleteBehavior.Restrict); 
            });

                modelBuilder.Entity<Round>(entity =>
                {
                    entity.HasKey(r => r.Id); 

                    entity.Property(r => r.Rounds).IsRequired().HasMaxLength(101); 
                    entity.Property(r => r.NumberOfRounds).IsRequired().HasMaxLength(101); 
                    entity.Property(r => r.ScoreList).IsRequired().HasMaxLength(101);
                    entity.Property(r => r.RoundTime).IsRequired().HasDefaultValueSql("CURRENT_TIMESTAMP"); 
                    entity.Property(r => r.MatchId).IsRequired(false); 

                    entity.HasOne(r => r.Match)
                        .WithMany()
                        .HasForeignKey(r => r.MatchId)
                        .OnDelete(DeleteBehavior.Restrict); 
                });

                  modelBuilder.Entity<Score>(entity =>
                {
                    entity.HasKey(s => s.ScoreId); 
                    entity.Property(s => s.RedPoints).IsRequired().HasMaxLength(10); 
                    entity.Property(s => s.BluePoints).IsRequired().HasMaxLength(10); 
                    entity.Property(s => s.ScoreType).IsRequired().HasMaxLength(101); 
                    entity.Property(s => s.Panelty).HasMaxLength(101); 
                    entity.Property(s => s.ScoreTime).IsRequired().HasDefaultValueSql("CURRENT_TIMESTAMP"); 
                    entity.Property(s => s.PaneltyTime).HasDefaultValueSql("CURRENT_TIMESTAMP"); 
                    entity.Property(s => s.Rounds).IsRequired(false); 
                    entity.Property(s => s.AthleteRed).IsRequired(false); 
                    entity.Property(s => s.AthleteBlue).IsRequired(false); 

                    entity.HasOne(s => s.Round)
                        .WithMany()
                        .HasForeignKey(s => s.Rounds)
                        .OnDelete(DeleteBehavior.Restrict); 

                    entity.HasOne(s => s.Athlete)
                        .WithMany()
                        .HasForeignKey(s => s.AthleteRed)
                        .OnDelete(DeleteBehavior.Restrict); 
                    entity.HasOne(s => s.Athlete)
                        .WithMany()
                        .HasForeignKey(s => s.AthleteBlue)
                        .OnDelete(DeleteBehavior.Restrict); 
                }); 

            modelBuilder.Entity<Tournament>(entity =>
            {
                entity.HasKey(t => t.TId); 

                entity.Property(t => t.TournamentName).IsRequired().HasMaxLength(10); 
                entity.Property(t => t.Location).IsRequired().HasMaxLength(10); 
                entity.Property(t => t.TournamentDate).IsRequired(); 
                entity.Property(t => t.MatchId).IsRequired(false); 
                entity.Property(t => t.CategoryId).IsRequired(false); 

                entity.HasOne(t => t.Match)
                    .WithMany()
                    .HasForeignKey(t => t.MatchId)
                    .OnDelete(DeleteBehavior.Restrict); 

                entity.HasOne(t => t.Category)
                    .WithMany()
                    .HasForeignKey(t => t.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict); 
            });

            modelBuilder.Entity<Viewers>(entity =>
            {
                entity.HasKey(e => e.VId);

                entity.Property(e => e.Email).IsRequired().HasMaxLength(101);

                entity.Property(e => e.Name).IsRequired().HasMaxLength(101);

                entity.Property(e => e.Password).IsRequired().HasMaxLength(101);

                entity.Property(e => e.Image).IsRequired();

                entity.Property(e => e.Contact).IsRequired().HasMaxLength(10);

                entity.Property(e => e.Gender).IsRequired(false).HasMaxLength(101);

                entity.Property(e => e.State).IsRequired(false).HasMaxLength(101);

            });
        } 
    }
}