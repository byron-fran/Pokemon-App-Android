import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    NavigationContainer
} from '@react-navigation/native';
import { PropsWithChildren, createContext } from 'react';
import { useColorScheme } from 'react-native';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext({
    isDark: false,
    theme: LightTheme

})


export const ThemeProviderContext = ({ children }: PropsWithChildren) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? DarkTheme : LightTheme;

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <ThemeContext.Provider value={{
                    isDark,
                    theme
                }}>

                    {children}
                </ThemeContext.Provider>
            </NavigationContainer>
        </PaperProvider>
    )
}
