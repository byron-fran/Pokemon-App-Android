import { PokemoResultResponse } from "../../infrestucture/interfaces/PokeApi"
import { pokeApi } from "../../config/api/axios";


export const getPokemonNameWithId = async  () => {

    try {
        const url = `pokemon?limit=1000`
        const {data} = await pokeApi<PokemoResultResponse>(url)

        return data.results.map(info => ({
            id : Number(info.url.split('/')[6]),
            name : info.name
        }))
    } 
    catch (error : unknown) {
        
    }
}