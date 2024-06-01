using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class addtoscore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Panelty",
                table: "Scores");

            migrationBuilder.DropColumn(
                name: "PaneltyPlayer",
                table: "Scores");

            migrationBuilder.DropColumn(
                name: "PaneltyTime",
                table: "Scores");

            migrationBuilder.DropColumn(
                name: "ScoreType",
                table: "Scores");

            migrationBuilder.AddColumn<int>(
                name: "BluePanelty",
                table: "Scores",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RedPanelty",
                table: "Scores",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BluePanelty",
                table: "Scores");

            migrationBuilder.DropColumn(
                name: "RedPanelty",
                table: "Scores");

            migrationBuilder.AddColumn<string>(
                name: "Panelty",
                table: "Scores",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PaneltyPlayer",
                table: "Scores",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "PaneltyTime",
                table: "Scores",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AddColumn<string>(
                name: "ScoreType",
                table: "Scores",
                type: "nvarchar(101)",
                maxLength: 101,
                nullable: false,
                defaultValue: "");
        }
    }
}
