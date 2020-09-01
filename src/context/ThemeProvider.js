import React, {useState, createContext} from 'react'

const ThemeContext  =  createContext(undefined)
const ThemeDispatchContext = createContext(undefined)



function ThemeProvider({children}) {
    const [navOpen, setNavOpen] = useState(false)
    const [theme, setTheme] = useState('light')


    return (
        <ThemeContext.Provider value={{theme, navOpen}}> 
            <ThemeDispatchContext.Provider  value={{setNavOpen, setTheme}} >
                {children}
            </ThemeDispatchContext.Provider>
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext, ThemeDispatchContext };