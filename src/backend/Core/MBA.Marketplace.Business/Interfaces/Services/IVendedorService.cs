using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Interfaces.Services
{
    public interface IVendedorService
    {
        Task<Vendedor> ObterPorIdAsync(string id);
    }
}
