using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class CategoryChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryAge",
                table: "Categories");

            migrationBuilder.AddColumn<int>(
                name: "MaxAge",
                table: "Categories",
                type: "int",
                maxLength: 10,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MaxWeight",
                table: "Categories",
                type: "int",
                maxLength: 10,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MinAge",
                table: "Categories",
                type: "int",
                maxLength: 10,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MinWeight",
                table: "Categories",
                type: "int",
                maxLength: 10,
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxAge",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "MaxWeight",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "MinAge",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "MinWeight",
                table: "Categories");

            migrationBuilder.AddColumn<string>(
                name: "CategoryAge",
                table: "Categories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");
        }
    }
}
