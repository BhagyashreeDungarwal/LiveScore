using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class add : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfRounds",
                table: "Rounds");

            migrationBuilder.DropColumn(
                name: "ScoreList",
                table: "Rounds");

            migrationBuilder.AlterColumn<int>(
                name: "Rounds",
                table: "Rounds",
                type: "int",
                maxLength: 11,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(101)",
                oldMaxLength: 101);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Rounds",
                table: "Rounds",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldMaxLength: 11);

            migrationBuilder.AddColumn<string>(
                name: "NumberOfRounds",
                table: "Rounds",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ScoreList",
                table: "Rounds",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: false,
                defaultValue: "");
        }
    }
}
