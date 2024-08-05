import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { arrayMove } from "@dnd-kit/sortable";

// import { collection, addDoc, getFirestore } from "firebase/firestore";

import { createOpenAI } from '@ai-sdk/openai';
import { generateObject, streamObject } from 'ai';
import { z } from 'zod';


const ToastStyle = {
    position: "bottom-center",
    style: {
        background: 'rgb(255, 255, 255, .9)',
        color: '#2F0C29',
        borderRadius: '8px',
        fontSize: '1.3rem',
        fontWeight: '600'
    },
    iconTheme: {
        secondary: '#2F0C29',
    },
}


export const QuizContext = createContext()

export const QuizProvider = ({ children }) => {


    const navigate = useNavigate()
    const [AILoading, setAILoading] = useState(false)

    const [questions, setQuestions] = useState([])

    const [AIForm, setAIForm] = useState({
        description: '',
        numQuestions: 1,
        dificulty: 1,
        fileDirectori: undefined,
        typeQuestion: 'MultipleChoice',
    })


    const [formQuizSave, setFormQuizSave] = useState({
        description: '',

        banner: undefined,
    })


    function changeValueForm(name, value) {
        setAIForm(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function changeValueFormQuizSave(name, value) {
        setFormQuizSave(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function hundleDrag(evt) {
        const { active, over } = evt
        setQuestions(previus => {
            const oldIndex = questions.findIndex(item => item.id === active.id)
            const newIndex = previus.findIndex(item => item.id === over.id)
            return arrayMove(previus, oldIndex, newIndex)
        })
    }


    function deleteQuestion(id) {
        setQuestions(previus => {
            return previus.filter((item) => item.id !== id)
        })
    }


    async function handleSubmit(apiKey) {

        if (AIForm.description.split(' ').length < 15) {
            toast.error('The topic description must have at least 15 words.', ToastStyle)
        }
        else {

            if (AIForm.typeQuestion === 'MultipleChoice') {

                setAILoading(true)
                const openai = createOpenAI({
                    apiKey // should ideally be loaded from external place such as env variable
                });
                const { partialObjectStream } = await streamObject({

                    model: openai('gpt-4o-mini'),
                    temperature: .5,
                    presencePenalty: 2,
                    frequency_penalty: -2,
                    // max_tokens: 1000,
                    schema: z.object({
                        quizTitle: z.string(),
                        quizDescription: z.string(),
                        promptForBanner: z.string(),
                        multipleChoiseQuestions: z.array(
                            z.object({
                                id: z.number(),
                                idOfTheCorrectAnswer: z.number(),
                                question: z.string(),
                                answers: z.array(
                                    z.object({
                                        id: z.number(),
                                        answer: z.string(),
                                    })
                                )
                            })
                        )
                    }),
                    messages: [
                        {
                            role: 'system',
                            content:
                                `
                            You are a quiz maker. Your task is to follow the next steps to create a quiz.

                            Step 1: First use the description of the topic to create the title of the quiz, the description of the quiz, and a prompt that will be used to create a banner for the quiz.
                            The description of the topic will be delimited by triple hashtags (###).

                            Step 2: Create 100 multiple choice questions that are linked to the description of the topic.

                            Step 3: Sort the group of question by the difficulty of each one, the difficulty of the questions is from 1 (the most easy ones) to 5 (The hardest ones).

                            Step 4: From the sorted group of questions, just keep the one that have a level ${AIForm.dificulty} of difficulty.

                            Step 5: From the previous group of questions, select ${AIForm.numQuestions}.

                            Step 6: For each question, create a correct answer.

                            Step 7: Then, for each question, create 3 more answers that will be not correct.

                            Step 8: Finally return to the user an object with the quizTitle, quizDescription, promptForBanner and an array of multipleChoiseQuestions, that content ${AIForm.numQuestions} objects with each question, the indexOfTheCorrectAnswer and an array with the answers.
                            
                            Note: The return must have the array of questions.
                            `
                        },
                        {
                            role: 'user',
                            content: `Create a quiz based on the following topic description ###${AIForm.description}###`
                        }
                    ]

                }).catch(() => {
                    toast.error('Your API key is not working.', ToastStyle)
                    setAILoading(false)
                })

                await navigate('/create/questions')

                let result = []

                for await (const partialObject of partialObjectStream) {
                    if (partialObject?.multipleChoiseQuestions) {
                        setQuestions(partialObject.multipleChoiseQuestions)
                        result = partialObject.multipleChoiseQuestions
                    }
                }

                if (result?.length === 0 || !result?.length) {
                    toast.error('AI did not made any question. Try again.', ToastStyle)
                    setAILoading(false)
                    navigate('/create')
                }
                else {
                    await toast.success('The questions were created.', ToastStyle)

                    await setQuestions(result.map((item) => {
                        item.type = 'MultipleChoice'
                        item.banner = undefined
                        return item
                    }))
                    setAILoading(false)
                }


            }

        }

    }

    function saveChanges(id, newQuestion) {
        setQuestions(previus => {
            return previus.map((item) => {
                if (item.id === id) {
                    return newQuestion
                }
                return item
            })
        })
        toast.success('The changes were saved', ToastStyle)
    }


    function addQuestion() {
        setQuestions(previus => {
            return [...previus, {
                id: Math.floor(Math.random() * 100000),
                idOfTheCorrectAnswer: 1,
                banner: undefined,
                type: 'MultipleChoice',
                question: 'This is a new question',
                answers: [
                    {
                        id: 1,
                        answer: 'Answer #1'
                    },
                    {
                        id: 2,
                        answer: 'Answer #2'
                    }
                ]
            }]
        })
        toast.success('The quiestion was added.', ToastStyle)
        // setState(true)
    }

    async function addAIQuestion(apiKey) {
        setAILoading(true)
        const openai = createOpenAI({
            apiKey // should ideally be loaded from external place such as env variable
        });
        const { object } = await generateObject({

            model: openai('gpt-4o-mini'),
            temperature: .5,
            presencePenalty: 2,
            frequency_penalty: -2,
            // max_tokens: 1000,
            schema: z.object({
                id: z.number(),
                idOfTheCorrectAnswer: z.number(),
                question: z.string(),
                answers: z.array(
                    z.object({
                        id: z.number(),
                        answer: z.string(),
                    })
                )
            }),
            messages: [
                {
                    role: 'system',
                    content:
                        `
                    You are a quiz maker. Your task is to follow the next steps to create a quiz.

                    Step 1: First use the description of the topic to create the title of the quiz, the description of the quiz, and a prompt that will be used to create a banner for the quiz.
                    The description of the topic will be delimited by triple hashtags (###).

                    Step 2: Create 100 multiple choice questions that are linked to the description of the topic.

                    Step 3: Sort the group of question by the difficulty of each one, the difficulty of the questions is from 1 (the most easy ones) to 5 (The hardest ones).

                    Step 4: From the sorted group of questions, just keep the one that have a level ${AIForm.dificulty} of difficulty.

                    Step 5: From the previous group of questions, select ${AIForm.numQuestions}.

                    Step 6: For each question, create a correct answer.

                    Step 7: Then, for each question, create 3 more answers that will be not correct.

                    Step 8: Finally return to the user an object with the quizTitle, quizDescription, promptForBanner and an array of multipleChoiseQuestions, that content ${AIForm.numQuestions} objects with each question, the indexOfTheCorrectAnswer and an array with the answers.
                    
                    Note: The return must have the array of questions.
                    `
                },
                {
                    role: 'user',
                    content: `Create a quiz based on the following topic description ###${AIForm.description}###`
                },
                {
                    role: "assistant",
                    content: JSON.stringify(questions)
                },
                {
                    role: "user",
                    content: 'Generate another question based on the given information.'
                }
            ]

        }).catch(() => {
            toast.error('Your API key is not working', ToastStyle)
            setAILoading(false)
        })
        object.id = Math.floor(Math.random() * 10000)
        object.type = 'MultipleChoice'
        object.banner = undefined
        setQuestions(previus => {
            return [
                ...previus,
                object
            ]
        })
        toast.success('The new AI question was added', ToastStyle)
        setAILoading(false)
    }

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
        <QuizContext.Provider value={{
            AIForm,
            changeValueForm,
            handleSubmit, questions,
            AILoading,
            hundleDrag,
            deleteQuestion,
            saveChanges,
            addQuestion,
            addAIQuestion,
            changeValueFormQuizSave
        }} >
            {children}
        </QuizContext.Provider>
    )
}
