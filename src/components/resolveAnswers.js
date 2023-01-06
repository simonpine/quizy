import { useState, useEffect } from "react"
export function ResolveAnswers({ ans, questionId, newMatch }) {

    return (
        <div className="ans">
            <input onClick={()=>{newMatch(ans.answer)}} required type="radio" id={ans.id} name={questionId} />
            <label htmlFor={ans.id}>{ans.answer}</label>
        </div>
    )
}