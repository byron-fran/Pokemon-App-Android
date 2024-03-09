import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { View,} from 'react-native'
import {Button, Text} from  'react-native-paper'
import { getPokemos } from '../../../actions/pokemons/get-pokemons'



const HomeScreen = () => {
   
    const {data, isLoading} = useQuery({
        queryKey : ['pokemon'],
        queryFn :() => getPokemos(1, 20),
        staleTime : 100 * 60 * 60
    })
    return (
        <View>
            <Text>HomeScreen</Text>
            <Button  mode='contained'>
                press me
            </Button>
            <View>

            </View>
        </View>

    )}

export default HomeScreen