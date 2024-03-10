import { Pokemon } from "../../infrestucture/interfaces/Pokemon"
import { getPokemonById } from "./get-pokemon-by-id"
export const getPokemonsByIds = async (ids  :  number[] ) : Promise<Pokemon[]> => {
    try {
        const pokemonsPromises : Promise<Pokemon> []= ids.map(id => {
            return getPokemonById(id)
        })
        return await Promise.all(pokemonsPromises)
    } catch (error : unknown) {
        throw new Error('error')
    }
}