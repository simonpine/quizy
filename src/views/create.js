import { useContext, useState } from "react"
import { QuizContext } from "../context/createContext"
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import four from '../img/4.jpg'
import tape from '../img/tape1.png'
import tape2 from '../img/tape2.png'
import { Link } from "react-router-dom";
import arrow from '../img/arrow.png'
import smile from '../img/smile.png'
import angry from '../img/angry.png'
import { Tooltip } from 'react-tooltip'
import clip from '../img/clip.png'
import moreInfo from '../img/interrogation.png'
import documentImg from '../img/document.png'
import { Sure } from "../components/sure";

export function Create() {
    const { AIForm, changeValueForm, handleSubmit, questions, AILoading } = useContext(QuizContext);
    const { isthere, user } = useContext(UserContext);
    const { description, numQuestions, dificulty, fileDirectori, typeQuestion } = AIForm
    const [ deleteCurrent, setDeleteCurrent ] = useState(false)

    return isthere ? (
        <Navigate to='/create/questions' />
    )
        :
        (
            <>
                <Sure msg={'If you generate new questions, the old ones will be delete.'} func={handleSubmit} setState={setDeleteCurrent} state={deleteCurrent} extraInfo={[user?.apikey]} />
                {!user?.apikey &&
                    <Tooltip style={{ backgroundColor: "#F9604E", zIndex: 10 }} clickable anchorSelect="#Generate" place="top">
                        <Link className="ApiKeyNeeded" to='/settings'>Add an API key <img alt="Arrow to indicate the page change" src={arrow} /></Link>
                    </Tooltip>
                }
                {/* <Tooltip style={{ backgroundColor: "#F9604E", zIndex: 10, fontSize: '1.5rem', color: '#2F0C29', fontWeight: '500' }} clickable anchorSelect="#FileInfo" place="top">
                    The information of the PDF will be a guide <br /> for the creation of the quiestions
                </Tooltip> */}
                <Tooltip style={{ backgroundColor: "#F9604E", zIndex: 10, fontSize: '1.5rem', color: '#2F0C29', fontWeight: '500' }} clickable anchorSelect="#FileInfo" place="top">
                    This feature is currently not available.
                </Tooltip>
                <div className="SectionSidebySide">
                    <aside className="AsideForm">
                        <h1>
                            Create quizzes with <span>AI</span>
                        </h1>
                        <form onSubmit={e => {
                            e.preventDefault()
                            if (questions.length === 0) return handleSubmit(user.apikey)
                            else return setDeleteCurrent(true)
                        }} className="formContFullInfo" >

                            <div className="twoColumnsFormSection">
                                <div>
                                    <label>File guide: </label>
                                    <div className="fileCont">
                                        {/* <input  type="file" id="fileDirectori" name="fileDirectori" onChange={(e) => changeValueForm(e.target.name, URL.createObjectURL(e.target.files[0]))} /> */}
                                        <div className="divInFileCont">
                                            <input disabled accept="application/pdf" style={{ display: 'none' }} type="file" id="fileDirectori" name="fileDirectori" onChange={(e) => changeValueForm(e.target.name, e.target.files[0])} />
                                            <label style={{ opacity: .7, cursor: 'auto' }} className="FileInput" htmlFor='fileDirectori'><img src={fileDirectori ? documentImg : clip} alt="Clip for the file selection" /> <span>{fileDirectori ? fileDirectori.name : 'Select a PDF'}</span></label>
                                            {fileDirectori && <button className="deleteButton" onClick={() => changeValueForm('fileDirectori', undefined)}>X</button>}

                                        </div>
                                        <img id="FileInfo" src={moreInfo} alt="More informtation icon" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="typeQuestion"><span>*</span> Type of questions: </label>
                                    <select onChange={(e) => changeValueForm(e.target.name, e.target.value)} value={typeQuestion} id="typeQuestion" name="typeQuestion">
                                        <option value="MultipleChoice">Multiple choice</option>
                                        <option disabled value="Open">Open</option>
                                        <option disabled value="Both">Both</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="descriptionAI">Describe the topic:</label>
                                <textarea placeholder="This quiz focuses on our Solar System, including planets, moons, and other celestial bodies. It also explores the broader universe, covering stars, galaxies, black holes, and the latest discoveries in astronomy." id="descriptionAI" value={description} name="description" onChange={(e) => changeValueForm(e.target.name, e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="NumQuestions" ><span>*</span> Number (#) of questions:</label>
                                <div className="InputNumberAndRange">

                                    <input id="NumQuestions" value={numQuestions} min={1} max={10} type='number' name="numQuestions" onChange={(e) => changeValueForm(e.target.name, e.target.value)} />
                                    <input className="slider" id="NumQuestions2" value={numQuestions} min={1} max={10} type="range" name="numQuestions" onChange={(e) => changeValueForm(e.target.name, e.target.value)} />

                                </div>
                            </div>

                            <div>
                                <label htmlFor="Dificulty" ><span>*</span> Difficulty of the questions (1 - 5):</label>
                                <div className="InputNumberAndRange">
                                    <input id="Dificulty" value={dificulty} min={1} max={5} type='number' name="dificulty" onChange={(e) => changeValueForm(e.target.name, e.target.value)} />
                                    <div>
                                        <div className="dificultLable">
                                            <h3> <img src={smile} alt="Smile that represent the easy questions" /> Easy</h3>
                                            <h3 className="angry"><img src={angry} alt="Smile that represent the hard questions" /> Hard</h3>
                                        </div>
                                        <input className="slider" id="Dificulty2" value={dificulty} min={1} max={5} type="range" name="dificulty" onChange={(e) => changeValueForm(e.target.name, e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="buttonsCont">
                                <button
                                    id="Generate"
                                    disabled={!user?.apikey || AILoading}
                                    className="linkButton" type="submit">Generate Questions
                                </button>
                                <Link className="SecundaryButton" to='/create/questions'>Continue without AI <img src={arrow} alt="Arrow to indicate the page change" /></Link>
                            </div>
                        </form>
                    </aside>
                    <aside className="CreateImageCont">
                        <div style={{ transform: 'rotate(10deg)' }} className='borderImgs imageOfcolage'>
                            <img className={'tapeTop tapeFull'} src={tape2} alt='Tape ilustration to show that the polaroid in stiked' />
                            <img className={'tapeBellow tapeFull'} src={tape} alt='Tape ilustration to show that the polaroid in stiked' />
                            <img className={`PhotoToCreate ${user?.apikey && 'PhotoToCreateWorking'}`} src={four} alt='Camping at the forest' />
                            <p>12/05/20</p>
                            <span>{user?.apikey ? 'Start creating now' : 'Please add an Api key'}</span>
                        </div>
                    </aside>
                </div>
            </>
        )
}