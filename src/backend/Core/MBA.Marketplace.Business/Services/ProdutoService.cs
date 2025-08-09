using MBA.Marketplace.Business.DTOs;
using MBA.Marketplace.Business.DTOs.Paginacao;
using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace MBA.Marketplace.Business.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly IProdutoRepository _produtoRepository;
        private readonly IConfiguration _config;

        public ProdutoService(IProdutoRepository produtoRepository, IConfiguration config)
        {
            _produtoRepository = produtoRepository;
            _config = config;
        }

        public async Task<IEnumerable<Produto>> ListarAllAsync()
        {
            var produtos = await _produtoRepository.ListarAsync();

            return produtos;
        }

        public async Task<IEnumerable<Produto>> ListarProdutosPorCategoriaAsync(Guid categoriaId)
        {
            var produtos = await _produtoRepository.ListarPorCategoriaIdAsync(categoriaId, true);

            return produtos;
        }

        public async Task<IEnumerable<Produto>> ListarProdutosPorCategoriaOuNomeDescricaoAsync(Guid? categoriaId, string descricao)
        {
            var produtos = await _produtoRepository.ListarProdutosPorCategoriaOuNomeDescricaoAsync(categoriaId, descricao);

            return produtos;
        }

        public async Task<ListaPaginada<Produto>> PesquisarAsync(PesquisaDeProdutos parametros)
        {
            var produtos = await _produtoRepository.PesquisarAsync(parametros);

            return produtos;
        }

        public async Task<IEnumerable<Produto>> ListarAsync(Vendedor vendedor)
        {
            var produtos = await _produtoRepository.ListarPorVendedorIdAsync(vendedor);

            return produtos;
        }

        public async Task<Produto> CriarAsync(ProdutoDto dto, Vendedor vendedor)
        {
            var produto = await _produtoRepository.CriarAsync(new Produto
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                Preco = dto.Preco.GetValueOrDefault(0),
                Estoque = dto.Estoque.GetValueOrDefault(0),
                CategoriaId = dto.CategoriaId.GetValueOrDefault(),
                VendedorId = vendedor.Id,
                Imagem = dto.ImageFileName,
                Ativo = true
            });

            return produto;
        }

        public async Task<Produto> ObterPorIdAsync(Guid id, Vendedor vendedor)
        {
            var produto = await _produtoRepository.ObterPorIdPorVendedorIdAsync(id, vendedor);

            if (produto != null)
                produto.Src = produto.Imagem;

            return produto;
        }

        public async Task<Produto> ObterPorIdAsync(Guid id)
        {
            var produto = await _produtoRepository.ObterPorIdAsync(id);
            
            return produto;
        }

        public async Task<Produto?> ObterProdutoAtivoPorIdAsync(Guid id)
        {
            var produto = await _produtoRepository.ObterProdutoAtivoPorIdAsync(id);

            return produto;
        }

        public async Task<bool> AtualizarAsync(Guid id, ProdutoEditDto dto, Vendedor vendedor)
        {
            var produto = await _produtoRepository.ObterPorIdPorVendedorIdAsync(id, vendedor);
            if (produto == null)
                return false;

            produto.Nome = dto.Nome;
            produto.Descricao = dto.Descricao;
            produto.Preco = dto.Preco.GetValueOrDefault(0);
            produto.Estoque = dto.Estoque.GetValueOrDefault(0);
            produto.CategoriaId = dto.CategoriaId.GetValueOrDefault();
            produto.VendedorId = vendedor.Id;
            produto.UpdatedAt = DateTime.Now;
            produto.Imagem = dto.ImageFileName;

            return await _produtoRepository.AtualizarAsync(produto);
        }

        public async Task<bool> RemoverAsync(Guid id, Vendedor vendedor)
        {
            var produto = await _produtoRepository.ObterPorIdPorVendedorIdAsync(id, vendedor);
            if (produto == null)
                return false;

            return await _produtoRepository.RemoverAsync(produto);
        }

        public async Task<IEnumerable<Produto>> ObterItensEmDestaque(string? ordenarPor, int? limit)
        {
            var produtos = await _produtoRepository.ObterItensEmDestaque(ordenarPor, limit);

            return produtos;
        }

        public async Task<Produto> ChangeState(Guid id)
        {
            var produto = await _produtoRepository.ObterPorIdAsync(id);
            if (produto == null)
                return null;

            produto.Ativo = !produto.Ativo;
            await _produtoRepository.AtualizarAsync(produto);

            return produto;
        }

        public async Task<bool> ChangeStatePorVendedor(Vendedor vendedor)
        {
            var produtos = await _produtoRepository.ListarPorVendedorIdAsync(vendedor);

            if (produtos == null || !produtos.Any())
                return true;

            foreach (var produto in produtos)
            {
                produto.Ativo = vendedor.Ativo;
            }

            await _produtoRepository.AtualizarAsync(produtos);

            return true;
        }
    }
}
