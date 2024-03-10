import { FlatList, View, } from 'react-native'
import { TextInput, Text, ActivityIndicator } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Pokemon } from '../../../infrestucture/interfaces/Pokemon'
import { generateId } from '../../../config/helpers/generateId'
import PokemonCard from '../../components/pokemons/PokemonCard'
import { useQuery } from '@tanstack/react-query'
import { getPokemonNameWithId } from '../../../actions/pokemons/get-pokemons-with-name';
import { useMemo, useState } from 'react'
import { getPokemonsByIds } from '../../../actions/pokemons/get-pokemons-by-ids'
import useDebounceValue from '../../hooks/useDebounceValue'
const SearchScreen = () => {
    const { top } = useSafeAreaInsets();
    const [term, setTerm] = useState<string>('');
    const debounceValue = useDebounceValue(term);

    const { isLoading, data = [] } = useQuery({
        queryKey: ['pokemon', 'all'],
        queryFn: () => getPokemonNameWithId(),
    });


    const pokemonNameList = useMemo(() => {
        if (!isNaN(Number(debounceValue))) {
            const pokemon = data?.find(item => item.id === Number(debounceValue))
            return pokemon ? [pokemon] : []
        }
        if (debounceValue.length === 0) return []
        if (debounceValue.length < 3) return []

        return data?.filter(item => {
            return item.name.includes(debounceValue.toLocaleLowerCase())
        })

    }, [debounceValue]);

    const { isLoading: isLoadingPokemons, data: pokemons = [] } = useQuery({
        queryKey: ['pokemons', 'by', pokemonNameList],
        queryFn: () => getPokemonsByIds(pokemonNameList.map(pokemon => pokemon.id)),
        staleTime: 1000 * 60 * 5// 5minutes
    })

    return (
        <View style={{ marginTop: top + 10 }}>
            <TextInput
                placeholder='Buscar pokemon'
                autoCorrect={false}
                autoComplete={'name'}
                onChangeText={setTerm}
                value={term}

            />
            {isLoadingPokemons && (

                <ActivityIndicator
                    style={{ marginTop: 10 }}

                />
            )}
            
            <FlatList
                data={pokemons}
                keyExtractor={(item) => generateId()}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                numColumns={2}
                onEndReachedThreshold={0.6}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => <View style={{height : 100}}></View>}
            />
        </View>

    )
}

export default SearchScreen