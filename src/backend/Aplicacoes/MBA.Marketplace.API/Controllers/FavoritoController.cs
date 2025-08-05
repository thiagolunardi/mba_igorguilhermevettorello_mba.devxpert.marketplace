using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Mvc;

namespace MBA.Marketplace.API.Controllers
{
    [ApiController]
    [Route("api/favoritos")]
    public class FavoritoController(IFavoritoService service) : ControllerBase
    {
        [HttpGet("{cliente:guid}")]
        [ProducesResponseType(typeof(Favorito), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Buscar(Guid cliente)
        {
            var favorito = await service.Buscar(cliente);
            if (favorito == null)
                return NotFound();

            return Ok(favorito);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Favorito), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Cadastrar(Favorito favorito)
        {
            if (favorito == null)
                return BadRequest();

            var retorno = await service.Cadastrar(favorito);

            return CreatedAtAction(nameof(Buscar), new { cliente = retorno.Id }, retorno);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Atualizar(Favorito favorito)
        {
            if (favorito == null)
                return BadRequest();

            var existente = await service.Buscar(favorito.Id);
            if (existente == null)
                return NotFound();

            await service.Atualizar(favorito);
            return Ok(favorito);
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Deletar(Favorito favorito)
        {
            if (favorito == null)
                return BadRequest();

            var existente = await service.Buscar(favorito.Id);
            if (existente == null)
                return NotFound();

            await service.Deletar(favorito);
            return NoContent();
        }
    }
}