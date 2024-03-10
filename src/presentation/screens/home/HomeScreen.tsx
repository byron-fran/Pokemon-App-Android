import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { StyleSheet, View, } from 'react-native'
import { Button, FAB, Text } from 'react-native-paper'
import { getPokemos } from '../../../actions/pokemons/get-pokemons'
import PokeBallBg from '../../components/ui/PokeBallBg'
import { FlatList } from 'react-native'
import { globalTheme } from '../../../config/theme/global-theme'
import PokemonCard from '../../components/pokemons/PokemonCard'
import { generateId } from '../../../config/helpers/generateId';
import { RootStackParams } from '../../navigator/Navigator'
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'>{}


const HomeScreen = ({navigation} : Props) => {

    // const {data = [], isLoading, isFetched} = useQuery({
    //     queryKey : ['pokemons'],
    //     queryFn :() => getPokemos(1, 20),
    //     staleTime : 100 * 60 * 60
    // })
    const queryClient = useQueryClient()
    const { data, isLoading, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        queryFn: async (params) => {
            const pokemons = await getPokemos(params.pageParam)

            pokemons.forEach(pokemon => {
                queryClient.setQueryData(['pokemon', pokemon.id], pokemon)
            })
            return pokemons
        },
        getNextPageParam: (lastPage, pages) => pages.length,
        staleTime: 100 * 60 * 60,

    })
    return (
        <View style={[globalTheme.globalMarginTop]}>
            <PokeBallBg style={styles.img} />
            <FlatList
                data={data?.pages.flat() ?? []}
                keyExtractor={(item) => generateId()}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                numColumns={2}
                onEndReachedThreshold={0.6}
                onEndReached={() => fetchNextPage()}
                showsVerticalScrollIndicator={false}
            />
            <FAB 
                label='buscar' 
                style={{ position : 'absolute', backgroundColor : 'gray', bottom : 20, right : 20 }} 
                mode='elevated' 
                onPress={() => navigation.push('SearchScreen')} />
        </View>
    )
}


const styles = StyleSheet.create(
    {
        img: {
            position: 'absolute',
            top: -100,
            right: -100

        }
    }
)
export default HomeScreen