using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class Athe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Scores_AthleteRed",
                table: "Scores",
                column: "AthleteRed");

            migrationBuilder.AddForeignKey(
                name: "FK_Scores_Athletes_AthleteRed",
                table: "Scores",
                column: "AthleteRed",
                principalTable: "Athletes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Scores_Athletes_AthleteRed",
                table: "Scores");

            migrationBuilder.DropIndex(
                name: "IX_Scores_AthleteRed",
                table: "Scores");
        }
    }
}
