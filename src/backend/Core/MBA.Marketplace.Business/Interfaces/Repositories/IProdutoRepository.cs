using MBA.Marketplace.Business.DTOs.Paginacao;
using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Interfaces.Repositories
{
    public interface IProdutoRepository
    {
        Task<IEnumerable<Produto>> ListarProdutosFiltroAsync(string? ordenarPor, int? limit);
        Task<IEnumerable<Produto>> ListarPorCategoriaIdAsync(Guid categoriaId, bool include);
        Task<IEnumerable<Produto>> ListarProdutosPorCategoriaOuNomeDescricaoAsync(Guid? categoriaId, string descricao);
        Task<ListaPaginada<Produto>> PesquisarAsync(PesquisaDeProdutos parametros);
        Task<IEnumerable<Produto>> ListarPorVendedorIdAsync(Vendedor vendedor);
        Task<IEnumerable<Produto>> ListarAsync();
        Task<Produto> CriarAsync(Produto produto);
        Task<Produto> ObterPorIdPorVendedorIdAsync(Guid id, Vendedor vendedor);
        Task<Produto> ObterPorIdAsync(Guid id);
        Task<bool> AtualizarAsync(Produto produto);
        Task<bool> RemoverAsync(Produto produto);
    }
}
