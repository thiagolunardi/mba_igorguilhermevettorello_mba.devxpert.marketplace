using MBA.Marketplace.Business.DTOs;
using MBA.Marketplace.Business.Enums;
using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Interfaces.Services
{
    public interface ICategoriaService
    {
        Task<IEnumerable<Categoria>> ListarAsync();
        Task<Categoria> CriarAsync(CategoriaDto dto);
        Task<Categoria> ObterPorIdAsync(Guid id);
        Task<bool> AtualizarAsync(Guid id, CategoriaDto dto);
        Task<StatusRemocaoEnum> RemoverAsync(Guid id);
    }
}
