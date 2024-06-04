using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class MyFirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Scores_Rounds_Rounds",
                table: "Scores");

            migrationBuilder.DropIndex(
                name: "IX_Scores_Rounds",
                table: "Scores");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Scores_Rounds",
                table: "Scores",
                column: "Rounds");

            migrationBuilder.AddForeignKey(
                name: "FK_Scores_Rounds_Rounds",
                table: "Scores",
                column: "Rounds",
                principalTable: "Rounds",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
