using MBA.Marketplace.Business.Extensions;
using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Models;
using MBA.Marketplace.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace MBA.Marketplace.Data.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly ApplicationDbContext _context;

        public async Task<bool> CriarAsync(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Cliente>> ListarAsync()
        {
            return await _context.Clientes.AsNoTracking().ToListAsync();
        }

        public async Task<Cliente?> ObterPorUsuarioIdAsync(string usuario)
        {
            return await _context.Clientes
                                 .Where(v => v.Id == usuario.NormalizeGuid())
                                 .FirstOrDefaultAsync();
        }
    }
}
