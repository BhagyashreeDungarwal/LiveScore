using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class Addtodb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_Categories_CategoryId",
                table: "Tournaments");

            migrationBuilder.DropIndex(
                name: "IX_Tournaments_CategoryId",
                table: "Tournaments");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Tournaments");

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Tournaments",
                newName: "Venue");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Venue",
                table: "Tournaments",
                newName: "Location");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Tournaments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tournaments_CategoryId",
                table: "Tournaments",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_Categories_CategoryId",
                table: "Tournaments",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Cid",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
