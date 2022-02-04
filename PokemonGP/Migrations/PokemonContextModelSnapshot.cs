﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PokemonGP.Models;

namespace PokemonGP.Migrations
{
    [DbContext(typeof(PokemonContext))]
    partial class PokemonContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.22")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PokemonGP.Models.PokemonMembers", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("experience")
                        .HasColumnType("int");

                    b.Property<int>("level")
                        .HasColumnType("int");

                    b.Property<int>("teampos")
                        .HasColumnType("int");

                    b.Property<int>("userid")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.ToTable("MemberStorage");
                });

            modelBuilder.Entity("PokemonGP.Models.PokemonStat", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("basestat")
                        .HasColumnType("int");

                    b.Property<string>("statname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("PokemonStat");
                });

            modelBuilder.Entity("PokemonGP.Models.PokemonType", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("pokemontype")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("PokemonType");
                });

            modelBuilder.Entity("PokemonGP.Models.SubPokemon", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("base_experience")
                        .HasColumnType("int");

                    b.Property<int>("height")
                        .HasColumnType("int");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("order")
                        .HasColumnType("int");

                    b.Property<int>("weight")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.ToTable("SubPokemon");
                });

            modelBuilder.Entity("PokemonGP.Models.Subspecies", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("url")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Subspecies");
                });

            modelBuilder.Entity("PokemonGP.Models.Subsprites", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("back_default")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("front_default")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Subsprites");
                });

            modelBuilder.Entity("PokemonGP.Models.UserLogin", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("UserStorage");
                });
#pragma warning restore 612, 618
        }
    }
}
