using MBA.Marketplace.Business.DTOs.Paginacao;
using MBA.Marketplace.Business.Interfaces.Repositories;
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
        private readonly IClienteRepository _clienteRepository;
        private readonly IFavoritoService _favoritoService;
        private readonly IProdutoService _produtoService;

        public FavoritoController(IClienteRepository clienteRepository, IFavoritoService favoritoService, IProdutoService produtoService)
        {
            _clienteRepository = clienteRepository;
            _favoritoService = favoritoService;
            _produtoService = produtoService;
        }

        [HttpGet("cliente/{clienteId:guid}")]
        [ProducesResponseType(typeof(Favorito), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> ObterFavoritosDoCliente([FromRoute] Guid clienteId, [FromQuery] PesquisaDeFavoritos parametros)
        {
            var cliente = await _clienteRepository.ObterPorUsuarioIdAsync(clienteId.ToString());

            if (cliente == null)
                return NotFound("Cliente não encontrado");

            if (!ValidarSeUsuarioPodeVerDadosDoCliente(cliente))
                return Unauthorized("Você não tem permissão para acessar os favoritos deste cliente.");

            var pesquisaPaginada = await _favoritoService.PesquisarAsync(parametros);

            if (pesquisaPaginada == null)
                return NoContent();

            return Ok(pesquisaPaginada);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Favorito), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Cadastrar(Guid produtoId)
        {
            var emailCliente = ObterEmailDoUsuario();
            var cliente = await _clienteRepository.ObterPorEmailAsync(emailCliente);

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

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Deletar(Favorito favorito)
        {
            if (favorito == null)
                return BadRequest();

            var existente = await _favoritoService.Buscar(favorito.Id);
            if (existente == null)
                return NotFound();

            await _favoritoService.Deletar(favorito);
            return NoContent();
        }

        private bool ValidarSeUsuarioPodeVerDadosDoCliente(Cliente cliente)
        {
            return String.Equals(cliente.Email, ObterEmailDoUsuario(), StringComparison.InvariantCultureIgnoreCase);
        }

        private string? ObterEmailDoUsuario()
        {
            return User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        }
    }
}