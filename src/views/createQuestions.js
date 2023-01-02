import { LayoutForCreate } from "../components/LayoutForCreate"
import { ContextCreate } from "../context/createContext"
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
export function CreateQuestions() {
    const navigate = useNavigate();
    const [arrayQuestions, setArrayQuestions] = useState([])
    return (
        <LayoutForCreate selceted={2}>
            <ContextCreate.Consumer  >
                {({ setQuestions }) => {
                    const submitHandle = (evt) => {
                        evt.preventDefault();
                        navigate(`/`)
                    }
                    return (
                        <div>
                            <button onClick={submitHandle} />
                        </div>
                    )
                }}
            </ContextCreate.Consumer>
        </LayoutForCreate>
    )
}