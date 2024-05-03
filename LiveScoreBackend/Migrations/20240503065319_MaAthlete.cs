using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class MaAthlete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Matchss_AthleteRed",
                table: "Matchss",
                column: "AthleteRed");

            migrationBuilder.AddForeignKey(
                name: "FK_Matchss_Athletes_AthleteRed",
                table: "Matchss",
                column: "AthleteRed",
                principalTable: "Athletes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matchss_Athletes_AthleteRed",
                table: "Matchss");

            migrationBuilder.DropIndex(
                name: "IX_Matchss_AthleteRed",
                table: "Matchss");
        }
    }
}
