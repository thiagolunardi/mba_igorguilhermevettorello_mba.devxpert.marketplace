using MBA.Marketplace.Business.DTOs.Paginacao;
using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Models;
using MBA.Marketplace.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace MBA.Marketplace.Data.Repositories
{
    public class FavoritoRepository : IFavoritoRepository
    {
        private readonly ApplicationDbContext _context;
        public FavoritoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ListaPaginada<Favorito>> PesquisarAsync(PesquisaDeFavoritos parametros)
        {
            var query = _context.Favoritos
                .Include(f => f.Produto)
                    .ThenInclude(p => p.Categoria)
                .Include(f => f.Cliente)
                .Where(f => f.ClienteId == parametros.ClienteId && f.Produto.Ativo == true)
                .OrderBy(f => f.CreatedAt)
                .AsNoTracking()
                .AsQueryable();

            return await ListaPaginada<Favorito>.ListarAsync(query, parametros.NumeroDaPagina, parametros.TamanhoDaPagina);
        }

        public async Task<IEnumerable<Favorito>> ListarAsync()
        {
            return await _context.Favoritos.ToListAsync();
        }

        public async Task<Favorito> CriarAsync(Favorito favorito)
        {
            _context.Favoritos.Add(favorito);
            await _context.SaveChangesAsync();
            return favorito;
        }

        public async Task<Favorito?> ObterPorIdAsync(Guid? id)
        {
            return await _context.Favoritos.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Favorito?> ObterPorProdutoIdEClienteIdAsync(Guid? produtoId, Guid? clienteId)
        {
            return await _context.Favoritos.FirstOrDefaultAsync(f => f.ProdutoId == produtoId && f.ClienteId == clienteId);
        }

        public async Task<bool> AtualizarAsync(Favorito favorito)
        {
            _context.Favoritos.Update(favorito);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task RemoverAsync(Favorito favorito)
        {
            _context.Favoritos.Remove(favorito);
            await _context.SaveChangesAsync();
        }
    }
}