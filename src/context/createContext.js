import React, { createContext, useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
export const ContextCreate = createContext('')
const ContextCreateFather = ({ children }) => {
    const answer1 = {
        id: Math.floor(100000 + Math.random() * 900000),
        answer: '',
    }
    const answer2 = {
        id: Math.floor(100000 + Math.random() * 900000),
        answer: '',
    }
    const [questions, setQuestions] = useState([
        {
            id: Math.floor(100000 + Math.random() * 900000),
            question: '',
            answers: [answer1, answer2],
            answer: '',
        }
    ])
    const [refresh, setRefresh] = useState(Math.floor(100000 + Math.random() * 900000))
    function newQuizzOne(title, theme, creator, urlImg, description) {
        const theQuizStats = {
            title,
            theme,
            creator,
            urlImg,
            description
        }
        localStorage.setItem('theQuizStats', JSON.stringify(theQuizStats))
    }
    function newQuestion() {
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
            question: '',
            answers: [answer1, answer2],
            answer: '',
        }
        setQuestions([...questions, que])
    }
    function addAnswer(id) {
        questions.forEach(element => {
            if (element.id === id) {
                const answer = {
                    id: Math.floor(100000 + Math.random() * 900000),
                    answer: '',
                }
                setRefresh(Math.floor(100000 + Math.random() * 900000))
                element.answers.push(answer)
            }
        });
    }
    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    }
    function deleteQuestion(idQuestion) {
        if (questions.length > 1) {
            for (var i = 0; i < questions.length; i++) {
                if (questions[i].id === idQuestion) {
                    questions.remove(i);

                    setRefresh(Math.floor(100000 + Math.random() * 900000))
                }

            }
        }

    }
    function deleteAnswer(idQuestion, idAnswer) {
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].id === idQuestion) {
                for (var x = 0; x < questions[i].answers.length; x++) {
                    if (questions[i].answers[x].id === idAnswer) {
                        if (questions[i].answers.length > 2) {
                            questions[i].answers.remove(x);
                            setRefresh(Math.floor(100000 + Math.random() * 900000))
                        }
                    }
                }
            }

        }
    }
    function setAns(idQuestion, idAnswer, newValue) {
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].id === idQuestion) {
                for (var x = 0; x < questions[i].answers.length; x++) {
                    if (questions[i].answers[x].id === idAnswer) {
                        if (questions[i].answer === questions[i].answers[x].answer) {
                            questions[i].answer = newValue
                            questions[i].answers[x].answer = newValue
                            setRefresh(Math.floor(100000 + Math.random() * 900000))
                        }
                        else {
                            questions[i].answers[x].answer = newValue
                            setRefresh(Math.floor(100000 + Math.random() * 900000))
                        }
                    }
                }
            }

        }
    }
    function setQuestion(idQuestion, newValue) {
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].id === idQuestion) {
                questions[i].question = newValue
                setRefresh(Math.floor(100000 + Math.random() * 900000))
            }

        }
    }
    function setAnsFinal(idQuestion, newValue) {
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].id === idQuestion) {
                questions[i].answer = newValue
                setRefresh(Math.floor(100000 + Math.random() * 900000))
            }
        }

    }
    function uploadQuizz() {
        const otherThings = JSON.parse(localStorage.getItem('theQuizStats'));
        const db = getFirestore()
        const quizzesColection = collection(db, 'quizzes')
        const quizz = {
            title: otherThings.title,
            theme: otherThings.theme,
            creator: otherThings.creator,
            urlImg: otherThings.urlImg,
            description: otherThings.description,
            questions: questions,

        }
        return addDoc(quizzesColection, quizz).then((y) => {return(y.id)})
    }
    return (
        <ContextCreate.Provider value={{ newQuizzOne, questions, newQuestion, addAnswer, deleteQuestion, deleteAnswer, refresh, setAns, setQuestion, setAnsFinal, uploadQuizz }}>
            {children}
        </ContextCreate.Provider>
    )
}
export default ContextCreateFather