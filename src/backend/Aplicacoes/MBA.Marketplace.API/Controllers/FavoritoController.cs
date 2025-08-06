using MBA.Marketplace.Business.DTOs.Paginacao;
using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MBA.Marketplace.API.Controllers
{
    [ApiController]
    [Route("api/favoritos")]
    public class FavoritoController : ControllerBase
    {
        private readonly IClienteRepository _clienteRepository;
        private readonly IFavoritoService _favoritoService;

        public FavoritoController(IClienteRepository clienteRepository, IFavoritoService favoritoService)
        {
            _clienteRepository = clienteRepository;
            _favoritoService = favoritoService;
        }

        [HttpGet("cliente/{clienteId:guid}")]
        [ProducesResponseType(typeof(Favorito), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Cadastrar(Favorito favorito)
        {
            if (favorito == null)
                return BadRequest();

            var retorno = await _favoritoService.Cadastrar(favorito);

            return CreatedAtAction(nameof(Cadastrar), new { cliente = retorno.Id }, retorno);
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