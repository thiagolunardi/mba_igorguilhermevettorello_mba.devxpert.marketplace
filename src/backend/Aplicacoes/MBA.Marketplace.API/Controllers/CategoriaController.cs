using MBA.Marketplace.API.Controllers.Base;
using MBA.Marketplace.API.Extensions;
using MBA.Marketplace.Business.DTOs;
using MBA.Marketplace.Business.Enums;
using MBA.Marketplace.Business.Extensions;
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

        [HttpPost]
        [ProducesResponseType(typeof(Categoria), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> Criar(CategoriaDto dto)
        {
            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            var categoria = await _categoriaService.CriarAsync(dto);
            
            if (OperacaoValida())
                return CreatedAtAction(null, new { id = categoria.Id }, categoria);
            
            return CustomResponse();
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

        [HttpPut("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> Atualizar(Guid id, CategoriaDto dto)
        {
            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            var sucesso = await _categoriaService.AtualizarAsync(id, dto);
            
            if (OperacaoValida())
            {
                if (!sucesso)
                    return NotFound();
                return NoContent();
            }
            
            return CustomResponse();
        }

        [HttpDelete("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> Remover(Guid id)
        {
            var status = await _categoriaService.RemoverAsync(id);
            
            if (OperacaoValida())
            {
                if (status == StatusRemocaoEnum.NaoEncontrado)
                    return NotFound();

                if (status == StatusRemocaoEnum.VinculacaoProduto)
                {
                    var mensagem = status.GetDescription();
                    return Conflict(new { mensagem });
                }

                return NoContent();
            }
            
            return CustomResponse();
        }
    }
}
