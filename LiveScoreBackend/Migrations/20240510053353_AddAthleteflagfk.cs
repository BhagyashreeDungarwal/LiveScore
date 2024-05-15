using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class AddAthleteflagfk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Flag",
                table: "Matchss",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Matchss_Flag",
                table: "Matchss",
                column: "Flag");

            migrationBuilder.AddForeignKey(
                name: "FK_Matchss_Athletes_Flag",
                table: "Matchss",
                column: "Flag",
                principalTable: "Athletes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matchss_Athletes_Flag",
                table: "Matchss");

            migrationBuilder.DropIndex(
                name: "IX_Matchss_Flag",
                table: "Matchss");

            migrationBuilder.AlterColumn<string>(
                name: "Flag",
                table: "Matchss",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
