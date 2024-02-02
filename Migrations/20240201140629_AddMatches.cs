using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class AddMatches : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Matchss",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchStatus = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    NumberOfRound = table.Column<int>(type: "int", maxLength: 101, nullable: false),
                    AthleteRed = table.Column<int>(type: "int", nullable: false),
                    AthleteBlue = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matchss", x => x.Id);
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

            migrationBuilder.CreateIndex(
                name: "IX_Matchss_AthleteBlue",
                table: "Matchss",
                column: "AthleteBlue");

            migrationBuilder.CreateIndex(
                name: "IX_Matchss_CategoryId",
                table: "Matchss",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Matchss");
        }
    }
}
