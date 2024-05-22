using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class TournamentandMatch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TournamentCoordinator",
                table: "Tournaments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MatchCoordinator",
                table: "Matchss",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Referee1",
                table: "Matchss",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Referee2",
                table: "Matchss",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Referee3",
                table: "Matchss",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tournaments_TournamentCoordinator",
                table: "Tournaments",
                column: "TournamentCoordinator");

            migrationBuilder.CreateIndex(
                name: "IX_Matchss_MatchCoordinator",
                table: "Matchss",
                column: "MatchCoordinator");

            migrationBuilder.CreateIndex(
                name: "IX_Matchss_Referee1",
                table: "Matchss",
                column: "Referee1");

            migrationBuilder.CreateIndex(
                name: "IX_Matchss_Referee2",
                table: "Matchss",
                column: "Referee2");

            migrationBuilder.CreateIndex(
                name: "IX_Matchss_Referee3",
                table: "Matchss",
                column: "Referee3");

            migrationBuilder.AddForeignKey(
                name: "FK_Matchss_Admin_MatchCoordinator",
                table: "Matchss",
                column: "MatchCoordinator",
                principalTable: "Admin",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Matchss_Admin_Referee1",
                table: "Matchss",
                column: "Referee1",
                principalTable: "Admin",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Matchss_Admin_Referee2",
                table: "Matchss",
                column: "Referee2",
                principalTable: "Admin",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Matchss_Admin_Referee3",
                table: "Matchss",
                column: "Referee3",
                principalTable: "Admin",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_Admin_TournamentCoordinator",
                table: "Tournaments",
                column: "TournamentCoordinator",
                principalTable: "Admin",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matchss_Admin_MatchCoordinator",
                table: "Matchss");

            migrationBuilder.DropForeignKey(
                name: "FK_Matchss_Admin_Referee1",
                table: "Matchss");

            migrationBuilder.DropForeignKey(
                name: "FK_Matchss_Admin_Referee2",
                table: "Matchss");

            migrationBuilder.DropForeignKey(
                name: "FK_Matchss_Admin_Referee3",
                table: "Matchss");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_Admin_TournamentCoordinator",
                table: "Tournaments");

            migrationBuilder.DropIndex(
                name: "IX_Tournaments_TournamentCoordinator",
                table: "Tournaments");

            migrationBuilder.DropIndex(
                name: "IX_Matchss_MatchCoordinator",
                table: "Matchss");

            migrationBuilder.DropIndex(
                name: "IX_Matchss_Referee1",
                table: "Matchss");

            migrationBuilder.DropIndex(
                name: "IX_Matchss_Referee2",
                table: "Matchss");

            migrationBuilder.DropIndex(
                name: "IX_Matchss_Referee3",
                table: "Matchss");

            migrationBuilder.DropColumn(
                name: "TournamentCoordinator",
                table: "Tournaments");

            migrationBuilder.DropColumn(
                name: "MatchCoordinator",
                table: "Matchss");

            migrationBuilder.DropColumn(
                name: "Referee1",
                table: "Matchss");

            migrationBuilder.DropColumn(
                name: "Referee2",
                table: "Matchss");

            migrationBuilder.DropColumn(
                name: "Referee3",
                table: "Matchss");
        }
    }
}
