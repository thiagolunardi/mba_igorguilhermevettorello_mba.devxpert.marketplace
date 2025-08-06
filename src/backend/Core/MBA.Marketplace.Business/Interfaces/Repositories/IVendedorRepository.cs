using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Interfaces.Repositories
{
    public interface IVendedorRepository
    {
        Task<bool> CriarAsync(Vendedor vendedor);
        Task<Vendedor?> ObterPorUsuarioIdAsync(string usuario);
        Task<Vendedor?> ObterVendedorAtivoPorUsuarioIdAsync(string usuario);
        Task<IEnumerable<Vendedor>> ListarAsync();

    }
}
