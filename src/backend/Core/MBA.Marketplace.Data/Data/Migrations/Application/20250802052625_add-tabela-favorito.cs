using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MBA.Marketplace.Data.Data.Migrations.Application
{
    /// <inheritdoc />
    public partial class addtabelafavorito : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Favoritos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Produto = table.Column<Guid>(type: "TEXT", nullable: false),
                    Cliente = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favoritos", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Favoritos");
        }
    }
}
