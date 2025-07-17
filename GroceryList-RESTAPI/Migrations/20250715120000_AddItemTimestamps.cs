using Microsoft.EntityFrameworkCore.Migrations;

namespace GroceryListApi.Migrations
{
    public partial class AddItemTimestamps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Items",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()"
            );
            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Items",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Items"
            );
            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Items"
            );
        }
    }
}
