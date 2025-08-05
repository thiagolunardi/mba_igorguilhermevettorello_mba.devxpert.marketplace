using MBA.Marketplace.Business.DTOs;
using MBA.Marketplace.Business.DTOs.Paginacao;
using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;

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
            return await _produtoRepository.ListarAsync();
        }
        public async Task<IEnumerable<Produto>> ListarProdutosPorCategoriaAsync(Guid categoriaId)
        {
            return await _produtoRepository.ListarPorCategoriaIdAsync(categoriaId, true);
        }
        public async Task<IEnumerable<Produto>> ListarProdutosPorCategoriaOuNomeDescricaoAsync(Guid? categoriaId, string descricao)
        {
            return await _produtoRepository.ListarProdutosPorCategoriaOuNomeDescricaoAsync(categoriaId, descricao);
        }
        public async Task<ListaPaginada<Produto>> PesquisarAsync(PesquisaDeProdutos parametros)
        {
            var produtos = await _produtoRepository.PesquisarAsync(parametros);

            foreach (var produto in produtos.Itens)
            {
                produto.Src = ConverterImagemEmBase64(produto);
            }

            return produtos;
        }
        private string? ConverterImagemEmBase64(Produto produto)
        {
            var caminhoImagemBase = @$"{Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, _config["SharedFiles:ImagensPath"])}";
            var caminhoImagemCompleto = Path.Combine(caminhoImagemBase, produto.Imagem);

            if (!File.Exists(caminhoImagemCompleto))
            {
                return null;
            }

            var bytesImagem = System.IO.File.ReadAllBytes(caminhoImagemCompleto);
            var base64 = Convert.ToBase64String(bytesImagem);
            var mimeType = ObterMimeType(Path.GetExtension(caminhoImagemCompleto));

            return $"data:{mimeType};base64,{base64}";
        }
        private string ObterMimeType(string extensao)
        {
            return extensao switch
            {
                ".jpg" => "image/jpeg",
                ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                _ => throw new NotSupportedException("Tipo de imagem não suportado.")
            };
        }
        public async Task<IEnumerable<Produto>> ListarAsync(Vendedor vendedor)
        {
            return await _produtoRepository.ListarPorVendedorIdAsync(vendedor);
        }
        public async Task<Produto> CriarAsync(ProdutoDto dto, Vendedor vendedor)
        {
            string nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(dto.Imagem.FileName);
            var pasta = _config["SharedFiles:ImagensPath"];
            string caminhoPasta = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, pasta);

            if (!Directory.Exists(caminhoPasta))
                Directory.CreateDirectory(caminhoPasta);

            string caminhoArquivo = Path.Combine(caminhoPasta, nomeArquivo);

            using (var stream = new FileStream(caminhoArquivo, FileMode.Create))
            {
                await dto.Imagem.CopyToAsync(stream);
            }

            var produto = await _produtoRepository.CriarAsync(new Produto
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                Preco = (decimal)dto.Preco,
                Estoque = (int)dto.Estoque,
                CategoriaId = (Guid)dto.CategoriaId,
                VendedorId = vendedor.Id,
                Imagem = nomeArquivo
            });

            return produto;
        }
        public async Task<Produto> ObterPorIdAsync(Guid id, Vendedor vendedor)
        {
            return await _produtoRepository.ObterPorIdPorVendedorIdAsync(id, vendedor);
        }
        public async Task<Produto> ObterPorIdAsync(Guid id)
        {
            return await _produtoRepository.ObterPorIdAsync(id);
        }
        public async Task<bool> AtualizarAsync(Guid id, ProdutoEditDto dto, Vendedor vendedor, IFormFile? imagem)
        {
            var produto = await _produtoRepository.ObterPorIdPorVendedorIdAsync(id, vendedor);
            if (produto == null)
                return false;

            if (imagem != null)
            {
                string nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(imagem.FileName);
                var pasta = _config["SharedFiles:ImagensPath"];
                string caminhoPasta = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, pasta);

                if (!Directory.Exists(caminhoPasta))
                    Directory.CreateDirectory(caminhoPasta);

                string caminhoArquivo = Path.Combine(caminhoPasta, nomeArquivo);

                using (var stream = new FileStream(caminhoArquivo, FileMode.Create))
                {
                    await imagem.CopyToAsync(stream);
                }

                produto.Imagem = nomeArquivo;
            }

            produto.Nome = dto.Nome;
            produto.Descricao = dto.Descricao;
            produto.Preco = (decimal)dto.Preco;
            produto.Estoque = (int)dto.Estoque;
            produto.CategoriaId = (Guid)dto.CategoriaId;
            produto.VendedorId = vendedor.Id;
            produto.UpdatedAt = DateTime.Now;
            return await _produtoRepository.AtualizarAsync(produto);
        }
        public async Task<bool> RemoverAsync(Guid id, Vendedor vendedor)
        {
            var produto = await _produtoRepository.ObterPorIdPorVendedorIdAsync(id, vendedor);
            if (produto == null)
                return false;

            return await _produtoRepository.RemoverAsync(produto);
        }
   
        public async Task<IEnumerable<Produto>> ListarProdutosFiltroAsync(string? ordenarPor, int? limit)
        {
            var produtos = await _produtoRepository.ListarProdutosFiltroAsync(ordenarPor, limit);

            foreach (var produto in produtos)
            {
                produto.Src = ConverterImagemEmBase64(produto);
            }

            return produtos;
        }

    }
}
