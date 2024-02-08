using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class AllDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Cid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Cid);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    role = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Viewerss",
                columns: table => new
                {
                    VId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contact = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: true),
                    State = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Viewerss", x => x.VId);
                });

            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contact = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Age = table.Column<int>(type: "int", maxLength: 10, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastLogin = table.Column<DateTime>(type: "datetime", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: true),
                    City = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: true),
                    State = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: true),
                    RoleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Admin_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Athletes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AthleteName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CoachName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Height = table.Column<int>(type: "int", nullable: false),
                    Weight = table.Column<int>(type: "int", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    Coordinater = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Athletes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Athletes_Admin_Coordinater",
                        column: x => x.Coordinater,
                        principalTable: "Admin",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Athletes_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Cid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Matchss",
                columns: table => new
                {
                    MId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchStatus = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    NumberOfRound = table.Column<int>(type: "int", maxLength: 101, nullable: false),
                    MatchDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Matchtime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    AthleteRed = table.Column<int>(type: "int", nullable: false),
                    AthleteBlue = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matchss", x => x.MId);
                    table.ForeignKey(
                        name: "FK_Matchss_Athletes_AthleteBlue",
                        column: x => x.AthleteBlue,
                        principalTable: "Athletes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matchss_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Cid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Rounds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rounds = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    NumberOfRounds = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    ScoreList = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    RoundTime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    MatchId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rounds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rounds_Matchss_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Matchss",
                        principalColumn: "MId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tournaments",
                columns: table => new
                {
                    TId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TournamentName = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Location = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    TournamentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MatchId = table.Column<int>(type: "int", nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tournaments", x => x.TId);
                    table.ForeignKey(
                        name: "FK_Tournaments_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Cid",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tournaments_Matchss_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Matchss",
                        principalColumn: "MId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Scores",
                columns: table => new
                {
                    ScoreId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RedPoints = table.Column<int>(type: "int", maxLength: 10, nullable: false),
                    BluePoints = table.Column<int>(type: "int", maxLength: 10, nullable: false),
                    ScoreType = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    PaneltyPlayer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Panelty = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    ScoreTime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    PaneltyTime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Rounds = table.Column<int>(type: "int", nullable: true),
                    AthleteRed = table.Column<int>(type: "int", nullable: true),
                    AthleteBlue = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scores", x => x.ScoreId);
                    table.ForeignKey(
                        name: "FK_Scores_Athletes_AthleteBlue",
                        column: x => x.AthleteBlue,
                        principalTable: "Athletes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Scores_Rounds_Rounds",
                        column: x => x.Rounds,
                        principalTable: "Rounds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Admin_RoleId",
                table: "Admin",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Athletes_CategoryId",
                table: "Athletes",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Athletes_Coordinater",
                table: "Athletes",
                column: "Coordinater");

            migrationBuilder.CreateIndex(
                name: "IX_Matchss_AthleteBlue",
                table: "Matchss",
                column: "AthleteBlue");

            migrationBuilder.CreateIndex(
                name: "IX_Matchss_CategoryId",
                table: "Matchss",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Rounds_MatchId",
                table: "Rounds",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_Scores_AthleteBlue",
                table: "Scores",
                column: "AthleteBlue");

            migrationBuilder.CreateIndex(
                name: "IX_Scores_Rounds",
                table: "Scores",
                column: "Rounds");

            migrationBuilder.CreateIndex(
                name: "IX_Tournaments_CategoryId",
                table: "Tournaments",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Tournaments_MatchId",
                table: "Tournaments",
                column: "MatchId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Scores");

            migrationBuilder.DropTable(
                name: "Tournaments");

            migrationBuilder.DropTable(
                name: "Viewerss");

            migrationBuilder.DropTable(
                name: "Rounds");

            migrationBuilder.DropTable(
                name: "Matchss");

            migrationBuilder.DropTable(
                name: "Athletes");

            migrationBuilder.DropTable(
                name: "Admin");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
