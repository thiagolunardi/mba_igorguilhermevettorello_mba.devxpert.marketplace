using MBA.Marketplace.Business.Interfaces.Repositories.Base;
using MBA.Marketplace.Business.Models.Base;
using MBA.Marketplace.Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MBA.Marketplace.Data.Repositories.Base
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity, new()
    {
        protected readonly ApplicationDbContext Db;
        protected readonly DbSet<TEntity> DbSet;

        protected Repository(ApplicationDbContext db)
        {
            Db = db;
            DbSet = db.Set<TEntity>();
        }

        public async Task<IEnumerable<TEntity>> BuscarAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await DbSet.AsNoTracking().Where(predicate).ToListAsync();
        }

        public virtual async Task<TEntity> ObterPorIdAsync(Guid? id, bool tracker = true)
        {
            if (tracker)
                return await DbSet.FindAsync(id);
            else
                return await DbSet.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        }

        public virtual async Task<List<TEntity>> ListarAsync()
        {
            return await DbSet.ToListAsync();
        }

        public virtual async Task<TEntity> AdicionarAsync(TEntity entity)
        {
            DbSet.Add(entity);
            await SaveChanges();
            return entity;
        }

        public virtual async Task<TEntity> AtualizarAsync(TEntity entity)
        {
            DbSet.Update(entity);
            await SaveChanges();
            return entity;
        }

        public virtual async Task RemoverAsync(Guid id)
        {
            DbSet.Remove(new TEntity { Id = id });
            await SaveChanges();
        }

        public async Task<int> SaveChanges()
        {
            return await Db.SaveChangesAsync();
        }

        public void Dispose()
        {
            Db?.Dispose();
        }
    }
}
