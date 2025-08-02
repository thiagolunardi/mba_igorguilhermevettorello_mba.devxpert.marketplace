using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Business.Services
{
    public class FavoritoService(IFavoritoRepository repository) : IFavoritoService
    {
        public async Task<Favorito?> Buscar(Guid cliente)
        {
            return await repository.ObterPorIdAsync(cliente);
        }
        public async Task<Favorito> Cadastrar(Favorito favorito)
        {
            return await repository.CriarAsync(favorito);
        }
        public async Task Deletar(Favorito favorito)
        {
            await repository.RemoverAsync(favorito);
        }
        public async Task<bool> Atualizar(Favorito favorito)
        {
            return await repository.AtualizarAsync(favorito);
        }
    }
}