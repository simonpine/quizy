import { ContextCreate } from "../context/createContext"
import { Answers } from "./answer"
export function Questions({ idQuestion }) {
    return (
        <ContextCreate.Consumer  >
            {({ questions, addAnswer, deleteQuestion }) => {
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
                                <input placeholder="The question" className='questionTitel' type='text'></input>
                                <button className="addItem" onClick={() => { addAnswer(idQuestion) }} type='text'>Add answer</button>
                            </div>
                            <button className="x" onClick={() => { deleteQuestion(idQuestion) }} type='text'>X</button>
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