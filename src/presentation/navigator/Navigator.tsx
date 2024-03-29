import { View, Text } from 'react-native'
import HomeScreen from '../screens/home/HomeScreen'
import SearchScreen from '../screens/search/SearchScreen'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import PokemonScreen from '../screens/pokemon/PokemonScreen'
import { Pokemon } from '../../infrestucture/interfaces/Pokemon'

export type RootStackParams  = {
    HomeScreen : undefined,
    SearchScreen : undefined,
    PokemonScreen : {id : string}
}
const Stack = createNativeStackNavigator<RootStackParams>();

const Navigator = () => {

    return (
        <Stack.Navigator screenOptions={ {
            headerShown : false
        }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen}/>
            <Stack.Screen name='SearchScreen' component={SearchScreen}/>
            <Stack.Screen name='PokemonScreen' component={PokemonScreen}/>
        </Stack.Navigator>

    )
}

export default Navigator