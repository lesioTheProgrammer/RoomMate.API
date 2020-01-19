using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace RoomMate.Repository
{
    public interface IRepository<T>
    {
        IQueryable<T> GetAll { get; }
        IEnumerable<T> GetEnumerable(Func<T, bool> predicate);
        T GetFirst(Func<T, bool> predicate);
        IList<T> GetList(Func<T, bool> predicate = null);
        IList<T> GetListWithInclude(Func<T, bool> predicate, params Expression<Func<T, object>>[] includes);

        T GetFirstWithInclude(Func<T, bool> predicate, params Expression<Func<T, object>>[] includes);
        T Find(int id);
        T InsertOrUpdate(T data);

        int Delete(T entity);
        int Delete(int id);
        void AddRange(IEnumerable<T> entities);
        int SaveChanges();
        bool Detach(T entity);
        TResult GetFirstOrDefault<TResult>(Expression<Func<T, TResult>> selector,
                                          Expression<Func<T, bool>> predicate = null,
                                          Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
                                          Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
                                          bool disableTracking = true);
    }
}
