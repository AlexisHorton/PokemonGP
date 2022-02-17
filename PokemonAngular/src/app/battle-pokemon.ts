export interface BattlePokemon {
    id: number | null;
    pokemonid: number;
    species: string;
    level: number;
    hitpoints: number;
    current_hitpoints: number;
    attack: number;
    defense: number;
}