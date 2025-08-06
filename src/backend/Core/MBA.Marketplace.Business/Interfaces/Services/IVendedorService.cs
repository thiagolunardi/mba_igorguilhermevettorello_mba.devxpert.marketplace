using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Interfaces.Services
{
    public interface IVendedorService
    {
        Task<Vendedor> ObterPorIdAsync(string id);
        Task<Vendedor?> ObterVendedorAtivoPorIdAsync(string id);
        Task<IEnumerable<Vendedor>> ListarAsync();

    }
}
