using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Interfaces.Repositories
{
    public interface IFavoritoRepository
    {
        Task<IEnumerable<Favorito>> ListarAsync();
        Task<Favorito> CriarAsync(Favorito favorito);
        Task<Favorito?> ObterPorIdAsync(Guid? id);
        Task<bool> AtualizarAsync(Favorito favorito);
        Task RemoverAsync(Favorito favorito);
    }
}