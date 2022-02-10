using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace PokemonGP.Models
{
    public class Pokemon
    {
        public int height { get; set; }
        public int weight { get; set; }
        public int id { get; set; }
        public string name { get; set; }
        public int base_experience { get; set; }
        public Species species { get; set; }
        public Sprites sprites { get; set; }
        public List<Stat> stats { get; set; }
        public List<Type> types { get; set; }
    }
    public class Species
    {
        public string name { get; set; }
        public string url { get; set; }
    }
    public class Sprites
    {
        public string back_default { get; set; }
        public string front_default { get; set; }
    }
    public class Stat
    {
        public int base_stat { get; set; }
        public StatSpecs stat { get; set; }
    }
    public class StatSpecs
    {
        public string name { get; set; }
    }
    public class Type
    {
        public TypeSpecs type { get; set; }
    }
    public class TypeSpecs
    {
        public string name { get; set; }
        public string url { get; set; }
    }

    public class PokemonAPI
    {
        private static HttpClient _realClient = null;
        public static HttpClient MyHttp
        {
            get
            {
                if (_realClient == null)
                {
                    _realClient = new HttpClient();
                    _realClient.BaseAddress = new Uri("https://pokeapi.co/api/v2/"); // ADD YOUR OWN BASE ADDRESS HERE
                }
                return _realClient;
            }
        }
        public static async Task<Pokemon> GetPokemon()
        {

            for (int i = 1; i < 152; i++)
            {
                var connection = await MyHttp.GetAsync($"pokemon/{i}");
                Pokemon pokemon2 = await connection.Content.ReadAsAsync<Pokemon>();

                PokemonDataBase.AddToFull(pokemon2);
            }

            return null;
        }
    }
}
