﻿// <auto-generated />
using System;
using LiveScore.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LiveScore.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.26")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("LiveScore.Model.ACR", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Age")
                        .HasMaxLength(10)
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("Contact")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("Gender")
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("ImageURL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("LastLogin")
                        .HasColumnType("datetime");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<int?>("RoleId")
                        .HasColumnType("int");

                    b.Property<string>("State")
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Admin");
                });

            modelBuilder.Entity("LiveScore.Model.Coach", b =>
                {
                    b.Property<int>("CoachId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CoachId"), 1L, 1);

                    b.Property<string>("Achievements")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("CoachEmail")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("CoachName")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("ContactNo")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("Experience")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CoachId");

                    b.ToTable("Coaches");
                });

            modelBuilder.Entity("LiveScore.Model.Viewers", b =>
                {
                    b.Property<int>("VId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("VId"), 1L, 1);

                    b.Property<string>("Contact")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("Gender")
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("State")
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.HasKey("VId");

                    b.ToTable("Viewerss");
                });

            modelBuilder.Entity("LiveScoring.Model.Athlete", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("AthleteName")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<int>("CoachId")
                        .HasColumnType("int");

                    b.Property<string>("Contact")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<int>("Coordinater")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOfBirth")
                        .HasMaxLength(101)
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<double>("Height")
                        .HasColumnType("float");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<double?>("Weight")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("CoachId");

                    b.HasIndex("Coordinater");

                    b.ToTable("Athletes");
                });

            modelBuilder.Entity("LiveScoring.Model.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Cid");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("LiveScoring.Model.Matchs", b =>
                {
                    b.Property<int>("MId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MId"), 1L, 1);

                    b.Property<int?>("AthleteBlue")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int?>("AthleteRed")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("MatchDate")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.Property<string>("MatchStatus")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("MatchType")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<DateTime>("Matchtime")
                        .HasColumnType("datetime2");

                    b.Property<int>("NumberOfRound")
                        .HasMaxLength(101)
                        .HasColumnType("int");

                    b.Property<int?>("TournamentId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("MId");

                    b.HasIndex("AthleteBlue");

                    b.HasIndex("CategoryId");

                    b.HasIndex("TournamentId");

                    b.ToTable("Matchss");
                });

            modelBuilder.Entity("LiveScoring.Model.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("role")
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("LiveScoring.Model.Round", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("MatchId")
                        .HasColumnType("int");

                    b.Property<string>("NumberOfRounds")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<DateTime?>("RoundTime")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("Rounds")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("ScoreList")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.HasKey("Id");

                    b.HasIndex("MatchId");

                    b.ToTable("Rounds");
                });

            modelBuilder.Entity("LiveScoring.Model.Score", b =>
                {
                    b.Property<int>("ScoreId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ScoreId"), 1L, 1);

                    b.Property<int?>("AthleteBlue")
                        .HasColumnType("int");

                    b.Property<int?>("AthleteRed")
                        .HasColumnType("int");

                    b.Property<int?>("BluePoints")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("int");

                    b.Property<string>("Panelty")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("PaneltyPlayer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("PaneltyTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<int?>("RedPoints")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("int");

                    b.Property<int?>("Rounds")
                        .HasColumnType("int");

                    b.Property<DateTime?>("ScoreTime")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("ScoreType")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.HasKey("ScoreId");

                    b.HasIndex("AthleteBlue");

                    b.HasIndex("Rounds");

                    b.ToTable("Scores");
                });

            modelBuilder.Entity("LiveScoring.Model.Tournament", b =>
                {
                    b.Property<int>("TId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TId"), 1L, 1);

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<DateTime>("TournamentDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("TournamentName")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("TId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Tournaments");
                });

            modelBuilder.Entity("LiveScore.Model.ACR", b =>
                {
                    b.HasOne("LiveScoring.Model.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("LiveScoring.Model.Athlete", b =>
                {
                    b.HasOne("LiveScoring.Model.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("LiveScore.Model.Coach", "Coach")
                        .WithMany()
                        .HasForeignKey("CoachId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("LiveScore.Model.ACR", "acr")
                        .WithMany()
                        .HasForeignKey("Coordinater")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Coach");

                    b.Navigation("acr");
                });

            modelBuilder.Entity("LiveScoring.Model.Matchs", b =>
                {
                    b.HasOne("LiveScoring.Model.Athlete", "Athlete")
                        .WithMany()
                        .HasForeignKey("AthleteBlue")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("LiveScoring.Model.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("LiveScoring.Model.Tournament", "Tournament")
                        .WithMany()
                        .HasForeignKey("TournamentId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Athlete");

                    b.Navigation("Category");

                    b.Navigation("Tournament");
                });

            modelBuilder.Entity("LiveScoring.Model.Round", b =>
                {
                    b.HasOne("LiveScoring.Model.Matchs", "Match")
                        .WithMany()
                        .HasForeignKey("MatchId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Match");
                });

            modelBuilder.Entity("LiveScoring.Model.Score", b =>
                {
                    b.HasOne("LiveScoring.Model.Athlete", "Athlete")
                        .WithMany()
                        .HasForeignKey("AthleteBlue")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("LiveScoring.Model.Round", "Round")
                        .WithMany()
                        .HasForeignKey("Rounds")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Athlete");

                    b.Navigation("Round");
                });

            modelBuilder.Entity("LiveScoring.Model.Tournament", b =>
                {
                    b.HasOne("LiveScoring.Model.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Category");
                });
#pragma warning restore 612, 618
        }
    }
}
