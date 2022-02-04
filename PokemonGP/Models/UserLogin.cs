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

    public class PokemonMembers
    {
        public int id { get; set; }
        public int level { get; set; }
        public int experience { get; set; }
        public int userid { get; set; }
        public int teampos { get; set; }

    }
    public class SubPokemon
    {
        public int height { get; set; }
        public int weight { get; set; }
        public int id { get; set; }
        public string name { get; set; }
        public int base_experience { get; set; }
        public int order { get; set; }
    }
    public class Subspecies
    {
        public int id { get; set; }
        public string name { get; set; }
        public string url { get; set; }
    }
    public class Subsprites
    {
        public int id { get; set; }
        public string back_default { get; set; }
        public string front_default { get; set; }
    }
    public class PokemonStat
    {
        public int id { get; set; }
        public string statname { get; set; }
        public int basestat { get; set; }
    }
    public class PokemonType
    {
        public int id { get; set; }
        public string pokemontype { get; set; }
    }

    public class UserDB
    {
        public static UserLogin AddUser(UserLogin user)
        {
            using (PokemonContext ctx = new PokemonContext())
            {
                ctx.UserStorage.Add(user);
                ctx.SaveChanges();
            }
            return user;
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

        public static List<PokemonMembers> listMembers(int userID)
        {
            List<PokemonMembers> result = null;
            using (PokemonContext ctx = new PokemonContext())
            {
                result = ctx.MemberStorage.Where(s => s.userid == userID).ToList();
            }
            return result;
        }
        public static List<PokemonMembers> listTeam(int userID)
        {
            List<PokemonMembers> result = null;
            using (PokemonContext ctx = new PokemonContext())
            {
                result = ctx.MemberStorage.Where(s => s.userid == userID && s.teampos > 0).ToList();
            }
            return result;
        }

        public static PokemonMembers addPokemon(PokemonMembers member)
        {
            using (PokemonContext ctx = new PokemonContext())
            {
                ctx.MemberStorage.Add(member);
                ctx.SaveChanges();
            }
            return member;
        }

        public static bool deletePokemon(int id)
        {
            using (PokemonContext ctx = new PokemonContext())
            {
                PokemonMembers theMember = new PokemonMembers();
                theMember.id = id;
                ctx.Remove(theMember);
                ctx.SaveChanges();
                return true;
            }
        }

        public static PokemonMembers updatePokemon(PokemonMembers member)
        {
            using (PokemonContext ctx = new PokemonContext())
            {
                ctx.Update(member);
                ctx.SaveChanges();
                return member;
            }
        }

    }

    public class PokemonContext : DbContext
    {
        public DbSet<UserLogin> UserStorage { get; set; }
        public DbSet<PokemonMembers> MemberStorage { get; set; }
        public DbSet<SubPokemon> SubPokemon { get; set; }
        public DbSet<Subspecies> Subspecies { get; set; }
        public DbSet<Subsprites> Subsprites { get; set; }
        public DbSet<PokemonStat> PokemonStat { get; set; }
        public DbSet<PokemonType> PokemonType { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=pokemonuserlogin;Integrated Security=SSPI;");
            // Or For username/password, use the following:
            // optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=efconsole1;User Id=sa;Password=abc123;");
        }
    }
}
