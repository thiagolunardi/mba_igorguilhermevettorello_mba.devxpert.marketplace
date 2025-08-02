using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Services
{
    public class VendedorService : IVendedorService
    {
        private readonly IVendedorRepository _vendedorRepository;

        public VendedorService(IVendedorRepository vendedorRepository)
        {
            _vendedorRepository = vendedorRepository;
        }

        public Task<IEnumerable<Vendedor>> ListarAsync()
        {
            return _vendedorRepository.ListarAsync();
        }

        public async Task<Vendedor?> ObterPorIdAsync(string id)
        {
            return await _vendedorRepository.ObterPorUsuarioIdAsync(id);

        }
    }
}
