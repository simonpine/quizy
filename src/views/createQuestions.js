import { LayoutForCreate } from "../components/LayoutForCreate"
import { ContextCreate } from "../context/createContext"
import { useNavigate } from 'react-router-dom'
import { Questions } from "../components/questions";
import { QuizContext } from "../context/createContext"
import { useContext } from "react";

export function CreateQuestions() {
    const navigate = useNavigate();
    const { setQuiz, quiz } = useContext(QuizContext)
    return (
        // <LayoutForCreate selceted={2}>
        //     <ContextCreate.Consumer  >
        //         {({ questions, newQuestion, uploadQuizz }) => {
        //             const submitHandle = () => {
        //                 newQuestion()
        //             }
        //             const submit = (evt) => {
        //                 evt.preventDefault()
        //                 uploadQuizz().then((a) => navigate(`/tests/${a}`))
        //             }
        //             return (
        //                 <form className="formAddQuestions" onSubmit={submit}>
        //                     <button type="button" className="link" onClick={submitHandle}>Add question</button>
        //                     <div className="questionsContiner">
        //                         {questions.map((que) => {
        //                             return (
        //                                 <Questions key={que.id} idQuestion={que.id} que={que} />
        //                             )
        //                         })}
        //                     </div>
        //                     <input   value='Save quiz' type="submit" className="link"/>
        //                 </form>
        //             )
        //         }}
        //     </ContextCreate.Consumer>
        // </LayoutForCreate>

            <h1 onClick={() => setQuiz("quiz")}>Hola</h1>


    )
}