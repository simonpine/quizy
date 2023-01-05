import { Layout } from "../components/layout"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import folder from '../img/folder.png'
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { Card } from "../components/card"
export function Tests() {
    const navigate = useNavigate();
    const [code, setCode] = useState('')
    const newCode = (evt) => {
        setCode(evt.target.value)
        setCode(evt.target.value.replace(' ', ''))
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (code !== '') {
            navigate(`/tests/${code}`)
        }
    }

    const [qizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const db = getFirestore()
        const itemsColection = collection(db, 'quizzes')
        getDocs(itemsColection).then((snap) => {
            const prov = []
            const pro = snap.docs.map((c) => {
                let a = { ...c.data(), id: c.id, }
                prov.push(a)
            })
            setQuizzes(prov)
        }).then((data) => setLoading(!!data))
    }, [])

    return (
        <Layout>
            <form className="codeForm" onSubmit={handleSubmit}>
                <div>
                    <h1 className="subtitleHome">Find a specific quiz</h1>
                    <p className="pHome">Enter the code to find and resolve a specific quiz, the result will be private</p>
                    <input className="inputCode" placeholder="n851PMAfkaBVfVNSx8Zg" type='text' value={code} onChange={newCode} />
                    <button className="link" type="submit">Find the test</button>
                </div>
                <img className="folerImg" src={folder} />
            </form>
            <div className="quizzesContainer">
                {loading && <div className="loadingContainer center" ><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}
                {qizzes.map((quiz) => {
                    return (
                        <Card title={quiz.title} theme={quiz.theme} img={quiz.urlImg} des={quiz.description} id={quiz.id}/>
                    )
                })}
            </div>
        </Layout>
    )
}