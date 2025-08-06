using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MBA.Marketplace.Data.Data.Migrations.Application
{
    /// <inheritdoc />
    public partial class Refatoracao_Favoritos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Produto",
                table: "Favoritos",
                newName: "ProdutoId");

            migrationBuilder.RenameColumn(
                name: "Cliente",
                table: "Favoritos",
                newName: "CreatedAt");

            migrationBuilder.AddColumn<Guid>(
                name: "ClienteId",
                table: "Favoritos",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_ClienteId",
                table: "Favoritos",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_ProdutoId",
                table: "Favoritos",
                column: "ProdutoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Favoritos_Clientes_ClienteId",
                table: "Favoritos",
                column: "ClienteId",
                principalTable: "Clientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Favoritos_Produtos_ProdutoId",
                table: "Favoritos",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favoritos_Clientes_ClienteId",
                table: "Favoritos");

            migrationBuilder.DropForeignKey(
                name: "FK_Favoritos_Produtos_ProdutoId",
                table: "Favoritos");

            migrationBuilder.DropIndex(
                name: "IX_Favoritos_ClienteId",
                table: "Favoritos");

            migrationBuilder.DropIndex(
                name: "IX_Favoritos_ProdutoId",
                table: "Favoritos");

            migrationBuilder.DropColumn(
                name: "ClienteId",
                table: "Favoritos");

            migrationBuilder.RenameColumn(
                name: "ProdutoId",
                table: "Favoritos",
                newName: "Produto");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Favoritos",
                newName: "Cliente");
        }
    }
}
