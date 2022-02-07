using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PokemonGP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokemonGP.Controllers
{
    [Route("userlogin")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        [HttpPost]
        public UserLogin AddUser(UserLogin newUser)
        {
            return UserDB.AddUser(newUser);
        }

        [HttpDelete]
        public bool DeleteUser(int id)
        {
            return UserDB.DeleteUser(id);
        }

        [HttpGet]
        public List<UserLogin> GetUsers()
        {
            return UserDB.GetUsers();
        }

        [HttpGet]
        [Route("teamlist")]
        public List<PokemonMembers> listTeam(int userID)
        {
            return UserDB.listTeam(userID);
        }

        [HttpGet]
        [Route("full_listG")]
        public List<PokemonFull> listFull()
        {
            return UserDB.listFull();
        }

        [HttpPost]
        [Route("full_listP")]
        public Task<Pokemon> GetPokemon()
        {
            return PokemonAPI.GetPokemon();
        }
    }
}
