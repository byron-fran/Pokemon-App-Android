import { View, Text } from 'react-native'
import ImageColors from 'react-native-image-colors'
import {ActivityIndicator, useTheme} from 'react-native-paper';

const FullScreenLoader = () => {

    const {colors} = useTheme()

    return (
        <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', backgroundColor : colors.background}}>
            <ActivityIndicator size={20} color='white'/>

        </View>

    )

}
export default FullScreenLoader