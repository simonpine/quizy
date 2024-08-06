import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { arrayMove } from "@dnd-kit/sortable";

import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebasecom";
import { doc, setDoc } from 'firebase/firestore';

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
        title: '',
        subject: 'mathematics',
        banner: undefined,
    })


    const [quizUploading, setQuizUploading] = useState(false)


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


                            Step 1: First use the description of the topic to create the title of the quiz and the description of the quiz.
                            The description of the topic will be delimited by triple hashtags (###).

                            Step 2: Create 100 multiple choice questions that are linked to the description of the topic.

                            Step 3: Sort the group of question by the difficulty of each one, the difficulty of the questions is from 1 (the most easy ones) to 5 (The hardest ones).

                            Step 4: From the sorted group of questions, just keep the one that have a difficulty level spesify by the user.
                            The difficulty level will be delimited by triple sum symbol (+++).

                            Step 5: From the previous group of questions, select the number of questions the user specify.
                            The number of questions will be delimited by triple quotation marks (''').

                            Step 6: For each question, create a correct answer.

                            Step 7: Then, for each question, create 3 more answers that will be not correct.

                            Step 8: Finally return to the user an object with the quizTitle, quizDescription and an array of multipleChoiseQuestions, that content ${AIForm.numQuestions} objects with each question, the indexOfTheCorrectAnswer and an array with the answers.
                            
                            Note: The return must have the array of questions.
                            `
                        },
                        {
                            role: 'user',
                            content: `Create a quiz based on the following topic description ###This quiz focuses on our Solar System, including planets, moons, and other celestial bodies. It also explores the broader universe, covering stars, galaxies, black holes, and the latest discoveries in astronomy.###, with the next number of questions '''10''', and with a dificulty level of +++5+++.`
                        },
                        {
                            role: 'assistant',
                            content: '[{"id":1,"idOfTheCorrectAnswer":2,"question":"What is the largest planet in our Solar System?","answers":[{"id":1,"answer":"Earth"},{"id":2,"answer":"Jupiter"},{"id":3,"answer":"Saturn"},{"id":4,"answer":"Mars"}],"type":"MultipleChoice"},{"id":2,"idOfTheCorrectAnswer":1,"question":"Which celestial body is known as the Red Planet?","answers":[{"id":1,"answer":"Mars"},{"id":2,"answer":"Venus"},{"id":3,"answer":"Mercury"},{"id":4,"answer":"Neptune"}],"type":"MultipleChoice"},{"id":3,"idOfTheCorrectAnswer":3,"question":"What force keeps the planets in orbit around the Sun?","answers":[{"id":1,"answer":"Friction"},{"id":2,"answer":"Magnetism"},{"id":3,"answer":"Gravity"},{"id":4,"answer":"Inertia"}],"type":"MultipleChoice"},{"id":4,"idOfTheCorrectAnswer":4,"question":"Which of the following is a gas giant?","answers":[{"id":1,"answer":"Earth"},{"id":2,"answer":"Mars"},{"id":3,"answer":"Pluto"},{"id":4,"answer":"Uranus"}],"type":"MultipleChoice"},{"id":5,"idOfTheCorrectAnswer":1,"question":"What is the name of our galaxy?","answers":[{"id":1,"answer":"Milky Way"},{"id":2,"answer":"Andromeda"},{"id":3,"answer":"Triangulum"},{"id":4,"answer":"Whirlpool"}],"type":"MultipleChoice"},{"id":6,"idOfTheCorrectAnswer":2,"question":"What type of star is our Sun classified as?","answers":[{"id":1,"answer":"Red Giant"},{"id":2,"answer":"Yellow Dwarf"},{"id":3,"answer":"Blue Supergiant"},{"id":4,"answer":"White Dwarf"}],"type":"MultipleChoice"},{"id":7,"idOfTheCorrectAnswer":3,"question":"Which planet has the most moons?","answers":[{"id":1,"answer":"Earth"},{"id":2,"answer":"Mars"},{"id":3,"answer":"Jupiter"},{"id":4,"answer":"Saturn"}],"type":"MultipleChoice"},{"id":8,"idOfTheCorrectAnswer":4,"question":"What phenomenon occurs when a massive star collapses under its own gravity?","answers":[{"id":1,"answer":"Supernova"},{"id":2,"answer":"Nova"},{"id":3,"answer":"Black Hole"},{"id":4,"answer":"All of the above"}],"type":"MultipleChoice"},{"id":9,"idOfTheCorrectAnswer":1,"question":"Who was the first person to walk on the Moon?","answers":[{"id":1,"answer":"Neil Armstrong"},{"id":2,"answer":"Buzz Aldrin"},{"id":3,"answer":"Yuri Gagarin"},{"id":4,"answer":"Michael Collins"}],"type":"MultipleChoice"},{"id":10,"idOfTheCorrectAnswer":3,"question":"What is dark matter thought to make up in the universe?","answers":[{"id":1,"answer":"10% of the universe"},{"id":2,"answer":"25% of the universe"},{"id":3,"answer":"27% of the universe"},{"id":4,"answer":"50% of the universe"}],"type":"MultipleChoice"}]'
                        },
                        {
                            role: 'user',
                            content: `Create a quiz based on the following topic description ###${AIForm.description}###, with the next number of questions '''${AIForm.numQuestions}''', and with a dificulty level of +++5+++.`
                        }
                    ]

                }).catch(() => {
                    toast.error('Your API key is not working.', ToastStyle)
                    setAILoading(false)
                })
                await setQuestions([])
                await navigate('/create/questions')

                let result = []

                for await (const partialObject of partialObjectStream) {
                    if (partialObject?.multipleChoiseQuestions) {
                        setFormQuizSave({
                            title: partialObject.quizTitle,
                            description: partialObject.quizDescription,
                            subject: 'mathematics',
                        })
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

                    Step 1: First use the description of the topic to create the title of the quiz and the description of the quiz.
                    The description of the topic will be delimited by triple hashtags (###).

                    Step 2: Create 100 multiple choice questions that are linked to the description of the topic.

                    Step 3: Sort the group of question by the difficulty of each one, the difficulty of the questions is from 1 (the most easy ones) to 5 (The hardest ones).

                    Step 4: From the sorted group of questions, just keep the one that have a difficulty level spesify by the user.
                    The difficulty level will be delimited by triple sum symbol (+++).

                    Step 5: From the previous group of questions, select the number of questions the user specify.
                    The number of questions will be delimited by triple quotation marks (''').

                    Step 6: For each question, create a correct answer.

                    Step 7: Then, for each question, create 3 more answers that will be not correct.

                    Step 8: Finally return to the user an object with the quizTitle, quizDescription and an array of multipleChoiseQuestions, that content ${AIForm.numQuestions} objects with each question, the indexOfTheCorrectAnswer and an array with the answers.
                    
                    Note: The return must have the array of questions.
                    `
                },
                {
                    role: 'user',
                    content: `Create a quiz based on the following topic description ###${AIForm.description}###, with the next number of questions '''${AIForm.numQuestions}''', and with a dificulty level of +++5+++.`
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

    async function uploadQuiz(userName) {
        setQuizUploading(true)
        const questionsToUpload = await Promise.all(
            questions.map(async (question) => {
                if (question.banner === undefined) return { ...question, banner: '' }

                const imageRef = ref(storage, `img/${btoa(((Math.random(0, (new Date()).getTime())).toString()).slice(0, -10))}`);
                const snapshot = await uploadBytes(imageRef, question.banner)
                const url = await getDownloadURL(snapshot.ref)
                return { ...question, banner: url }
            })
        ).catch(() => {
            toast.error('Cannot upload the images of the questions', ToastStyle)
            return questions
        })

        toast.success('The question were saved', ToastStyle)

        const imageRef = ref(storage, `img/${btoa(((Math.random(0, (new Date()).getTime())).toString()).slice(0, -10))}`);
        const snapshot = await uploadBytes(imageRef, formQuizSave.banner)
        const url = await getDownloadURL(snapshot.ref)

        const quizId = btoa(((Math.random(0, (new Date()).getTime())).toString()).slice(0, -10))

        const QuizToUpload = {
            ...formQuizSave,
            title: formQuizSave.title.toLowerCase(),
            id: quizId,
            banner: url,
            creator: userName,
            questions: questionsToUpload
        }

        // console.log(QuizToUpload)

        await setDoc(doc(db, "quizzes", quizId), QuizToUpload);
        navigate(`/tests/${quizId}`)


        toast.success('The quiz was uploaded', ToastStyle)
        setQuizUploading(false)


    }
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
            changeValueFormQuizSave,
            formQuizSave,
            quizUploading,
            uploadQuiz
        }} >
            {children}
        </QuizContext.Provider>
    )
}
