using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokemonGP.Models
{
    public class UserLogin
    {
        public int id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
    }

    public class MyTeam
    {
        public int id { get; set; }
        public int level { get; set; }
        public int experience { get; set; }
        public int userid { get; set; }
        public int teampos { get; set; }

    }

    public class UserDB
    {
        public static bool AddUser(UserLogin user)
        {
            using (PokemonContext ctx = new PokemonContext())
            {
                ctx.UserStorage.Add(user);
                ctx.SaveChanges();
            }
            return true;
        }

        public static bool DeleteUser(int userid)
        {
            using (PokemonContext ctx = new PokemonContext())
            {
                UserLogin theUser = new UserLogin();
                theUser.id = userid;
                ctx.Remove(theUser);
                ctx.SaveChanges();
                return true;
            }
        }
    }

    public class PokemonContext : DbContext
    {
        public DbSet<UserLogin> UserStorage { get; set; }
        public DbSet<MyTeam> MyTeamStorage { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=pokemonuserlogin;Integrated Security=SSPI;");
            // Or For username/password, use the following:
            // optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=efconsole1;User Id=sa;Password=abc123;");
        }
    }
}
