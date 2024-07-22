import { useParams, Link } from "react-router-dom";
import { Layout } from "../components/layout";
import { doc, getFirestore, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react";
import { ResolveQuestion } from "../components/resolveQuestion";
import wrong from '../img/wrong.png'
export function Resolve() {
    const [result, setResult] = useState(1)
    const [display, setDisplay] = useState({
        display: 'none',
    })
    const params = useParams()
    const [quiz, setQuiz] = useState({})
    const [matchQuestions, setMatchQuestions] = useState([])
    const [img, setImg] = useState('')
    const [loading, setLoading] = useState(true)
    const [exis, setExis] = useState(false)
    useEffect(() => {
        const db = getFirestore()
        const itemUse = doc(db, 'quizzes', `${params.id}`)
        getDoc(itemUse).then((snap) => {
            if (snap.exists()) {
                setExis(true)
                return (snap)
            }
            else {
                setLoading(false)
            }
        }).then((snap) => {
            if (snap) {
                setQuiz({ ...snap.data(), id: snap.id, })
                if (snap.data().urlImg !== '') {
                    setImg(snap.data().urlImg)
                }
                else {
                    setImg(`https://source.unsplash.com/300x300/?${snap.data().theme}`)
                }
            }
        }).then((data) => setLoading(!!data))
    }, [params])
    const setMat = (idQuestion, newValue) => {
        setDisplay({
            display: 'none',
        })
        let ex = true
        for (var i = 0; i < matchQuestions.length; i++) {
            if (matchQuestions[i].id === idQuestion) {
                matchQuestions[i].match = newValue
                ex = false
            }
        }
        if (ex) {
            const newit = {
                id: idQuestion,
                match: newValue,
            }
            setMatchQuestions([...matchQuestions, newit])
        }
    }
    const hundleSubmit = (evt) =>{
        evt.preventDefault();
        setDisplay({
            display: '',
        })
        const one = quiz.questions.length
        let two = 0
        for(let element of matchQuestions){
            if(element.match){
                two += 1
            }
        }
        setResult(`${two} / ${one}`)
    }
    return (
        <Layout>
            {loading && <div className="loadingContainer2 center" ><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}
            {exis ?
                <section>
                    <div className='sectionHome create'>
                        <div className='textContentHome'>
                            <h2 className='subtitleHome'>{quiz.title}</h2>
                            <p className='pHome'>{quiz.description}</p>
                            <h3 className="quizCode"><span>By:</span> {quiz.creator}</h3>
                            <h3 className="quizCode"><span>Quiz code:</span> {quiz.id}</h3>
                        </div>
                        <div className='imgResolveContainer'>
                            <img className="imgResolve" alt={quiz.theme} src={img} />
                        </div>
                    </div>
                    <form onSubmit={hundleSubmit}>
                        <div className="questionResolveContainer">
                            {quiz.questions.map((qui) => {
                                return (
                                    <ResolveQuestion key={qui.id} setMat={setMat} question={qui} answers={qui.answers} />
                                )
                            })}
                        </div>
                        <button type="submit" className="link">See result</button>
                        <div style={display} className="resultCont">
                            <h3 className="result" >{result}</h3>
                            <Link
                                to={{ pathname: "/tests", }}
                                className="link">Resolve more  tests</Link>
                        </div>
                    </form>
                </section>
                :
                <div className='center center2'>
                    <div className='sectionerror'>
                        <img src={wrong} alt="SimonPine logo" className='folerImg' />
                        <div className='textContentHome2 textcont'>
                            <h1 className="subtitleHome2">The test you are looking for don't exist</h1>
                            <p className='pHome'>You can create it if you want, but remember that The quizzes you create cannot be modified, or resolve other one of the 'tests' section. </p>
                            <Link
                                to={{ pathname: "/tests", }}
                                className="link">Return to tests</Link>
                        </div>
                    </div>
                </div>
            }
        </Layout>
    )
}