import { LayoutForCreate } from "../components/LayoutForCreate"
import { ContextCreate } from "../context/createContext"
// import { useState } from "react";
import { Questions } from "../components/questions";
export function CreateQuestions() {
    return (
        <LayoutForCreate selceted={2}>
            <ContextCreate.Consumer  >
                {({ questions, newQuestion }) => {
                    const submitHandle = () => {
                        newQuestion()
                    }
                    return (
                        <div>
                            <button className="link" onClick={submitHandle}>Add question</button>
                            <button className="link">Save quizz</button>
                            <div className="questionsContiner">
                                {questions.map((que) => {
                                    return (
                                        <Questions idQuestion={que.id} />
                                    )
                                })}
                            </div>
                        </div>
                    )
                }}
            </ContextCreate.Consumer>
        </LayoutForCreate>
    )
}