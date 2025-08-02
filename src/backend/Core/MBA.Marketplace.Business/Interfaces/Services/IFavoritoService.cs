using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Interfaces.Services
{
    public interface IFavoritoService
    {
        Task<Favorito?> Buscar(Guid cliente);
        Task<Favorito> Cadastrar(Favorito favorito);
        Task Deletar(Favorito favorito);
        Task<bool> Atualizar(Favorito favorito);
    }
}