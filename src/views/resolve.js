import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebasecom";
import emptyImg from '../img/Studying-pana.svg';
import arrow from '../img/arrow.png';

export function Resolve() {
    const params = useParams();
    const [quiz, setQuiz] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        (async () => {
            setLoading(true);
            const docRef = doc(db, 'quizzes', params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setQuiz(docSnap.data());
            }
            setLoading(false);
        })();
    }, [params.id]);

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers(prevState => ({
            ...prevState,
            [questionId]: answer
        }));
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log('Selected Answers:', selectedAnswers);
        // Further processing, e.g., saving the results
    };

    return (
        <>
            {loading ? (
                <div className="quiestionAndAsideCont">
                    <h2>Loading...</h2>
                    <figure className="loader2" />
                </div>
            ) : (
                <>
                    {/* {showResult && <div className="sureContainer">
                        <div className="flyBoxEdit BoxResult">
                            <h3>Result: </h3>
                            <div>
                                <button onClick={() => {
                                    setSelectedAnswers({})
                                }} className="SecundaryButton">Try again</button>
                            </div>
                        </div>
                    </div>} */}
                    {!quiz.questions ? (
                        <div className="Page404">
                            <img alt="The quiz was not found" src={emptyImg} />
                            <aside>
                                <h1>The quiz you are looking for was not found</h1>
                                <Link to='/tests' className="linkButton">Check the quizzes list</Link>
                            </aside>
                        </div>
                    ) : (
                        <>
                            <h1 className="pageInto">{quiz.title}💥</h1>
                            <div className="quiestionAndAsideCont">
                                <div>
                                    <img alt="Banner of the quiz" className="ResolveBanner" src={quiz.banner} />
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ left: '10px', top: '-35px' }} className="MoreInfo">
                                            <span>{quiz.questions.length} Qs</span>
                                            <span>{quiz.subject}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="quizDescription">{quiz.description} <span>By {quiz.creator}.</span></p>
                                <Link to='/tests' className="SecundaryButton"><img style={{ rotate: '180deg' }} src={arrow} alt="Back to the quizzes" />Back to the quizzes</Link>
                                <form onSubmit={handleSubmit} className="QuestionsContainer">
                                    {quiz.questions.map((question, index) => (
                                        <article key={question.id} className="Question">
                                            <div className='HorizontalSection'>
                                                <div>
                                                    <h3><span className="SpeColor">{index + 1}.</span> {question.question}</h3>
                                                    <h4>- Answer choices: </h4>
                                                    <ul className='listAnswers'>
                                                        {question.answers.map((ans) => (
                                                            <li key={ans.id || Math.random()}>
                                                                <input
                                                                    type="radio"
                                                                    name={ans.id} // Grouping radios per question
                                                                    id={`${ans.id}_${question.id}`}
                                                                    value={ans.answer} // Storing answer text
                                                                    checked={selectedAnswers[question.id] === ans.id}
                                                                    onChange={() => handleAnswerChange(question.id, ans.id)}
                                                                    required
                                                                />
                                                                <label htmlFor={`${ans.id}_${question.id}`}>{ans.answer}</label>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                {question.banner && (
                                                    <div className='ImageInputCont'>
                                                        <img src={question.banner} alt="Question banner" />
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                    <button className="linkButton" type="submit">Submit</button>
                                </form>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
}
