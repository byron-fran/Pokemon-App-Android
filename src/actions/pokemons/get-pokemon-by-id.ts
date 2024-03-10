import { pokeApi } from "../../config/api/axios"
import { PokemonDetail } from "../../infrestucture/interfaces/PokeApi";
import { PokemonMapper } from "../../infrestucture/mapers/pokemon.mapers";

export const getPokemonById = async ( id : string | number) => {
    try {
        const {data} = await pokeApi.get<PokemonDetail>(`/pokemon/${id}`);
        const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data)
        return pokemon
        
    } catch (error : unknown) {
        throw new Error('error')
    }
}