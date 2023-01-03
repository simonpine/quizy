import { ContextCreate } from "../context/createContext"
export function Answers({idQuestion, ans}) {
    return (
            <ContextCreate.Consumer  >
                {({ questions, deleteAnswer,  }) => {
                    return (
                        <div>
                            <input name={idQuestion} type='radio'></input>   
                            <input value={ans.answer} onChange={(evt)=>{ ans.answer = evt.target.value }} className="answerInput" placeholder="Answer" type='text'></input>
                            <button className="x2" onClick={()=>{deleteAnswer(idQuestion, ans.id)}}>X</button>                
                        </div>
                    )
                }}
            </ContextCreate.Consumer>
    )
}