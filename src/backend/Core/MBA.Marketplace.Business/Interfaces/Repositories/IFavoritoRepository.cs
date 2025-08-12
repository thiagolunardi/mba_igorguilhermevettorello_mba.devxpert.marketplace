using MBA.Marketplace.Business.DTOs.Paginacao;
using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Interfaces.Repositories
{
    public interface IFavoritoRepository
    {
        Task<IEnumerable<Favorito>> ListarAsync();
        Task<Favorito> CriarAsync(Favorito favorito);
        Task<Favorito?> ObterPorIdAsync(Guid? id);
        Task<Favorito?> ObterPorProdutoIdEClienteIdAsync(Guid? produtoId, Guid? clienteId);
        Task<bool> AtualizarAsync(Favorito favorito);
        Task RemoverAsync(Favorito favorito);
        Task<ListaPaginada<Favorito>> PesquisarAsync(PesquisaDeFavoritos parametros);
    }
}