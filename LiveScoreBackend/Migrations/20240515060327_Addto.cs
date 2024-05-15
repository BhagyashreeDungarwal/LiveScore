using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class Addto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "MatchType",
                table: "Matchss",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(101)",
                oldMaxLength: 101);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "MatchType",
                table: "Matchss",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(101)",
                oldMaxLength: 101,
                oldNullable: true);
        }
    }
}
