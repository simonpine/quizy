import { useContext } from "react";
import { QuizContext } from "../context/createContext";
import { useClickAway } from "@uidotdev/usehooks";
import cross from '../img/cross-small.png'

export function PublishSecction({ setState, state }) {

    const { formQuizSave, changeValueFormQuizSave } = useContext(QuizContext)

    const ref = useClickAway(() => {
        setState(false)
    });

    return (
        state === true &&
        <>
            <div className="sureContainer">
                <div ref={ref} className="flyBoxEdit">
                    <div className="spaceBetween">
                        <h2>Last details to <span className="specialColor">upload</span> you quiz</h2>
                        <button onClick={() => setState(false)} className="closeButton"><img alt="Close the edit secction" src={cross} /></button>
                    </div>
                    <form onSubmit={(evt) => {
                        evt.preventDefault()
                        // saveChanges(currentInfo.id, currentInfo)
                        setState(false)
                    }} className="FormForEdit">
                        <div className="formFields">
                            <div className="InputWriteFields">
                                <div className="inputAndLabeGap">
                                    <label htmlFor="title">Title: </label>
                                    <input placeholder="My super quiz" id="title" name="title" onChange={(evt) => { changeValueFormQuizSave(evt.target.name, evt.target.value) }} required className="inputText" type="text" value={formQuizSave.title} />
                                </div>
                                <div className="inputAndLabeGap">
                                    <label>Subject: </label>
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
                                    <label htmlFor="description">Description: </label>
                                    <textarea placeholder="This quiz is about ..." style={{ flexGrow: 1 }} id="description" name="description" onChange={(evt) => { changeValueFormQuizSave(evt.target.name, evt.target.value) }} required className="inputText" type="text" value={formQuizSave.description} />
                                </div>
                            </div>
                            <div>
                                {formQuizSave.banner !== undefined ?
                                    <button id='DeleteImage' onClick={() => { }} type="button" className="imageChanger"><img alt="Banner of the question" src={URL.createObjectURL(formQuizSave.banner)} /></button>
                                    :
                                    <label htmlFor="ImageQuestionInput" className="imageChanger">Add a banner</label>
                                }
                                <input required style={{ display: "none" }} id="ImageQuestionInput" name="ImageQuestionInput" onChange={(evt) => { }} type="file" accept="image/png, image/jpeg" />
                            </div>
                        </div>
                        <div className="buttonEnd">
                            <button type="button" onClick={() => {
                                setState(false)
                            }} className="SecundaryButton">Cancel</button>

                            <button type="submit" className="linkButton">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}