using Microsoft.EntityFrameworkCore.Migrations;

namespace RoomMate.Database.Migrations
{
    public partial class userFlatRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoleType",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "RoleType",
                table: "UserFlats",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoleType",
                table: "UserFlats");

            migrationBuilder.AddColumn<int>(
                name: "RoleType",
                table: "Users",
                nullable: false,
                defaultValue: 0);
        }
    }
}
