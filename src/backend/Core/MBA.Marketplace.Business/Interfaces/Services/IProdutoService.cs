using MBA.Marketplace.Business.DTOs;
using MBA.Marketplace.Business.DTOs.Paginacao;
using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Http;

namespace MBA.Marketplace.Business.Interfaces.Services
{
    public interface IProdutoService
    {
        Task<IEnumerable<Produto>> ListarAllAsync();
        Task<IEnumerable<Produto>> ObterItensEmDestaque(string? ordenarPor, int? limit);
        Task<IEnumerable<Produto>> ListarProdutosPorCategoriaAsync(Guid categoriaId);
        Task<IEnumerable<Produto>> ListarProdutosPorCategoriaOuNomeDescricaoAsync(Guid? categoriaId, string? descricao);
        Task<ListaPaginada<Produto>> PesquisarAsync(PesquisaDeProdutos parametros);
        Task<IEnumerable<Produto>> ListarAsync(Vendedor vendedor);
        Task<Produto> CriarAsync(ProdutoDto dto, Vendedor vendedor);
        Task<Produto> ObterPorIdAsync(Guid id, Vendedor vendedor);
        Task<Produto> ObterPorIdAsync(Guid id);
        Task<Produto?> ObterProdutoAtivoPorIdAsync(Guid id);
        Task<bool> AtualizarAsync(Guid id, ProdutoEditDto dto, Vendedor vendedor);
        Task<bool> RemoverAsync(Guid id, Vendedor vendedor);
        Task<Produto> ChangeState(Guid id);
        Task<bool> ChangeStatePorVendedor(Vendedor vendedor);
    }
}
