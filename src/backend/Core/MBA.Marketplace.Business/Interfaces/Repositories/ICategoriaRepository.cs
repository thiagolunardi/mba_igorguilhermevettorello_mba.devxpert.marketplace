using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Interfaces.Repositories
{
    public interface ICategoriaRepository
    {
        Task<IEnumerable<Categoria>> ListarAsync();
        Task<Categoria> CriarAsync(Categoria categoria);
        Task<Categoria?> ObterPorIdAsync(Guid? id);
        Task<bool> AtualizarAsync(Categoria categoria);
        Task RemoverAsync(Categoria categoria);
    }
}
