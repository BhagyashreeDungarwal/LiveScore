using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class Minor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Athletes_Coach_CoachId",
                table: "Athletes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Coach",
                table: "Coach");

            migrationBuilder.RenameTable(
                name: "Coach",
                newName: "Coaches");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Coaches",
                table: "Coaches",
                column: "CoachId");

            migrationBuilder.AddForeignKey(
                name: "FK_Athletes_Coaches_CoachId",
                table: "Athletes",
                column: "CoachId",
                principalTable: "Coaches",
                principalColumn: "CoachId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Athletes_Coaches_CoachId",
                table: "Athletes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Coaches",
                table: "Coaches");

            migrationBuilder.RenameTable(
                name: "Coaches",
                newName: "Coach");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Coach",
                table: "Coach",
                column: "CoachId");

            migrationBuilder.AddForeignKey(
                name: "FK_Athletes_Coach_CoachId",
                table: "Athletes",
                column: "CoachId",
                principalTable: "Coach",
                principalColumn: "CoachId");
        }
    }
}
