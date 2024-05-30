using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class ChangesRandS : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MatchId",
                table: "Scores",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BlueTotalScore",
                table: "Rounds",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RedTotalScore",
                table: "Rounds",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RoundWinner",
                table: "Rounds",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Scores_MatchId",
                table: "Scores",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_Rounds_RoundWinner",
                table: "Rounds",
                column: "RoundWinner");

            migrationBuilder.AddForeignKey(
                name: "FK_Rounds_Athletes_RoundWinner",
                table: "Rounds",
                column: "RoundWinner",
                principalTable: "Athletes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Scores_Matchss_MatchId",
                table: "Scores",
                column: "MatchId",
                principalTable: "Matchss",
                principalColumn: "MId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rounds_Athletes_RoundWinner",
                table: "Rounds");

            migrationBuilder.DropForeignKey(
                name: "FK_Scores_Matchss_MatchId",
                table: "Scores");

            migrationBuilder.DropIndex(
                name: "IX_Scores_MatchId",
                table: "Scores");

            migrationBuilder.DropIndex(
                name: "IX_Rounds_RoundWinner",
                table: "Rounds");

            migrationBuilder.DropColumn(
                name: "MatchId",
                table: "Scores");

            migrationBuilder.DropColumn(
                name: "BlueTotalScore",
                table: "Rounds");

            migrationBuilder.DropColumn(
                name: "RedTotalScore",
                table: "Rounds");

            migrationBuilder.DropColumn(
                name: "RoundWinner",
                table: "Rounds");
        }
    }
}
