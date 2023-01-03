import React, { createContext, useState } from "react";
export const ContextCreate = createContext('')
const ContextCreateFather = ( { children } ) => {
    const [questions, setQuestions] = useState([])
    const [refresh, setRefresh] = useState(Math.floor(100000 + Math.random() * 900000))
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
    function newQuestion(){
        const answer1 = {
            id: Math.floor(100000 + Math.random() * 900000),
            answer: '',
        }
        const answer2 = {
            id: Math.floor(100000 + Math.random() * 900000),
            answer: '',
        }
        const que = {
            id: Math.floor(100000 + Math.random() * 900000),
            answers: [answer1, answer2],
        }
        setQuestions([...questions, que ])
    }
    function addAnswer(id){
        questions.forEach(element => {
            if(element.id === id){
                const answer = {
                    id: Math.floor(100000 + Math.random() * 900000),
                    answer: '',
                }
                setRefresh(Math.floor(100000 + Math.random() * 900000))
                element.answers.push(answer)
            }
        });
    }
    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
      }
    function deleteQuestion(idQuestion){
        for( var i = 0; i < questions.length; i++){ 
            if ( questions[i].id === idQuestion) { 
                questions.remove(i);
                console.log(questions)
                setRefresh(Math.floor(100000 + Math.random() * 900000))
            }
        
        }
    }
    function deleteAnswer(idQuestion, idAnswer){
        for( var i = 0; i < questions.length; i++){ 
            if ( questions[i].id === idQuestion) { 
                for( var x = 0; x < questions[i].answers.length; x++){
                    if(questions[i].answers[x].id === idAnswer){
                        if(questions[i].answers.length > 2){
                        questions[i].answers.splice(x, 1); 
                        setRefresh(Math.floor(100000 + Math.random() * 900000))
                        }
                    }
                }
            }
        
        }
    }
    return(
        <ContextCreate.Provider value={{newQuizzOne, questions, newQuestion, addAnswer, deleteQuestion, deleteAnswer, refresh}}>
            {children}
        </ContextCreate.Provider>
    )
}
export default ContextCreateFather