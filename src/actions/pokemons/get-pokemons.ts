import { pokeApi } from "../../config/api/axios"
import { Pokemon } from "../../infrestucture/interfaces/Pokemon"
import { PokemonDetail } from "../../infrestucture/interfaces/PokeApi"
import { PokemoResultResponse } from "../../infrestucture/interfaces/PokeApi";
import { PokemonMapper } from "../../infrestucture/mapers/pokemon.mapers";

export const getPokemos = async(page : number, limit : number) : Promise<Pokemon[]>=> {
    try {
        const {data} = await pokeApi<PokemoResultResponse>(`/pokemon?offset=${page * 10}&limit=${limit}`)

        const pokemonPromises = data.results.map(async (pokemon) => {
            const response = await pokeApi.get<PokemonDetail>(pokemon.url);
            return PokemonMapper.pokeApiPokemonToEntity(response.data);
        });
        
        const results = await Promise.all(pokemonPromises);
        const pokemons = results.map((item) => item);
        
        return pokemons;
    } catch (error: unknown) {
        throw new Error('error')
    }
}