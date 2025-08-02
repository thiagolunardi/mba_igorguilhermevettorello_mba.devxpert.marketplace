using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Interfaces.Repositories
{
    public interface IClienteRepository
    {
        Task<bool> CriarAsync(Cliente cliente);

        Task<Cliente?> ObterPorUsuarioIdAsync(string usuario); 

        Task<IEnumerable<Cliente>> ListarAsync();
    }
}
