import { ResolveAnswers } from "./resolveAnswers"
export function ResolveQuestion({ setMat, question, answers }) {
    const newMatch = (newWord) =>{
        if(newWord === question.answer){
            setMat(question.id, true)
        }
        else{
            setMat(question.id, false)
        }
    }
    return (
        <div className="questionResolve">
            <h2 className="questionText">{question.question}</h2>
            {
                answers.map((answer) => {
                    return (
                        <ResolveAnswers key={answer.id} questionId={question.id} ans={answer} newMatch={newMatch} />
                    )
                })
            }
        </div>
    )
}