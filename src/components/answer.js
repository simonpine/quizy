import { ContextCreate } from "../context/createContext"
export function Answers({ idQuestion, ans }) {
    return (
        <ContextCreate.Consumer  >
            {({ deleteAnswer, setAns, setAnsFinal }) => {
                return (
                    <div>
                        <input required onClick={() => setAnsFinal(idQuestion, ans.answer)} value={ans.answer} name={idQuestion} type='radio'></input>
                        <input required id={idQuestion + ans} value={ans.answer} onChange={(evt) => setAns(idQuestion, ans.id, evt.target.value)} className="answerInput" placeholder="Answer" type='text'></input>
                        <button className="x2" onClick={() => { deleteAnswer(idQuestion, ans.id) }}>X</button>
                    </div>
                )
            }}
        </ContextCreate.Consumer>
    )
}