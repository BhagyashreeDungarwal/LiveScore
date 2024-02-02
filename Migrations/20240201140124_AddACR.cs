using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class AddACR : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    Email = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: false),
                    Contact = table.Column<int>(type: "int", maxLength: 10, nullable: false),
                    Age = table.Column<int>(type: "int", maxLength: 10, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastLogin = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Gender = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: true),
                    City = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: true),
                    State = table.Column<string>(type: "nvarchar(101)", maxLength: 101, nullable: true),
                    RoleId = table.Column<int>(type: "int", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.Email);
                    table.ForeignKey(
                        name: "FK_Admin_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Admin_RoleId",
                table: "Admin",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admin");
        }
    }
}
