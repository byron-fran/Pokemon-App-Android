import { Pokemon } from '../interfaces/Pokemon';
import type { PokemonDetail } from '../interfaces/PokeApi';
import { getColorsImage } from '../../config/helpers/getColors';
export class PokemonMapper {

  static async pokeApiPokemonToEntity(data:PokemonDetail): Promise<Pokemon> {
    const sprites = PokemonMapper.getSprites(data);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    const color = await getColorsImage(avatar)
    return {
      id: data.id,
      name: data.name,
      avatar: avatar,
      types: data.types.map(type => type.type.name),
      sprites: sprites,
      color,
      abilities : data.abilities.map(a => a.ability.name),
      games : data.game_indices.map(g => g.version.name),
      moves : data.moves.map(m => ({name : m.move.name, level : 0})),
      stats : data.stats.map(s => ({name : s.stat.name, value : s.base_stat})),
    };
  }

  static getSprites(data: PokemonDetail): string[] {
    const sprites: string[] = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ];

    if (data.sprites.other?.home.front_default)
      sprites.push(data.sprites.other?.home.front_default);
    if (data.sprites.other?.['official-artwork'].front_default)
      sprites.push(data.sprites.other?.['official-artwork'].front_default);
    if (data.sprites.other?.['official-artwork'].front_shiny)
      sprites.push(data.sprites.other?.['official-artwork'].front_shiny);
    if (data.sprites.other?.showdown.front_default)
      sprites.push(data.sprites.other?.showdown.front_default);
    if (data.sprites.other?.showdown.back_default)
      sprites.push(data.sprites.other?.showdown.back_default);

    return sprites;
  }
}