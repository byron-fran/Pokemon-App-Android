import ImageColors from "react-native-image-colors"

export const getColorsImage = async(image : string) => {

    const fallColor = 'gray'
    const colors = await ImageColors.getColors(image, {
        fallback : fallColor
    })

    switch(colors.platform){
        case  'android':
            return colors.dominant ?? fallColor
        case 'ios':
            return colors.background  ?? fallColor
        
         default:
            return fallColor   
    }
}