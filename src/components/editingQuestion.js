import { useClickAway } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useKey } from "react-use";
import moreInfo from '../img/interrogation.png'
import { Tooltip } from 'react-tooltip'
import plusImg from '../img/plus-small.png'
import trash from '../img/trash.png'
import { useContext } from "react";
import { QuizContext } from "../context/createContext";


export function EditingQuestion({ info, setState, state }) {

    const {saveChanges} = useContext(QuizContext)

    const ref = useClickAway(() => {
        setCurrentInfo(info)
        setState(false)
    });

    useKey('Escape', () => {
        setCurrentInfo(info)
        setState(false)
    })


    const [currentInfo, setCurrentInfo] = useState(info)

    useEffect(() => {
        setCurrentInfo(info)
    }, [info])

    return (
        state === true &&
        <>
            <Tooltip style={{ backgroundColor: "#F9604E", zIndex: 11, fontSize: '1.5rem', color: '#2F0C29', fontWeight: '500' }} clickable anchorSelect="#AnswersInfo" place="top">
                The selected answer will be the correct one.
            </Tooltip>
            {currentInfo?.banner !== undefined &&
                <Tooltip style={{ backgroundColor: "#F9604E", zIndex: 11, fontSize: '1.5rem', color: '#2F0C29', fontWeight: '500' }} clickable anchorSelect=".imageChanger" place="top">
                    Delete que image.
                </Tooltip>
            }
            <div className="sureContainer">
                <div key={currentInfo?.id ? currentInfo?.id : Math.random()} ref={ref} className="flyBoxEdit">
                    <h2>Edit your question: </h2>
                    <form onSubmit={(evt)=>{
                        evt.preventDefault()
                        saveChanges(currentInfo.id, currentInfo)
                        setState(false)
                    }} className="FormForEdit">
                        <div className="formFields">
                            <div className="InputWriteFields">
                                <div>
                                    <label>Question: </label>
                                    <textarea onChange={(evt) => {
                                        setCurrentInfo(previus => {
                                            return {
                                                ...previus,
                                                question: evt.target.value
                                            }
                                        })
                                    }} required className="inputText" type="text" value={currentInfo?.question} />
                                </div>
                                <div>

                                    <label><img style={{ marginLeft: '0px' }} className="info" alt="Show more information" src={moreInfo} id="AnswersInfo" />Answers: </label>
                                    <div className="AnswersConts">
                                        {currentInfo?.answers &&
                                            currentInfo?.answers.map(ans => {
                                                return (

                                                    <div className="AnswerCont" key={ans?.id ? ans?.id + 'Answer' : Math.random}>
                                                        <input onChange={event => setCurrentInfo(previus => { return { ...previus, idOfTheCorrectAnswer: Number(event.target.value) } })} required type="radio" id={ans?.id} name="correctAnswer" value={ans?.id} checked={ans?.id === currentInfo?.idOfTheCorrectAnswer} />
                                                        <input required className="inputAnswer" value={ans?.answer} onChange={(evt) => {
                                                            setCurrentInfo(previus => {
                                                                const newAnswers = previus.answers.map(item => {
                                                                    if (item.id === ans?.id) {
                                                                        return {
                                                                            ...item,
                                                                            answer: evt.target.value
                                                                        }
                                                                    }
                                                                    return item
                                                                })
                                                                return {
                                                                    ...previus,
                                                                    answers: newAnswers
                                                                }
                                                            })
                                                        }} type="text" />

                                                        <button type="button" disabled={currentInfo.answers.length < 3} className="IconButtonDeleteSmall" onClick={() => {
                                                            setCurrentInfo(previus => {
                                                                return {
                                                                    ...previus,
                                                                    answers: previus.answers.filter(item => item.id !== ans.id)
                                                                }
                                                            })
                                                        }}><img src={trash} alt="Delete current answer" /></button>
                                                    </div>

                                                )
                                            })

                                        }
                                        <button onClick={() => setCurrentInfo(previus => {
                                            return {
                                                ...previus,
                                                answers: [...previus.answers, {
                                                    id: Math.random() * 1000,
                                                    answer: ''
                                                }]
                                            }
                                        })} type="button" className="AddAnswer"><img src={plusImg} alt="Add an answer" />Add answer</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {/* <label htmlFor="ImageQuestionInput" className="imageChanger">{currentInfo.banner !== undefined ? <img alt="Banner of the question" src={URL.createObjectURL(currentInfo.banner)} /> : 'Add an image'}</label> */}

                                {currentInfo.banner !== undefined ?
                                    <button id='DeleteImage' onClick={() => setCurrentInfo(previus => {
                                        return {
                                            ...previus,
                                            banner: undefined
                                        }
                                    })} type="button" className="imageChanger"><img alt="Banner of the question" src={URL.createObjectURL(currentInfo.banner)} /></button>
                                    :
                                    <label htmlFor="ImageQuestionInput" className="imageChanger">Add an image</label>


                                }
                                <input style={{ display: "none" }} id="ImageQuestionInput" name="ImageQuestionInput" onChange={(evt) => setCurrentInfo(previus => {
                                    return {
                                        ...previus,
                                        banner: evt.target.files[0]
                                    }
                                })} type="file" accept="image/png, image/jpeg" />
                            </div>
                        </div>
                        <div className="buttonEnd">
                            <button type="button" onClick={() => {
                                setCurrentInfo(info)
                                setState(false)
                            }} className="SecundaryButton">Cancel</button>

                            <button type="submit" disabled={JSON.stringify(info) === JSON.stringify(currentInfo)} className="linkButton">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </>

        // :
        // <></>
    )

}