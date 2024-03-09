import Navigator from './presentation/navigator/Navigator'
import { ThemeProviderContext } from './presentation/context/ThemeContext'

const Pokedex = () => {

    return (
            <ThemeProviderContext>
                <Navigator/>
            </ThemeProviderContext>
    )
}

export default Pokedex


