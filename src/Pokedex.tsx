import Navigator from './presentation/navigator/Navigator'
import { ThemeProviderContext } from './presentation/context/ThemeContext'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()
const Pokedex = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProviderContext>
                <Navigator />
            </ThemeProviderContext>
        </QueryClientProvider >
    )
}

export default Pokedex


