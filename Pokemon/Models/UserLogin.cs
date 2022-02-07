using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations.Schema;
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
        public string given_name { get; set; }
        public int userid { get; set; }
        public string species { get; set; }
        public string main_sprite { get; set; }
        public int order { get; set; }
        public int level { get; set; }
        public int base_experience { get; set; }
        public int maxhp { get; set; }
        public int current_hp { get; set; }
        public int attack { get; set; }
        public int defense { get; set; }
        public int teampos { get; set; }
        public string type { get; set; }
    }

    public class PokemonFull
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string species { get; set; }
        public string main_sprite { get; set; }
        public int height { get; set; }
        public int weight { get; set; }
        public int order { get; set; }
        public int base_experience { get; set; }
        public int maxhp { get; set; }
        public int current_hp { get; set; }
        public int attack { get; set; }
        public int defense { get; set; }
        public string type { get; set; }
    }

    public class UserDB
    {
        public static List<UserLogin> GetUsers()
        {
            using (PokemonContext ctx = new PokemonContext())
            {
                var users = ctx.UserStorage.ToList();
                return users;
            }
        }

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
        public static List<PokemonFull> listFull()
        {
            List<PokemonFull> result = null;
            using (PokemonContext ctx = new PokemonContext())
            {
                result = ctx.PokemonFullList.ToList();
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
        public DbSet<PokemonFull> PokemonFullList { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=pokemonDB;Integrated Security=SSPI;");
            // Or For username/password, use the following:
            // optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=efconsole1;User Id=sa;Password=abc123;");
        }
    }

    public class PokemonDataBase
    {
        public static bool AddToFull(PokemonAPIResponse monster)
        {
            using (PokemonContext ctx = new PokemonContext())
            {
                List<PokemonFull> full = ctx.PokemonFullList.Where(s => s.order == monster.order).ToList();
                if (full.Count > 0)
                {
                    return false;
                }
                PokemonFull newmon = new PokemonFull();
                newmon.species = monster.species.name;
                newmon.main_sprite = monster.sprites.front_default;
                newmon.height = monster.height;
                newmon.weight = monster.weight;
                newmon.order = monster.order;
                newmon.base_experience = monster.base_experience;
                newmon.maxhp = monster.stats[0].base_stat;
                newmon.current_hp = monster.stats[0].base_stat;
                newmon.attack = monster.stats[1].base_stat;
                newmon.defense = monster.stats[2].base_stat;
                newmon.type = monster.types[0].type.name;


                ctx.PokemonFullList.Add(newmon);
                ctx.SaveChanges();
            }
            return true;
        }
    }
}
