import { StyleSheet, View, Image, Pressable } from 'react-native'
import { Pokemon } from '../../../infrestucture/interfaces/Pokemon'
import { FC } from 'react'
import { Text, Card } from 'react-native-paper';
import { FadeInImage } from '../ui/FadeInImage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigator/Navigator';
import { NavigationProp } from '@react-navigation/native';
type Props = {
    pokemon: Pokemon
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
    const navigate = useNavigation<NavigationProp<RootStackParams>>()
    return (
        <Pressable onPress={() => navigate.navigate('PokemonScreen', {id : pokemon.id.toString()})} style={{flex : 1}}>

            <Card style={[styles.cardContainer, { backgroundColor: pokemon?.color }]}>
                <Text variant='bodyLarge' lineBreakMode='middle'>
                    {pokemon.name}
                    {'\n#' + pokemon.id}
                </Text>
                <View style={styles.pokeballContainer}>
                    <Image style={styles.pokeball} source={require('../../../assets/pokeball-light.png')} />
                </View>
                <FadeInImage style={styles.pokemonImage} uri={pokemon.avatar} />
            </Card>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        backgroundColor: 'grey',
        height: 120,
        flex: 0.5,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        top: 10,
        left: 10,
    },
    pokeball: {
        width: 100,
        height: 100,
        right: -25,
        top: -25,
        opacity: 0.4,
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -15,
        top: -30,
    },

    pokeballContainer: {
        alignItems: 'flex-end',
        width: '100%',
        position: 'absolute',

        overflow: 'hidden',
        opacity: 0.5,
    },
});
export default PokemonCard