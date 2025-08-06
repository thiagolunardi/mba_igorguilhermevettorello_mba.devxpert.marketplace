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

        public async Task<Vendedor> ChangeState(Guid id)
        {
            var vendedor = await _vendedorRepository.ObterPorUsuarioIdAsync(id.ToString());
            if (vendedor == null)
                return null;

            vendedor.Ativo = !vendedor.Ativo;
            await _vendedorRepository.AtualizarAsync(vendedor);
            
            return vendedor;
        }

        public Task<IEnumerable<Vendedor>> ListarAsync()
        {
            return _vendedorRepository.ListarAsync();
        }

        public async Task<Vendedor?> ObterPorIdAsync(string id)
        {
            return await _vendedorRepository.ObterPorUsuarioIdAsync(id);

        }

        public async Task<Vendedor?> ObterVendedorAtivoPorIdAsync(string id)
        {
            return await _vendedorRepository.ObterVendedorAtivoPorUsuarioIdAsync(id);

        }
    }
}
