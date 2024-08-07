import { useState } from "react"
import { collection, addDoc, getFirestore } from "firebase/firestore";
export function Report() {
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [problem, setProblem] = useState('')
    const submit = (evt) => {
        evt.preventDefault();
        const newReport = {
            name,
            mail,
            problem,
        }
        const db = getFirestore()
        const reportColection = collection(db, 'reports')
        addDoc(reportColection, newReport)
        setName('')
        setMail('')
        setProblem('')
    }
    return (
        <form className="formReport" onSubmit={submit}>
            <div className="nameInputContine">
                <label htmlFor="name">Name:</label>
                <input required value={name} type="name" id="name" placeholder="Simon Pineda" onChange={(evt) => setName(evt.target.value)} />
            </div>
            <div className="mailInputContine">
                <label htmlFor="mail">Email:</label>
                <input required value={mail} type="mail" id="mail" placeholder="example123@gmail.com" onChange={(evt) => setMail(evt.target.value)} />
            </div>
            <div className="problemInputContine">
                <label htmlFor="problem">Problem:</label>
                <textarea placeholder="Report any problem of the platform" required value={problem} id="problem" onChange={(evt) => setProblem(evt.target.value)} />
                <button className="submitButton" type="submit">Submit</button>
            </div>
        </form>
    )
}