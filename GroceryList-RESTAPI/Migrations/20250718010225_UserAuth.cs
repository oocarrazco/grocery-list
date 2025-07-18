using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GroceryListApi.Migrations
{
    /// <inheritdoc />
    public partial class UserAuth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add UserId column to GroceryLists
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "GroceryLists",
                type: "int",
                nullable: false,
                defaultValue: 1);

            // Ensure existing lists point to admin user
            migrationBuilder.Sql("UPDATE GroceryLists SET UserId = 1 WHERE UserId IS NULL OR UserId = 0");

            // Create Users table
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            // Seed default admin user
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "PasswordHash", "Username" },
                values: new object[] { 1, "$2b$10$mryKnIe0LYdQmlS7F7KYbOYGe1bSWiAj3vnkPHwQWJ76qdjMETV0S", "admin" });

            // Create index and FK for GroceryLists.UserId
            migrationBuilder.CreateIndex(
                name: "IX_GroceryLists_UserId",
                table: "GroceryLists",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroceryLists_Users_UserId",
                table: "GroceryLists",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroceryLists_Users_UserId",
                table: "GroceryLists");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_GroceryLists_UserId",
                table: "GroceryLists");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "GroceryLists");
        }
    }
}
