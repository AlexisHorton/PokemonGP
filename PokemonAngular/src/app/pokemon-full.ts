export interface PokemonFull {
    id: number;
    species: string;
    main_sprite: string;
    height: number;
    weight: number;
    base_experience: number;
    hitpoints: number;
    attack: number;
    defense: number;
    type: string;
    battle_score: number;
    evolve_to: number;
    evolve_at: number;
}
