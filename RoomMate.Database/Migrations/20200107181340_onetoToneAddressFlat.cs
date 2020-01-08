using Microsoft.EntityFrameworkCore.Migrations;

namespace RoomMate.Database.Migrations
{
    public partial class onetoToneAddressFlat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flats_Addresses_FlatAddressId",
                table: "Flats");

            migrationBuilder.DropIndex(
                name: "IX_Flats_FlatAddressId",
                table: "Flats");

            migrationBuilder.RenameColumn(
                name: "FlatAddressId",
                table: "Flats",
                newName: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Flats_AddressId",
                table: "Flats",
                column: "AddressId",
                unique: true,
                filter: "[AddressId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Flats_Addresses_AddressId",
                table: "Flats",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flats_Addresses_AddressId",
                table: "Flats");

            migrationBuilder.DropIndex(
                name: "IX_Flats_AddressId",
                table: "Flats");

            migrationBuilder.RenameColumn(
                name: "AddressId",
                table: "Flats",
                newName: "FlatAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Flats_FlatAddressId",
                table: "Flats",
                column: "FlatAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flats_Addresses_FlatAddressId",
                table: "Flats",
                column: "FlatAddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
