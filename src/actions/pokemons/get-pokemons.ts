import { pokeApi } from "../../config/api/axios"
import { Pokemon } from "../../infrestucture/interfaces/Pokemon"
import { PokemonDetail } from "../../infrestucture/interfaces/PokeApi"
import { PokemoResultResponse } from "../../infrestucture/interfaces/PokeApi";
import { PokemonMapper } from "../../infrestucture/mapers/pokemon.mapers";

export const getPokemos = async(page : number, limit : number) => {
    try {
        const {data} = await pokeApi<PokemoResultResponse>(`/pokemon?offset=${page * 10}&limit=${limit}`)

        const pokemonPromises = data.results.map(pokemon  => {
            return pokeApi.get<PokemonDetail>(pokemon.url)
        })
        const results = await Promise.all(pokemonPromises)

        const pokemons = results.map(item => (PokemonMapper.pokeApiPokemonToEntity(item.data)));
   
        return pokemons
    } catch (error: unknown) {
        throw new Error('error')
    }
}