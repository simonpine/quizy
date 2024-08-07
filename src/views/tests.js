import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { Card } from "../components/card"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useDebounce } from "@uidotdev/usehooks";
import { db } from "../firebasecom";
import { query, where } from "firebase/firestore";

export function Tests() {
    const [searchFilters, setSearchFilters] = useState({
        name: '',
        subject: 'all',
    })
    const debouncedFilters = useDebounce(searchFilters, 300);



    const newFilter = (name, value) => {
        setSearchFilters(previous => {
            return { ...previous, [name]: value }
        })
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()
        setSearchFilters({
            name: '',
            subject: 'all',
        })
    }

    const [qizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            setLoading(true)
            const itemsColection = await collection(db, 'quizzes')

            const q = await debouncedFilters.subject === 'all' ? query(itemsColection, where('title', '>=', debouncedFilters.name), where('title', '<=', debouncedFilters.name + '\uf8ff')) : query(itemsColection, where('subject', '==', debouncedFilters.subject))

            await getDocs(q).then((snap) => {
                const prov = snap.docs.map((c) => {
                    return { ...c.data() }
                })
                setQuizzes(prov)
            })
            setLoading(false)
        })()
    }, [debouncedFilters])

    return (
        <>
            <div className="quiestionAndAsideCont">
                <h1 className="pageInto">Find some <span>Tests</span></h1>

                <div className="fullContentTests">
                    <form onSubmit={(evt)=> evt.preventDefault()} className="formForSearch">
                        <div>
                            <select value={searchFilters.subject} name="subject" onChange={(evt) => newFilter(evt.target.name, evt.target.value)}>
                                <option value="all">All subjects</option>
                                <optgroup label="Academic Subjects">
                                    <option value="mathematics">Mathematics</option>
                                    <option value="science">Science</option>
                                    <option value="history">History</option>
                                    <option value="geography">Geography</option>
                                    <option value="literature">Literature</option>
                                    <option value="language_arts">Language Arts</option>
                                    <option value="foreign_languages">Foreign Languages</option>
                                    <option value="art_music">Art and Music</option>
                                </optgroup>
                                <optgroup label="General Knowledge">
                                    <option value="current_events">Current Events</option>
                                    <option value="pop_culture">Pop Culture</option>
                                    <option value="sports">Sports</option>
                                    <option value="technology">Technology</option>
                                    <option value="food_cooking">Food and Cooking</option>
                                </optgroup>
                                <optgroup label="Specialized Topics">
                                    <option value="business_finance">Business and Finance</option>
                                    <option value="health_medicine">Health and Medicine</option>
                                    <option value="philosophy">Philosophy</option>
                                    <option value="religion_mythology">Religion and Mythology</option>
                                    <option value="psychology">Psychology</option>
                                </optgroup>
                                <optgroup label="Miscellaneous">
                                    <option value="trivia">Trivia</option>
                                    <option value="logic_puzzles">Logic and Puzzles</option>
                                    <option value="lifestyle_hobbies">Lifestyle and Hobbies</option>
                                </optgroup>
                            </select>
                        </div>
                        <input placeholder="The title of a quiz..." value={searchFilters.name} className="inputText" type="text" name="name" onChange={(evt) => newFilter(evt.target.name, evt.target.value)} />
                        <button onClick={handleSubmit} className="linkButton" type="button">Clear filters</button>
                    </form>
                    <div className="QuizzesContainer">
                        {loading ?
                            <figure className="loader2" />
                            :
                            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}>
                                <Masonry gutter={'15px'}>
                                    {qizzes.map((quiz) => {
                                        return <Card key={quiz.id} info={quiz} />
                                    })}
                                </Masonry>
                            </ResponsiveMasonry>
                        }
                    </div>


                </div>
            </div>
            {/* <div className="quizzesContainer">
                {loading && <div className="loadingContainer center" ><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}
                {qizzes.map((quiz) => {
                    return (
                        <Card key={quiz.id} title={quiz.title} theme={quiz.theme} img={quiz.urlImg} des={quiz.description} id={quiz.id} />
                    )
                })}
            </div> */}
        </>
    )
}