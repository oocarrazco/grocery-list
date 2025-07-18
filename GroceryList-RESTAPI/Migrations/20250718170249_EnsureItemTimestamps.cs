using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GroceryListApi.Migrations
{
    /// <inheritdoc />
    public partial class EnsureItemTimestamps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                IF COL_LENGTH('Items','CreatedAt') IS NULL
                    ALTER TABLE [Items] ADD [CreatedAt] DATETIME2 NOT NULL CONSTRAINT DF_Items_CreatedAt DEFAULT(GETDATE());

                IF COL_LENGTH('Items','UpdatedAt') IS NULL
                    ALTER TABLE [Items] ADD [UpdatedAt] DATETIME2 NOT NULL CONSTRAINT DF_Items_UpdatedAt DEFAULT(GETDATE());
                ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                IF COL_LENGTH('Items','CreatedAt') IS NOT NULL
                BEGIN
                    ALTER TABLE [Items] DROP CONSTRAINT DF_Items_CreatedAt;
                    ALTER TABLE [Items] DROP COLUMN [CreatedAt];
                END

                IF COL_LENGTH('Items','UpdatedAt') IS NOT NULL
                BEGIN
                    ALTER TABLE [Items] DROP CONSTRAINT DF_Items_UpdatedAt;
                    ALTER TABLE [Items] DROP COLUMN [UpdatedAt];
                END
                ");

        }
    }
}
