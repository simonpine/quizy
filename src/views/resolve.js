import { useParams, Link } from "react-router-dom";
import { Layout } from "../components/layout";
import { doc, getFirestore, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react";
import wrong from '../img/wrong.png'
export function Resolve() {

    const params = useParams()
    const [quiz, setQuiz] = useState({})
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
            if (snap.exists()) {
                setQuiz({ ...snap.data(), id: snap.id, })
            }
        }).then((data) => setLoading(!!data))
    }, [])

    return (
        <Layout>
            {loading && <div className="loadingContainer2 center" ><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}
            {exis ?
                <section className="orderDetail">
                    <h1>{quiz.id}</h1>
                </section>
                :
                <div className='center center2'>
                    <div className='sectionerror'>
                        <img src={wrong} alt="SimonPine logo" className='folerImg' />
                        <div className='textContentHome2 textcont'>
                            <h1 className="subtitleHome2">The test you are looking for don't exist</h1>
                            <p className='pHome'>You can create it if you want, but remember that The quizzes you create cannot be modified, or resolve other one of the 'tests' section. </p>
                            <Link
                                to={{pathname: "/test",}}
                                className="link">Return to tests</Link>
                        </div>
                    </div>
                </div>
            }
        </Layout>
    )
}