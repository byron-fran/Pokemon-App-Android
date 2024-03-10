import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

const useDebounceValue = (input : string = '', time : number = 1000) => {
    const [debounce, setDebounce] = useState(input)
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebounce(input)
        }, time)

        return () => {
            clearTimeout(timeOut)
        }
    }, [input])



    return debounce

}
export default useDebounceValue