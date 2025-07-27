using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Models;
using MBA.Marketplace.Business.Extensions;
using MBA.Marketplace.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace MBA.Marketplace.Data.Repositories
{
    public class VendedorRepository : IVendedorRepository
    {
        private readonly ApplicationDbContext _context;
        public VendedorRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> CriarAsync(Vendedor vendedor)
        {
            _context.Vendedores.Add(vendedor);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Vendedor?> ObterPorUsuarioIdAsync(string usuario)
        {
            return await _context
                .Vendedores
                .Where(v => v.Id == usuario.NormalizeGuid())
                .FirstOrDefaultAsync();
        }
    }
}
