import React, {useContext, useState} from 'react'
import UserProvider from './context/UserProvider'
import Application from './Application'


export default function App() {
    return (
        <UserProvider>
            <Application />
        </UserProvider>
    )
}
