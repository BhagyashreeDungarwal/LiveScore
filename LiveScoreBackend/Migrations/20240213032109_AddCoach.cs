using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class AddCoach : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoachName",
                table: "Athletes");

            migrationBuilder.AlterColumn<string>(
                name: "State",
                table: "Athletes",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Gender",
                table: "Athletes",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Athletes",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Contact",
                table: "Athletes",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "Athletes",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "AthleteName",
                table: "Athletes",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "CoachId",
                table: "Athletes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Coach",
                columns: table => new
                {
                    CoachId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CoachName = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    CoachEmail = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    ContactNo = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    Experience = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    Achievements = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coach", x => x.CoachId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Athletes_CoachId",
                table: "Athletes",
                column: "CoachId");

            migrationBuilder.AddForeignKey(
                name: "FK_Athletes_Coach_CoachId",
                table: "Athletes",
                column: "CoachId",
                principalTable: "Coach",
                principalColumn: "CoachId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Athletes_Coach_CoachId",
                table: "Athletes");

            migrationBuilder.DropTable(
                name: "Coach");

            migrationBuilder.DropIndex(
                name: "IX_Athletes_CoachId",
                table: "Athletes");

            migrationBuilder.DropColumn(
                name: "CoachId",
                table: "Athletes");

            migrationBuilder.AlterColumn<string>(
                name: "State",
                table: "Athletes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(101)",
                oldMaxLength: 101);

            migrationBuilder.AlterColumn<string>(
                name: "Gender",
                table: "Athletes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(101)",
                oldMaxLength: 101);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Athletes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(101)",
                oldMaxLength: 101);

            migrationBuilder.AlterColumn<string>(
                name: "Contact",
                table: "Athletes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(101)",
                oldMaxLength: 101);

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "Athletes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(101)",
                oldMaxLength: 101);

            migrationBuilder.AlterColumn<string>(
                name: "AthleteName",
                table: "Athletes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(101)",
                oldMaxLength: 101);

            migrationBuilder.AddColumn<string>(
                name: "CoachName",
                table: "Athletes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
