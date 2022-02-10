using Microsoft.EntityFrameworkCore.Migrations;

namespace PokemonGP.Migrations
{
    public partial class CreatePokemon : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MemberStorage",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    pokemonid = table.Column<int>(nullable: false),
                    userid = table.Column<int>(nullable: false),
                    level = table.Column<int>(nullable: false),
                    experience = table.Column<int>(nullable: false),
                    current_hitpoints = table.Column<int>(nullable: false),
                    teampos = table.Column<int>(nullable: false),
                    given_name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberStorage", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "PokemonFullList",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false),
                    species = table.Column<string>(nullable: true),
                    main_sprite = table.Column<string>(nullable: true),
                    height = table.Column<int>(nullable: false),
                    weight = table.Column<int>(nullable: false),
                    base_experience = table.Column<int>(nullable: false),
                    hitpoints = table.Column<int>(nullable: false),
                    attack = table.Column<int>(nullable: false),
                    defense = table.Column<int>(nullable: false),
                    type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "UserStorage",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserStorage", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MemberStorage");

            migrationBuilder.DropTable(
                name: "PokemonFullList");

            migrationBuilder.DropTable(
                name: "UserStorage");
        }
    }
}
