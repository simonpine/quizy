import { ContextCreate } from "../context/createContext"
import { Answers } from "./answer"
export function Questions({ idQuestion, que }) {
    return (
        <ContextCreate.Consumer  >
            {({ questions, addAnswer, deleteQuestion, setQuestion }) => {
                let an = []
                questions.forEach(element => {
                    if (element.id === idQuestion) {
                        an = element.answers
                    }
                });

                return (
                    <div className="question">
                        <div className="questionTop">
                            <div className="firstContainer">
                                <input id={"q" + idQuestion} required value={que.question} onChange={(evt) => setQuestion(idQuestion, evt.target.value)} placeholder="The question" className='questionTitel' type='text'></input>
                                <button className="addItem" onClick={() => { addAnswer(idQuestion) }} type='text'>Add answer</button>
                            </div>
                            <button className="x" onClick={() => { deleteQuestion(idQuestion) }}>X</button>
                        </div>
                        <div>
                            {an.map((anse) => {
                                return (
                                    <Answers idQuestion={idQuestion} ans={anse} />
                                )
                            })
                            }
                        </div>
                    </div>
                )
            }}
        </ContextCreate.Consumer>
    )
}