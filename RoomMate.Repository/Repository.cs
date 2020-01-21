using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace RoomMate.Repository
{
    public  class Repository<T> : IRepository<T> //, TKey>
    where T : class
        //, IEntity<TKey> where TKey : IEquatable<TKey>
    {
        private DbSet<T> dbset;
        private bool _isDisposed = false;
        private DbContext _context;

        public Repository(DbContext context)
        {
            this._context = context;
            dbset = this._context.Set<T>();
        }

        public IQueryable<T> GetAll => this.dbset;

        public void AddRange(IEnumerable<T> entities)
        {
            dbset.AddRange(entities);
            this.SaveChanges();
        }
        public  int Delete(int id)
        {
            var item = dbset.Find(id);
            if (item != null)
            {
                dbset.Remove(item);
            }
            return SaveChanges();
        }
        public int Delete(T entity)
        {
            dbset.Attach(entity);
            dbset.Remove(entity);
            return SaveChanges();
        }

        public bool Detach(T entity)
        {
            _context.Entry(entity).State = EntityState.Detached;
            return true;
        }

        public T Find(int id)
        {
            return dbset.Find(id);
        }

        public IEnumerable<T> GetEnumerable(Func<T, bool> predicate)
        {
            IQueryable<T> query = dbset;
            return query.Where(predicate);
        }

        public T GetFirst(Func<T, bool> predicate)
        {
            IQueryable<T> query = dbset;
            return query.FirstOrDefault(predicate);
        }

        public T InsertOrUpdate(T data)
        {
            dbset.Add(data);
            SaveChanges();
            return data;
        }
        public int SaveChanges()
        {
            return this._context.SaveChanges();
        }
        public void Dispose()
        {
            if (_isDisposed)
            {
                return;
            }

            this._context.Dispose();
            _isDisposed = true;
            GC.SuppressFinalize(this);
        }

        public IList<T> GetList(Func<T, bool> predicate = null)
        {
            IQueryable<T> query = dbset;
            return query.Where(predicate).ToList();
        }


        public IList<T> GetListWithInclude(Func<T, bool> predicate, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = dbset;
            return includes.Aggregate(query, (current, include) => current.Include(include)).Where(predicate).ToList();
        }



        public T GetFirstWithInclude(Func<T, bool> predicate, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = dbset;
            return includes.Aggregate(query, (current, include) => current.Include(include)).Where(predicate).FirstOrDefault();

        }

        //public IEnumerable<T> DistinctBy<T, TKey>(this IEnumerable<T> items, Func<T, TKey> property)
        //{
        //    return items.GroupBy(property).Select(x => x.First());
        //}


        //public  IEnumerable<T> DistinctBy<T, TKey>(this IEnumerable<T> items, Func<T, TKey> property,

        //    Func<T, bool> predicate, params Expression<Func<T, object>>[] includes) // stolen from Fetfirst with include
        //{

        //    return items.GroupBy(property).Select(x => x.FirstOrDefault());
        //}

        // nested first or deafult
        public TResult GetFirstOrDefault<TResult>(Expression<Func<T, TResult>> selector,
                                          Expression<Func<T, bool>> predicate = null,
                                          Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
                                          Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
                                          bool disableTracking = true)
        {
            IQueryable<T> query = dbset;
            if (disableTracking)
            {
                query = query.AsNoTracking();
            }

            if (include != null)
            {
                query = include(query);
            }

            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            if (orderBy != null)
            {
                return orderBy(query).Select(selector).FirstOrDefault();
            }
            else
            {
                return query.Select(selector).FirstOrDefault();
            }
        }
    }
}
