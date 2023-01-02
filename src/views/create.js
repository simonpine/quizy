import { useState } from "react"
import { LayoutForCreate } from "../components/LayoutForCreate"
import { ContextCreate } from "../context/createContext"
import { useNavigate } from 'react-router-dom'
export function Create() {
    const [title, setTitle] = useState('')
    const [theme, setTheme] = useState('')
    const [creator, setCreator] = useState('')
    const [urlImg, setUrlImg] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate();
    return (
        <LayoutForCreate selceted={2}>
            <ContextCreate.Consumer  >
                {({newQuizzOne}) => {
                    const submitHandle = (evt) => {
                        evt.preventDefault();
                        newQuizzOne(title, theme, creator, urlImg, description)
                        navigate(`/create/questions`)
                    }
                    return (
                        <form className="formCreateOne" onSubmit={submitHandle}>
                            <div id="title">
                                <label htmlFor="title"><span className="colorDeta">*</span>Quizz title:</label>
                                <input required type="text" placeholder="The super epic quizz" onChange={(evt) => setTitle(evt.target.value)} />
                            </div>
                            <div id="theme">
                                <label htmlFor="theme"><span className="colorDeta">*</span>Quizz theme:</label>
                                <input required type="text" placeholder="History" onChange={(evt) => setTheme(evt.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="creator"><span className="colorDeta">*</span>Quizz creator:</label>
                                <input required type="text" id="creator" placeholder="Gustavo Petro" onChange={(evt) => setCreator(evt.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="imgUrl">Quizz banner:</label>
                                <input type="text" id="imgUrl" placeholder="url" onChange={(evt) => setUrlImg(evt.target.value)} />
                            </div>
                            <div id="des">
                                <label htmlFor="des"><span className="colorDeta">*</span>Description:</label>
                                <textarea placeholder="This quizz is about the different cultures that lived in Colombia" required  onChange={(evt) => setDescription(evt.target.value)} />
                            </div>
                            <input className="SubmitButton" type='submit' value='Submit' />
                            <div></div>
                        </form>
                    )
                }}
            </ContextCreate.Consumer>
        </LayoutForCreate>
    )
}