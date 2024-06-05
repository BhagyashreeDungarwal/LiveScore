using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class round : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "NumberOfRound",
                table: "Matchss",
                type: "int",
                maxLength: 101,
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldMaxLength: 101);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "NumberOfRound",
                table: "Matchss",
                type: "int",
                maxLength: 101,
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldMaxLength: 101,
                oldNullable: true);
        }
    }
}
