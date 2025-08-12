using MBA.Marketplace.Business.DTOs.Paginacao;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MBA.Marketplace.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/favoritos")]
    public class FavoritoController : ControllerBase
    {
        private readonly IClienteService _clienteService;
        private readonly IFavoritoService _favoritoService;
        private readonly IProdutoService _produtoService;

        public FavoritoController(IClienteService clienteService, IFavoritoService favoritoService, IProdutoService produtoService)
        {
            _clienteService = clienteService;
            _favoritoService = favoritoService;
            _produtoService = produtoService;
        }

        [HttpGet()]
        [ProducesResponseType(typeof(Favorito), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> ObterFavoritosDoCliente([FromQuery] int numeroDaPagina, int tamanhoDaPagina)
        {
            var emailCliente = ObterEmailDoUsuario();
            var cliente = await _clienteService.ObterPorEmailAsync(emailCliente);

            if (cliente == null)
                return NotFound("Cliente não encontrado");

            var parametros = new PesquisaDeFavoritos() { ClienteId = cliente.Id, NumeroDaPagina = numeroDaPagina, TamanhoDaPagina = tamanhoDaPagina };
            var pesquisaPaginada = await _favoritoService.PesquisarAsync(parametros);
            return Ok(pesquisaPaginada);
        }

        [HttpPost()]
        [ProducesResponseType(typeof(Favorito), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Cadastrar([FromBody] Guid produtoId)
        {
            var emailCliente = ObterEmailDoUsuario();
            var cliente = await _clienteService.ObterPorEmailAsync(emailCliente);

            if (cliente == null)
                return NotFound("Cliente não encontrado.");

            var produto = await _produtoService.ObterProdutoAtivoPorIdAsync(produtoId);

            if (produto == null)
                return NotFound("Produto não encontrado.");

            var favoritoExistente = await _favoritoService.ObterPorProdutoIdEClienteIdAsync(produto.Id, cliente.Id);

            if (favoritoExistente != null)
            {
                return Conflict("Produto já está nos favoritos.");
            }

            var favorito = await _favoritoService.Cadastrar(new Favorito() { ClienteId = cliente.Id, ProdutoId = produto.Id, CreatedAt = DateTime.Now });

            return CreatedAtAction(nameof(Cadastrar), new { favorito = favorito.Id }, favorito);
        }

        [HttpDelete("produtos/{produtoId:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> RemoverPorProdutoId([FromRoute] Guid produtoId)
        {
            var emailCliente = ObterEmailDoUsuario();
            var cliente = await _clienteService.ObterPorEmailAsync(emailCliente);

            if (cliente == null)
                return NotFound("Cliente não encontrado.");

            // Verifica se o produto existe
            var produto = await _produtoService.ObterProdutoAtivoPorIdAsync(produtoId);
            
            if (produto == null)
                return NotFound("Produto não encontrado.");

            // Busca o favorito com base no cliente e produto
            var favorito = await _favoritoService.ObterPorProdutoIdEClienteIdAsync(produto.Id, cliente.Id);
            
            if (favorito == null)
                return NotFound("Produto não está nos favoritos.");

            await _favoritoService.Deletar(favorito);

            return NoContent();
        }


        [HttpGet("produtos/{produtoId:guid}/existe")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ProdutoJaFavoritado([FromRoute] Guid produtoId)
        {
            var emailCliente = ObterEmailDoUsuario();
            var cliente = await _clienteService.ObterPorEmailAsync(emailCliente);

            if (cliente == null)
                return NotFound("Cliente não encontrado.");

            var produto = await _produtoService.ObterProdutoAtivoPorIdAsync(produtoId);

            if (produto == null)
                return NotFound("Produto não encontrado.");

            var favoritoExistente = await _favoritoService.ObterPorProdutoIdEClienteIdAsync(produto.Id, cliente.Id);

            // Retorna true se já estiver nos favoritos, false caso contrário
            return Ok(favoritoExistente != null);
        }

        private string? ObterEmailDoUsuario()
        {
            return User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        }
    }
}