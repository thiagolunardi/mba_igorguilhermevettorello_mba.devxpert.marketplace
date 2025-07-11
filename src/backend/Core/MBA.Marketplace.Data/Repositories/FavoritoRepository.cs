using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Models;
using MBA.Marketplace.Data.Context;
using MBA.Marketplace.Data.Repositories.Base;
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
            return await _context.Favoritos.FindAsync(id);
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


