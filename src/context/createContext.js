import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getFirestore } from "firebase/firestore";

import { createOpenAI } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';

export const QuizContext = createContext()

export const QuizProvider = ({ children }) => {


    const navigate = useNavigate()
    const [AILoading, setAILoading] = useState(false)

    const [AIForm, setAIForm] = useState({
        description: '',
        numQuestions: 1,
        dificulty: 1,
        fileDirectori: undefined,
        typeQuestion: 'MultipleChoice',
    })


    function changeValueForm(name, value) {
        setAIForm(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    async function handleSubmit(e, apiKey) {
        e.preventDefault()

        if (AIForm.fileDirectori !== undefined) {
            // const file = AIForm.fileDirectori
            // await readPdf(AIForm.fileDirectori)
            // console.log(text)
        }


        else {
            const openai = createOpenAI({
                apiKey // should ideally be loaded from external place such as env variable
            });
            const { partialObjectStream } = await streamObject({

                model: openai('gpt-4-turbo'),
                schema: z.object({
                    plates: z.array(z.object({
                        name: z.string(),
                        ingredients: z.array(z.string()),
                        steps: z.array(z.string()),
                    })),
                }),

                prompt: 'Generate 3 recipes for 3 diferent plates of sea food.',
            }).catch(() => console.log("upp"));

            for await (const partialObject of partialObjectStream) {
                // console.clear();
                console.log(partialObject);
            }
        }

        // console.log(AIForm)
        // navigate('/create/questions')
        // console.log(quiz);
    }

    // const answer1 = {
    //     id: Math.floor(100000 + Math.random() * 900000),
    //     answer: '',
    // }
    // const answer2 = {
    //     id: Math.floor(100000 + Math.random() * 900000),
    //     answer: '',
    // }
    // const [questions, setQuestions] = useState([
    //     {
    //         id: Math.floor(100000 + Math.random() * 900000),
    //         question: '',
    //         answers: [answer1, answer2],
    //         answer: '',
    //     }
    // ])
    // const [refresh, setRefresh] = useState(Math.floor(100000 + Math.random() * 900000))
    // function newQuizzOne(title, theme, creator, urlImg, description) {
    //     const theQuizStats = {
    //         title,
    //         theme,
    //         creator,
    //         urlImg,
    //         description
    //     }
    //     localStorage.setItem('theQuizStats', JSON.stringify(theQuizStats))
    // }
    // function newQuestion() {
    //     const answer1 = {
    //         id: Math.floor(100000 + Math.random() * 900000),
    //         answer: '',
    //     }
    //     const answer2 = {
    //         id: Math.floor(100000 + Math.random() * 900000),
    //         answer: '',
    //     }
    //     const que = {
    //         id: Math.floor(100000 + Math.random() * 900000),
    //         question: '',
    //         answers: [answer1, answer2],
    //         answer: '',
    //     }
    //     setQuestions([...questions, que])
    // }
    // function addAnswer(id) {
    //     questions.forEach(element => {
    //         if (element.id === id) {
    //             const answer = {
    //                 id: Math.floor(100000 + Math.random() * 900000),
    //                 answer: '',
    //             }
    //             setRefresh(Math.floor(100000 + Math.random() * 900000))
    //             element.answers.push(answer)
    //         }
    //     });
    // }
    // Array.prototype.remove = function (from, to) {
    //     var rest = this.slice((to || from) + 1 || this.length);
    //     this.length = from < 0 ? this.length + from : from;
    //     return this.push.apply(this, rest);
    // }
    // function deleteQuestion(idQuestion) {
    //     if (questions.length > 1) {
    //         for (var i = 0; i < questions.length; i++) {
    //             if (questions[i].id === idQuestion) {
    //                 questions.remove(i);

    //                 setRefresh(Math.floor(100000 + Math.random() * 900000))
    //             }

    //         }
    //     }

    // }
    // function deleteAnswer(idQuestion, idAnswer) {
    //     for (var i = 0; i < questions.length; i++) {
    //         if (questions[i].id === idQuestion) {
    //             for (var x = 0; x < questions[i].answers.length; x++) {
    //                 if (questions[i].answers[x].id === idAnswer) {
    //                     if (questions[i].answers.length > 2) {
    //                         questions[i].answers.remove(x);
    //                         setRefresh(Math.floor(100000 + Math.random() * 900000))
    //                     }
    //                 }
    //             }
    //         }

    //     }
    // }
    // function setAns(idQuestion, idAnswer, newValue) {
    //     for (var i = 0; i < questions.length; i++) {
    //         if (questions[i].id === idQuestion) {
    //             for (var x = 0; x < questions[i].answers.length; x++) {
    //                 if (questions[i].answers[x].id === idAnswer) {
    //                     if (questions[i].answer === questions[i].answers[x].answer) {
    //                         questions[i].answer = newValue
    //                         questions[i].answers[x].answer = newValue
    //                         setRefresh(Math.floor(100000 + Math.random() * 900000))
    //                     }
    //                     else {
    //                         questions[i].answers[x].answer = newValue
    //                         setRefresh(Math.floor(100000 + Math.random() * 900000))
    //                     }
    //                 }
    //             }
    //         }

    //     }
    // }
    // function setQuestion(idQuestion, newValue) {
    //     for (var i = 0; i < questions.length; i++) {
    //         if (questions[i].id === idQuestion) {
    //             questions[i].question = newValue
    //             setRefresh(Math.floor(100000 + Math.random() * 900000))
    //         }

    //     }
    // }
    // function setAnsFinal(idQuestion, newValue) {
    //     for (var i = 0; i < questions.length; i++) {
    //         if (questions[i].id === idQuestion) {
    //             questions[i].answer = newValue
    //             setRefresh(Math.floor(100000 + Math.random() * 900000))
    //         }
    //     }

    // }
    // function uploadQuizz() {
    //     const db = getFirestore()
    //     const quizzesColection = collection(db, 'quizzes')
    //     const quizz = {
    //         long: 0,
    //         creator: '',
    //         urlImg: '',
    //         description: '',
    //         results: [],
    //         theme: '',
    //         public: true,
    //         presentOnce: true,
    //         questions: questions,
    //         needApikey: false
    //     }
    //     return addDoc(quizzesColection, quizz).then((y) => { return (y.id) })
    // }
    return (
        <QuizContext.Provider value={{ AIForm, changeValueForm, handleSubmit }} >
            {children}
        </QuizContext.Provider>
    )
}
