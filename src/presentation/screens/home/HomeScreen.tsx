import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { StyleSheet, View,} from 'react-native'
import {Button, Text} from  'react-native-paper'
import { getPokemos } from '../../../actions/pokemons/get-pokemons'
import PokeBallBg from '../../components/ui/PokeBallBg'
import { FlatList } from 'react-native'
import { globalTheme } from '../../../config/theme/global-theme'
import PokemonCard from '../../components/pokemons/PokemonCard'
const HomeScreen = () => {
   
    const {data, isLoading} = useQuery({
        queryKey : ['pokemons'],
        queryFn :() => getPokemos(1, 20),
        staleTime : 100 * 60 * 60
    })
    
    return (
        <View style={[globalTheme.globalMarginTop]}>
            <PokeBallBg style={styles.img}/>
            <FlatList  
                data={data}
                keyExtractor={(item) => item?.id.toString()}
                renderItem={({item}) => (
                    <PokemonCard pokemon={item}/>
                )}
                numColumns={2}

             />
        </View>
    )
}


const styles = StyleSheet.create(
    {
        img : {
            position : 'absolute',
            top : -100,
            right : -100

        }
    }
)    
export default HomeScreen