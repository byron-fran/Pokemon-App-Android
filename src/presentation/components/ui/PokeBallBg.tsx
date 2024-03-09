import { FC, useContext } from 'react'
import { View, Text, StyleProp, ViewStyle, ImageStyle, Image } from 'react-native'
import { ThemeContext } from '../../context/ThemeContext'


type Props  = {
    style?: StyleProp<ImageStyle>
}
const PokeBallBg : FC<Props> = ({style}) => {
    const {theme, isDark} = useContext(ThemeContext);
    const imgPokeBall = isDark ? require('../../../assets/pokeball-dark.png') : require('../../../assets/pokeball-light.png')
    return (
        <View>
            <Image style={[{
                width : 300,
                height : 300,
                opacity : 0.3
            }, style]} source={imgPokeBall}/>
        </View>

    )

}
export default PokeBallBg