using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class Category : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryTime",
                table: "Categories");

            migrationBuilder.AddColumn<string>(
                name: "CategoryAge",
                table: "Categories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Categories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryAge",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Categories");

            migrationBuilder.AddColumn<int>(
                name: "CategoryTime",
                table: "Categories",
                type: "int",
                maxLength: 10,
                nullable: false,
                defaultValue: 0);
        }
    }
}
