using MBA.Marketplace.Business.Models.Base;
using System.Linq.Expressions;

namespace MBA.Marketplace.Business.Interfaces.Repositories.Base
{
    public interface IRepository<TEntity> : IDisposable where TEntity : class
    {
        Task<TEntity> AdicionarAsync(TEntity entity);
        Task<TEntity> ObterPorIdAsync(Guid? id, bool tracker);
        Task<List<TEntity>> ListarAsync();
        Task<TEntity> AtualizarAsync(TEntity entity);
        Task RemoverAsync(Guid id);
        Task<IEnumerable<TEntity>> BuscarAsync(Expression<Func<TEntity, bool>> predicate);
        Task<int> SaveChanges();
    }
}
