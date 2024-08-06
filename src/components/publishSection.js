import { useContext } from "react";
import { QuizContext } from "../context/createContext";
import { useClickAway } from "@uidotdev/usehooks";
import cross from '../img/cross-small.png'
import loadingImage from "../img/Processing-pana.svg";
import { useKey } from "react-use";
import { Tooltip } from 'react-tooltip'
import { UserContext } from "../context/userContext";


export function PublishSecction({ setState, state }) {
    const { user } = useContext(UserContext)

    const { formQuizSave, changeValueFormQuizSave, uploadQuiz, quizUploading } = useContext(QuizContext)

    const ref = useClickAway(() => {
        if (!quizUploading) setState(false)

    });

    useKey('Escape', () => {
        if (!quizUploading) setState(false)
    })

    return (
        state === true &&
        <>
            {formQuizSave?.banner !== undefined &&
                <Tooltip style={{ backgroundColor: "#F9604E", zIndex: 11, fontSize: '1.5rem', color: '#2F0C29', fontWeight: '500' }} clickable anchorSelect=".imageChanger" place="top">
                    Delete que image.
                </Tooltip>
            }
            <div className="sureContainer">
                <div style={quizUploading ? { width: 'fit-content' } : {}} ref={ref} className="flyBoxEdit">

                    {quizUploading ?
                        <div className="uploadingBanner">
                            <img src={loadingImage} alt="Your quiz is uploading" />
                            <figure className="loader2" />
                            <h2>Your quiz is uploading</h2>
                        </div>
                        :
                        <>
                            <div className="spaceBetween">
                                <h2>Last details to <span className="specialColor">upload</span> you quiz</h2>
                                {!quizUploading && <button onClick={() => setState(false)} className="closeButton"><img alt="Close the edit secction" src={cross} /></button>}
                            </div>
                            <form onSubmit={(evt)=> {
                                evt.preventDefault()
                                uploadQuiz(user?.name ? user?.name : 'Anonymous')
                            }} className="FormForEdit">
                                <div className="formFields">
                                    <div className="InputWriteFields">
                                        <div className="inputAndLabeGap">
                                            <label htmlFor="title"><span>*</span> Title: </label>
                                            <input placeholder="My super quiz" id="title" name="title" onChange={(evt) => { changeValueFormQuizSave(evt.target.name, evt.target.value) }} required className="inputText" type="text" value={formQuizSave.title} />
                                        </div>
                                        <div className="inputAndLabeGap">
                                            <label><span>*</span> Subject: </label>
                                            <select onChange={(e) => changeValueFormQuizSave(e.target.name, e.target.value)} value={formQuizSave.subject} id="typeQuestion" name="subject">
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
                                        <div style={{ flexGrow: 1 }} className="inputAndLabeGap">
                                            <label htmlFor="description"><span>*</span> Description: </label>
                                            <textarea placeholder="This quiz is about ..." style={{ flexGrow: 1 }} id="description" name="description" onChange={(evt) => { changeValueFormQuizSave(evt.target.name, evt.target.value) }} required className="inputText" type="text" value={formQuizSave.description} />
                                        </div>
                                    </div>
                                    <div>
                                        {formQuizSave.banner !== undefined ?
                                            <button id='DeleteImage' onClick={() => { changeValueFormQuizSave('banner', undefined) }} type="button" className="imageChanger"><img alt="Banner of the question" src={URL.createObjectURL(formQuizSave.banner)} /></button>
                                            :
                                            <label htmlFor="banner" className="imageChanger"><span>*</span> Add a banner</label>
                                        }
                                        <input style={{ display: "none" }} id="banner" name="banner" onChange={(e) => changeValueFormQuizSave(e.target.name, e.target.files[0])} type="file" accept="image/png, image/jpeg" />
                                    </div>
                                </div>
                                <div className="buttonEnd">
                                    <button type="button" onClick={() => {
                                        setState(false)
                                    }} className="SecundaryButton">Cancel</button>

                                    <button disabled={formQuizSave.title === '' || formQuizSave.banner === undefined || formQuizSave.description === ''} type="submit" className="linkButton">Upload quiz</button>
                                </div>
                            </form>
                        </>
                    }
                </div>
            </div>
        </>
    )

}