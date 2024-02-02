﻿// <auto-generated />
using System;
using LiveScore.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LiveScore.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240201153955_AddScores")]
    partial class AddScores
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.26")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("LiveScore.Model.ACR", b =>
                {
                    b.Property<string>("Email")
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<int>("Age")
                        .HasMaxLength(10)
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<int>("Contact")
                        .HasMaxLength(10)
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Gender")
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("LastLogin")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

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

                    b.HasKey("Email");

                    b.HasIndex("RoleId");

                    b.ToTable("Admin");
                });

            modelBuilder.Entity("LiveScoring.Model.Athlete", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("AthleteName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Contact")
                        .HasColumnType("int");

                    b.Property<string>("CouchName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Height")
                        .HasColumnType("int");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Weigth")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

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
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("AthleteBlue")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int?>("AthleteRed")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("MatchStatus")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<int>("NumberOfRound")
                        .HasMaxLength(101)
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AthleteBlue");

                    b.HasIndex("CategoryId");

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
                        .ValueGeneratedOnAddOrUpdate()
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

                    b.Property<int?>("AthleteId")
                        .HasColumnType("int");

                    b.Property<string>("Panelty")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.Property<DateTime>("PaneltyTime")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("PointsAwarded")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<int?>("Rounds")
                        .HasColumnType("int");

                    b.Property<DateTime?>("ScoreTime")
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("ScoreType")
                        .IsRequired()
                        .HasMaxLength(101)
                        .HasColumnType("nvarchar(101)");

                    b.HasKey("ScoreId");

                    b.HasIndex("AthleteId");

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
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("MatchId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("TournamentDate")
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2");

                    b.Property<string>("TournamentName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("MatchId");

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
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Category");
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

                    b.Navigation("Athlete");

                    b.Navigation("Category");
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
                        .HasForeignKey("AthleteId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

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

                    b.HasOne("LiveScoring.Model.Matchs", "Match")
                        .WithMany()
                        .HasForeignKey("MatchId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Category");

                    b.Navigation("Match");
                });
#pragma warning restore 612, 618
        }
    }
}
