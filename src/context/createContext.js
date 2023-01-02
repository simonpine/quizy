import React, { createContext, useState } from "react";
export const ContextCreate = createContext('')
const ContextCreateFather = ( { children } ) => {
    const [questions, setQuestions] = useState([])
    function newQuizzOne(title, theme, creator, urlImg, description){
        const theQuizStats = {
            title,
            theme,
            creator,
            urlImg,
            description
        }
        localStorage.setItem('theQuizStats' ,JSON.stringify(theQuizStats))
    }
    return(
        <ContextCreate.Provider value={{newQuizzOne}}>
            {children}
        </ContextCreate.Provider>
    )
}
export default ContextCreateFather