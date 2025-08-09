using MBA.Marketplace.API.Controllers.Base;
using MBA.Marketplace.Business.Interfaces.Identity;
using MBA.Marketplace.Business.Interfaces.Notifications;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBA.Marketplace.API.Controllers
{
    [ApiController]
    [Route("api/categorias")]
    public class CategoriaController : MainController
    {
        private readonly ICategoriaService _categoriaService;

        public CategoriaController(
            ICategoriaService categoriaService,
            INotificador notificador,
            IUser appUser) : base(notificador, appUser)
        {
            _categoriaService = categoriaService;
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<Categoria>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Listar()
        {
            var categorias = await _categoriaService.ListarAsync();
            return Ok(categorias);
        }

        [HttpGet("{id:guid}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(Categoria), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ObterPorId(Guid id)
        {
            var categoria = await _categoriaService.ObterPorIdAsync(id);
            if (categoria == null) return NotFound();
            return Ok(categoria);
        }
    }
}
