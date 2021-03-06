using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PokemonGP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace PokemonGP.Controllers
{
    [Route("pokemon")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        [HttpGet]
        public List<PokemonMembers> listMembers(int userID)
        {
            return UserDB.listMembers(userID);
        }

        [HttpPost]
        public PokemonMembers addPokemon(PokemonMembers newMember)
        {
            return UserDB.addPokemon(newMember);
        }

        [HttpDelete]
        public bool deletePokemon(int id)
        {
            return UserDB.deletePokemon(id);
        }


        [HttpGet]
        [Route("full_list")]
        public List<PokemonFull> listFull()
        {
            return UserDB.listFull();
        }

        [HttpPost]
        [Route("full_list")]
        public Task<Pokemon> GetPokemon()
        {
            return PokemonAPI.GetPokemon();
        }
    }
}
