using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Services
{
    public class ClienteService : IClienteService
    {
        readonly IClienteRepository _clienteRepository;

        public ClienteService(IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }

        public async Task<bool> CriarAsync(Cliente cliente)
        {
            return await _clienteRepository.CriarAsync(cliente);
        }

        public async Task<Cliente?> ObterPorUsuarioIdAsync(string usuario)
        {
            return await _clienteRepository.ObterPorUsuarioIdAsync(usuario);
        }

        public async Task<Cliente?> ObterPorEmailAsync(string? email)
        {
            return await _clienteRepository.ObterPorEmailAsync(email);
        }

        public async Task<IEnumerable<Cliente>> ListarAsync()
        {
            return await _clienteRepository.ListarAsync();
        }
    }
}
