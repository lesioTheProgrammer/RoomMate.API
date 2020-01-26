using Microsoft.EntityFrameworkCore.Migrations;

namespace RoomMate.Database.Migrations
{
    public partial class fixUserFlats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserFlat_Flats_FlatId",
                table: "UserFlat");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFlat_Users_UserId",
                table: "UserFlat");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserFlat",
                table: "UserFlat");

            migrationBuilder.DropIndex(
                name: "IX_UserFlat_UserId",
                table: "UserFlat");

            migrationBuilder.RenameTable(
                name: "UserFlat",
                newName: "UserFlats");

            migrationBuilder.RenameIndex(
                name: "IX_UserFlat_FlatId",
                table: "UserFlats",
                newName: "IX_UserFlats_FlatId");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_UserFlats_Id",
                table: "UserFlats",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserFlats",
                table: "UserFlats",
                columns: new[] { "UserId", "FlatId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserFlats_Flats_FlatId",
                table: "UserFlats",
                column: "FlatId",
                principalTable: "Flats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserFlats_Users_UserId",
                table: "UserFlats",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserFlats_Flats_FlatId",
                table: "UserFlats");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFlats_Users_UserId",
                table: "UserFlats");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_UserFlats_Id",
                table: "UserFlats");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserFlats",
                table: "UserFlats");

            migrationBuilder.RenameTable(
                name: "UserFlats",
                newName: "UserFlat");

            migrationBuilder.RenameIndex(
                name: "IX_UserFlats_FlatId",
                table: "UserFlat",
                newName: "IX_UserFlat_FlatId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserFlat",
                table: "UserFlat",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserFlat_UserId",
                table: "UserFlat",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserFlat_Flats_FlatId",
                table: "UserFlat",
                column: "FlatId",
                principalTable: "Flats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserFlat_Users_UserId",
                table: "UserFlat",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
