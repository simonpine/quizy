import { Link } from 'react-router-dom'
import { QuizContext } from "../context/createContext"
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { Question } from "../components/question";
import { Tooltip } from "react-tooltip";
import plusImg from '../img/plus-small.png'
import arrow from '../img/arrow.png'
import { closestCenter, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import moreInfo from '../img/interrogation.png'
import testImage from '../img/tests.svg'
import { PublishSecction } from '../components/publishSection';


export function CreateQuestions() {
    const { questions, AILoading, hundleDrag, addQuestion, addAIQuestion } = useContext(QuizContext)
    const { user } = useContext(UserContext)
    const [publish, setPulish] = useState(false)

    return (
        <>
            <PublishSecction setState={setPulish} state={publish} />
            {!user?.apikey &&
                <Tooltip style={{ backgroundColor: "#F9604E", zIndex: 10, fontSize: '1.5rem', color: '#2F0C29', fontWeight: '500' }} clickable anchorSelect="#GenerateByAi" place="left">
                    You must be logged in and have an <br /> API key to use this feature.
                </Tooltip>
            }
            <Tooltip style={{ backgroundColor: "#F9604E", zIndex: 10, fontSize: '1.5rem', color: '#2F0C29', fontWeight: '500' }} clickable anchorSelect="#AIInfo" place="top">
                You must be loged in to access to the AI tools.
            </Tooltip>
            <h1 className="pageInto">Create the <span>Questions</span></h1>
            <br />
            <div className="quiestionAndAsideCont">
                <section className="quizesCont">
                    <div className="FunctionsQuiestions">
                        {user ? <Link className="SecundaryButton" to='/create'><img alt="Return to the previus section" style={{ rotate: '180deg' }} src={arrow} />Return to AI generator</Link> : <img style={{ marginLeft: '0px' }} className="info" alt="Show more information" src={moreInfo} id="AIInfo" />
                        }
                        <div>
                            {questions.length === 0 ?
                                <button onClick={addQuestion} disabled={AILoading} className="SecundaryButton">Add first question <img alt="Add another question" src={plusImg} /></button>
                                :
                                <button onClick={()=>setPulish(true)} disabled={questions.length === 0 || AILoading} className="linkButton">Publish quiz</button>
                            }
                        </div>

                    </div>

                    {questions.length !== 0 ?
                        <div className="QuestionsContainer">
                            <DndContext collisionDetection={closestCenter} onDragEnd={hundleDrag}>
                                <SortableContext items={questions} strategy={verticalListSortingStrategy} >
                                    {questions.map((question) => {
                                        return (
                                            <Question key={question?.id ? question?.id : Math.random()} info={question} />
                                        )
                                    })}
                                </SortableContext>
                            </DndContext>
                            <div className='buttonEnd'>
                                <h2>Number of questions: {questions.length}</h2>
                                <div className='AddGap'>
                                    {(user?.apikey || questions.length === 0) &&
                                        <button onClick={() => addAIQuestion(user?.apikey)} disabled={AILoading} className="SecundaryButton"> {AILoading ? <figure className="loader" /> : <>Generate question <span>AI</span></>}</button>
                                    }
                                    <button onClick={addQuestion} disabled={AILoading} className="SecundaryButton">Add question <img alt="Add another question" src={plusImg} /></button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="NoQuizzesSection">
                            {!AILoading &&
                                <>
                                    <img className='ImageAsBanner' src={testImage} alt='Start your quiz creating the first question' />
                                    <div>
                                        <p>Start your quiz creating the first question</p>
                                    </div>
                                </>
                            }
                        </div>
                    }
                </section>
            </div>
        </>


    )
}