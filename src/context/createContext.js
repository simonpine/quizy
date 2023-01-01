import React, { createContext, useState } from "react";
export const ContextCreate = createContext('')
export const ContextCreateFather = ( { children } ) => {
    const [title, setTitle] = useState('')
    const [theme, setTheme] = useState('')
    const [creator, setCreator] = useState('')
    const [urlImg, setUrlImg] = useState('')
    const [description, setDescription] = useState('')
    return(
        <ContextCreate.Provider value={{setTitle, setTheme, setCreator, setUrlImg, setDescription}}>
            {children}
        </ContextCreate.Provider>
    )
}