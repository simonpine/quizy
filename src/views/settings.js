import { UserContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom";
import emptyImg from '../img/Empty-pana.svg'
import moreInfo from '../img/interrogation.png'
import { Tooltip } from "react-tooltip";
import eye from '../img/eye.png'
import arrow from '../img/arrow.png'
import { Sure } from "../components/sure";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { db } from "../firebasecom";
import { query, where } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import { Card } from "../components/card";

const data = [{ name: 'Quiz 1', uv: 400 }, { name: 'Super Quiz', uv: 200 }, { name: 'News Quiz', uv: 100 }, { name: 'Animals', uv: 10 }];

export function Settings() {
    const { logout, isthere, user, apiLoading, apiSave } = useContext(UserContext);
    const [show, setShow] = useState('password');

    const [verify, setVerify] = useState(false);
    const [apiKey, setApiKey] = useState('');

    const [yourQuizzes, setYourQuizzes] = useState([])

    useEffect(() => {
        async function getQuizzes() {
            const collectionRef = await collection(db, "quizzes");
            const q = await query(collectionRef, where('creator', '==', user.name));
            const data = await getDocs(q);
            const result = data.docs.map(item => { return { ...item.data() } })
            setYourQuizzes(result)
        }
        user && getQuizzes()
    }, [user])

    useEffect(() => {
        setApiKey(user?.apikey ?? '')
    }, [user])

    return (
        <>
            <Sure state={verify} setState={setVerify} msg={'Are you sure you want to log out?'} func={logout} />
            <Tooltip style={{ backgroundColor: "#F9604E", zIndex: 10, fontSize: '1.5rem', color: '#2F0C29', fontWeight: '500' }} anchorSelect="#FileInfo" place="top">
                This OpenAi API key will be use in the creation of <br /> quizzes, and to evaluate you in open questions.
            </Tooltip>
            <Tooltip style={{ backgroundColor: "#F9604E", zIndex: 10, fontSize: '1.5rem', color: '#2F0C29', fontWeight: '500' }} anchorSelect="#ChartInfo" place="top">
                The following chart show the answered <br />quizzes with your percentage of success.
            </Tooltip>
            {
                !isthere ?
                    <section>
                        <h1 className="pageInto">Welcome <span>{user?.name ? user.name : 'Loading'}</span></h1 >
                        <div className="SectionSidebySide dashboarSecction" >
                            <div className="aside position-sticky">
                                <section className="userSettingCont">
                                    <div>
                                        <label>User info:</label>
                                        <figure className="FileInput user" ><img src={user?.imageUrl} alt={user?.email + " user google icon"} /> <span>{user?.email}</span></figure>

                                    </div>
                                    <form onSubmit={apiSave}>
                                        <label htmlFor="ApiKeyInput">API key: </label>
                                        <div className="ApiKeyEdit">
                                            <div>
                                                <button disabled={apiLoading || apiKey === user?.apikey} className="linkButton" type="submit">{!apiLoading ? 'Save' : <figure className="loader" />}</button>
                                                <input disabled={apiLoading} id="ApiKeyInput" name="ApiKeyInput" onChange={(e) => setApiKey(e.target.value)} value={apiKey} placeholder="sk-ea31fc9a-5ab6-4549-ba31-4b8d8ff3de02" className="inputText" type={show} />
                                                <button className="eye" onClick={() => show === 'text' ? setShow('password') : setShow('text')} type='button'><img alt="Eye to change visibility of the ApiKey" src={eye} /></button>

                                            </div>
                                            <img id="FileInfo" className="info" src={moreInfo} alt="More informtation icon" />
                                        </div>
                                    </form>
                                    <button className="SecundaryButton" onClick={() => setVerify(true)}>Log out  <img alt="Arrow to indicate the page change" src={arrow} /></button>
                                </section>
                                <section className="ChartFullCont">
                                    <label>
                                        <img id="ChartInfo" className="info" src={moreInfo} alt="More informtation icon" />

                                        Response stadistics:
                                    </label>

                                    <div className="chartCont">
                                        <ResponsiveContainer width={'100%'} height="100%">
                                            <LineChart data={data}>
                                                <Line type="monotone" dataKey="uv" stroke="#ff755d" />
                                                <CartesianGrid stroke="#B95CA7" strokeWidth={'1px'} strokeDasharray="5 5" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </section>
                            </div>
                            <figure className="separation" />
                            <section className="MaxWigth">
                                <label>Your quizzes:</label>
                                {yourQuizzes.length === 0 ?
                                    <div className="Empty">
                                        <img src={emptyImg} alt="Person looking empty boxes" />
                                        <p>You have no quizzes, to display the stats of your quizzes create some.</p>
                                        <Link className="linkButton" to='/create'>Create your first quiz</Link>
                                    </div>
                                    :
                                    <div className="YourQuizzesCont">
                                        {yourQuizzes.map(quiz => {
                                            return (
                                                <Card key={quiz.id} info={quiz} />
                                            )
                                        })}
                                    </div>
                                }
                            </section>
                        </div>
                    </section>
                    :
                    <Navigate to='/' />
            }
        </>

    )
}