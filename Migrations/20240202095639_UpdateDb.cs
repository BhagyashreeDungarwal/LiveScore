using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiveScore.Migrations
{
    public partial class UpdateDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Scores_Athletes_AthleteId",
                table: "Scores");

            migrationBuilder.DropIndex(
                name: "IX_Scores_AthleteId",
                table: "Scores");

            migrationBuilder.RenameColumn(
                name: "PointsAwarded",
                table: "Scores",
                newName: "RedPoints");

            migrationBuilder.RenameColumn(
                name: "AthleteId",
                table: "Scores",
                newName: "AthleteRed");

            migrationBuilder.RenameColumn(
                name: "Weigth",
                table: "Athletes",
                newName: "Weight");

            migrationBuilder.RenameColumn(
                name: "CouchName",
                table: "Athletes",
                newName: "CoachName");

            migrationBuilder.AlterColumn<string>(
                name: "TournamentName",
                table: "Tournaments",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Tournaments",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "AthleteBlue",
                table: "Scores",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BluePoints",
                table: "Scores",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PaneltyPlayer",
                table: "Scores",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "MatchDate",
                table: "Matchss",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AddColumn<DateTime>(
                name: "Matchtime",
                table: "Matchss",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Athletes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Coordinater",
                table: "Athletes",
                type: "nvarchar(101)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Scores_AthleteBlue",
                table: "Scores",
                column: "AthleteBlue");

            migrationBuilder.CreateIndex(
                name: "IX_Athletes_Coordinater",
                table: "Athletes",
                column: "Coordinater");

            migrationBuilder.AddForeignKey(
                name: "FK_Athletes_Admin_Coordinater",
                table: "Athletes",
                column: "Coordinater",
                principalTable: "Admin",
                principalColumn: "Email",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Scores_Athletes_AthleteBlue",
                table: "Scores",
                column: "AthleteBlue",
                principalTable: "Athletes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Athletes_Admin_Coordinater",
                table: "Athletes");

            migrationBuilder.DropForeignKey(
                name: "FK_Scores_Athletes_AthleteBlue",
                table: "Scores");

            migrationBuilder.DropIndex(
                name: "IX_Scores_AthleteBlue",
                table: "Scores");

            migrationBuilder.DropIndex(
                name: "IX_Athletes_Coordinater",
                table: "Athletes");

            migrationBuilder.DropColumn(
                name: "AthleteBlue",
                table: "Scores");

            migrationBuilder.DropColumn(
                name: "BluePoints",
                table: "Scores");

            migrationBuilder.DropColumn(
                name: "PaneltyPlayer",
                table: "Scores");

            migrationBuilder.DropColumn(
                name: "MatchDate",
                table: "Matchss");

            migrationBuilder.DropColumn(
                name: "Matchtime",
                table: "Matchss");

            migrationBuilder.DropColumn(
                name: "Coordinater",
                table: "Athletes");

            migrationBuilder.RenameColumn(
                name: "RedPoints",
                table: "Scores",
                newName: "PointsAwarded");

            migrationBuilder.RenameColumn(
                name: "AthleteRed",
                table: "Scores",
                newName: "AthleteId");

            migrationBuilder.RenameColumn(
                name: "Weight",
                table: "Athletes",
                newName: "Weigth");

            migrationBuilder.RenameColumn(
                name: "CoachName",
                table: "Athletes",
                newName: "CouchName");

            migrationBuilder.AlterColumn<string>(
                name: "TournamentName",
                table: "Tournaments",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10);

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Tournaments",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10);

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Athletes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Scores_AthleteId",
                table: "Scores",
                column: "AthleteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Scores_Athletes_AthleteId",
                table: "Scores",
                column: "AthleteId",
                principalTable: "Athletes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
