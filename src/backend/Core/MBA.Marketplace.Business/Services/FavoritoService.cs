using MBA.Marketplace.Business.DTOs.Paginacao;
using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using System.Linq;

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

        public async Task<ListaPaginada<Favorito>> PesquisarAsync(PesquisaDeFavoritos parametros)
        {
            var favoritos = await repository.PesquisarAsync(parametros);
            var produtos = favoritos.Itens.Select(f => f.Produto);

            foreach (var produto in produtos)
            {
                produto.Src = produto.Imagem;
            }

            return favoritos;
        }

        public async Task<Favorito?> ObterPorProdutoIdEClienteIdAsync(Guid? produtoId, Guid? clienteId)
        {
            return await repository.ObterPorProdutoIdEClienteIdAsync(produtoId, clienteId);
        }
    }
}