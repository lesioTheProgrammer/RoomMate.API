using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace RoomMate.Repository
{
    public class Repository<T> : IRepository<T> where T : class
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
        public int Delete(int id)
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
            //foreach (var property in includes)
            //{
            //    dbset.Include(property);
            //}
            //return dbset.Where(predicate).ToList();

            IQueryable<T> query = dbset;

            return includes.Aggregate(query, (current, include) => current.Include(include)).Where(predicate).ToList();
        }
    }
}
