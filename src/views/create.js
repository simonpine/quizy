import { useContext } from "react"
import { QuizContext } from "../context/createContext"
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import four from '../img/4.jpg'
import tape from '../img/tape1.png'
import tape2 from '../img/tape2.png'
import { Link } from "react-router-dom";
import arrow from '../img/arrow.png'
export function Create() {
    const { AIForm, changeValueForm, handleSubmit } = useContext(QuizContext);
    const { isthere, user } = useContext(UserContext);
    const { description, numQuestions, dificulty, fileDirectori } = AIForm
    return isthere ? (
        <Navigate to='/create/questions' />
    )
        :
        (
            <div className="SectionSidebySide">
                <aside className="AsideForm">
                    <h1 className="">
                        Create quizes with <span>AI</span>
                    </h1>
                    <form onSubmit={handleSubmit} className="formContFullInfo" >
                        <div>
                            <input type="file" name="fileDirectori" onChange={(e) => changeValueForm(e.target.name, URL.createObjectURL(e.target.files[0]))} />
                        </div>
                        <div>
                            <label>Describe the topic</label>
                            <textarea value={description} name="description" onChange={(e) => changeValueForm(e.target.name, e.target.value)} />
                        </div>
                        <div>
                            <label>Number of questions</label>
                            <input value={numQuestions} min={1} max={20} type='number' name="numQuestions" onChange={(e) => changeValueForm(e.target.name, e.target.value)} />
                            <input value={numQuestions} min={1} max={100} type="range" name="numQuestions" onChange={(e) => changeValueForm(e.target.name, e.target.value)} />
                        </div>
                        <div>
                            <label>Dificulty</label>
                            <input value={dificulty} min={1} max={10} type='number' name="dificulty" onChange={(e) => changeValueForm(e.target.name, e.target.value)} />
                            <input value={dificulty} min={1} max={10} type="range" name="dificulty" onChange={(e) => changeValueForm(e.target.name, e.target.value)} />
                        </div>
                        <div className="buttonsCont">
                            <button 
                            // disabled={!user?.apikey}
                             className="linkButton" type="submit">Generate Questions</button>
                            <Link className="SecundaryButton" to='/create/questions'>Don't use AI <img src={arrow} alt="Arrow to indicate the page change" /></Link>
                        </div>
                    </form>
                </aside>
                <aside>
                    <div style={{ rotate: '10deg' }} className='borderImgs imageOfcolage'>
                        <img className={'tapeTop ' + 'tapeFull'} src={tape} alt='Tape ilustration to show that the polaroid in stiked' />
                        <img className={'tapeBellow ' + 'tapeFull'} src={tape2} alt='Tape ilustration to show that the polaroid in stiked' />
                        <img className={`PhotoToCreate ${user?.apikey && 'PhotoToCreateWorking'}`} src={four} alt='Camping at the forest' />
                        <p>12/05/20</p>
                        <span>{user?.apikey ? 'Start creating now' : 'Please add an Api key'}</span>
                    </div>
                </aside>
            </div>
        )
}