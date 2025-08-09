using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Interfaces.Services
{
    public interface IClienteService
    {
        Task<bool> CriarAsync(Cliente cliente);
        Task<Cliente?> ObterPorUsuarioIdAsync(string usuario);
        Task<Cliente?> ObterPorEmailAsync(string? email);
        Task<IEnumerable<Cliente>> ListarAsync();
    }
}
