using Microsoft.EntityFrameworkCore;
using RoomMate.Database.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace RoomMate.Database.Seed
{
    public class EnumSeed
    {
        public static void SeedEnumData<TData, TEnum>(DbSet<TData> items)
            where TData : EnumBase<TEnum>
            where TEnum : struct
        {
            var etype = typeof(TEnum);

            if (!etype.IsEnum)
                throw new Exception(string.Format("Type '{0}' must be enum", etype.AssemblyQualifiedName));

            var ntype = Enum.GetUnderlyingType(etype);

            if (ntype == typeof(long) || ntype == typeof(ulong) || ntype == typeof(uint))
                throw new Exception();

            foreach (TEnum evalue in Enum.GetValues(etype))
            {
                var item = Activator.CreateInstance<TData>();

                item.Id = (int)Convert.ChangeType(evalue, typeof(int));

                if (item.Id <= 0)
                    throw new Exception("Enum underlying value must be positive");

                item.Name = Enum.GetName(etype, evalue);

                item.Description = GetEnumDescription(evalue);

                items.Add(item);
            }
        }

        public static string GetEnumDescription<TEnum>(TEnum item)
        {
            Type type = item.GetType();

            var attribute = type.GetField(item.ToString()).GetCustomAttributes(typeof(DescriptionAttribute), false).Cast<DescriptionAttribute>().FirstOrDefault();
            return attribute == null ? string.Empty : attribute.Description;
        }

    }
}
