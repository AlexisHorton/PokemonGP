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
                    level = table.Column<int>(nullable: false),
                    experience = table.Column<int>(nullable: false),
                    userid = table.Column<int>(nullable: false),
                    teampos = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberStorage", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "PokemonStat",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    statname = table.Column<string>(nullable: true),
                    basestat = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PokemonStat", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "PokemonType",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    pokemontype = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PokemonType", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "SubPokemon",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    height = table.Column<int>(nullable: false),
                    weight = table.Column<int>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    base_experience = table.Column<int>(nullable: false),
                    order = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubPokemon", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Subspecies",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true),
                    url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subspecies", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Subsprites",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    back_default = table.Column<string>(nullable: true),
                    front_default = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subsprites", x => x.id);
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
                name: "PokemonStat");

            migrationBuilder.DropTable(
                name: "PokemonType");

            migrationBuilder.DropTable(
                name: "SubPokemon");

            migrationBuilder.DropTable(
                name: "Subspecies");

            migrationBuilder.DropTable(
                name: "Subsprites");

            migrationBuilder.DropTable(
                name: "UserStorage");
        }
    }
}
