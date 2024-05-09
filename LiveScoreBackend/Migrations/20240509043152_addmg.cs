using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class addmg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Matchss");

            migrationBuilder.AddColumn<int>(
                name: "MatchGroup",
                table: "Matchss",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MatchGroup",
                table: "Matchss");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Matchss",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
