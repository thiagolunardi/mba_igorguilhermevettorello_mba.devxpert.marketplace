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
        [ProducesResponseType(typeof(IEnumerable<Favorito>), StatusCodes.Status200OK)]
        public async Task<Favorito> Buscar(Guid cliente)
        {
            return await service.Buscar(cliente);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<Favorito> Cadastrar(Favorito favoritos)
        {
            return await service.Cadastrar(favoritos);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<bool> Atualizar(Favorito favoritos)
        {
            return await service.Atualizar(favoritos);
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task Deletar(Favorito favoritos)
        {
            await service.Deletar(favoritos);
        }
    }
}