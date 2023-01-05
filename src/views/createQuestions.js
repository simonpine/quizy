import { LayoutForCreate } from "../components/LayoutForCreate"
import { ContextCreate } from "../context/createContext"
import { useNavigate } from 'react-router-dom'
import { Questions } from "../components/questions";
export function CreateQuestions() {
    const navigate = useNavigate();
    return (
        <LayoutForCreate selceted={2}>
            <ContextCreate.Consumer  >
                {({ questions, newQuestion, uploadQuizz }) => {
                    const submitHandle = () => {
                        newQuestion()
                    }
                    const submit = (evt) => {
                        evt.preventDefault()
                        uploadQuizz()
                        navigate(`/`)
                    }
                    return (
                        <form className="formAddQuestions" onSubmit={submit}>
                            <button type="button" className="link" onClick={submitHandle}>Add question</button>
                            <div className="questionsContiner">
                                {questions.map((que) => {
                                    return (
                                        <Questions idQuestion={que.id} que={que} />
                                    )
                                })}
                            </div>
                            <input   value='Save quiz' type="submit" className="link"/>
                        </form>
                    )
                }}
            </ContextCreate.Consumer>
        </LayoutForCreate>
    )
}