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
        public List<PokemonMembers> listMembers()
        {
            return UserDB.listMembers();
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

        [HttpGet]
        [Route("single")]
        public PokemonFull GetPokemonFull(int id)
        {
            return UserDB.GetPokemonFull(id);
        }

        [HttpPost]
        [Route("full_list")]
        public Task<Pokemon> GetPokemon()
        {
            return PokemonAPI.GetPokemon();
        }

        [HttpPut]
        public PokemonMembers updatePokemon(PokemonMembers member)
        {
            return UserDB.updatePokemon(member);
        }

        [HttpGet]
        [Route("enemy")]
        public EnemyObject GetRandomEnemy(int battlescore)
        {
            return UserDB.GetRandomEnemy(battlescore);
        }
    }
}
