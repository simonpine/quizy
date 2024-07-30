import { useState, useContext } from "react"
import { LayoutForCreate } from "../components/LayoutForCreate"
import { useNavigate } from 'react-router-dom'
import { QuizContext } from "../context/createContext"
import { useImageShowInput } from "../hooks/imageShowHook"

export function Create() {
    const [title, setTitle] = useState('')
    const [theme, setTheme] = useState('')
    const [creator, setCreator] = useState('')
    const [urlImg, setUrlImg] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate();
    const { register, onSubmit, errors, handleSubmit } = useContext(QuizContext);
    const {onImageChange,imageUrl}= useImageShowInput()


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <img src={imageUrl} />
            <input onChange={onImageChange} type="file" />
            <input {...register("firstName")} />
            <p>{errors.firstName?.message}</p>

            <input {...register("age")} />
            <p>{errors.age?.message}</p>

            <input type="submit" />
        </form>

        // <LayoutForCreate selceted={2}>
        //     <ContextCreate.Consumer  >
        //         {({newQuizzOne}) => {
        //             const submitHandle = (evt) => {
        //                 evt.preventDefault();
        //                 newQuizzOne(title, theme, creator, urlImg, description)
        //                 navigate(`/create/questions`)
        //             }
        //             return (
        //                 <form className="formCreateOne" onSubmit={submitHandle}>
        //                     <div id="title">
        //                         <label htmlFor="title"><span className="colorDeta">*</span>Quiz title:</label>
        //                         <input required type="text" placeholder="The super epic quiz" onChange={(evt) => setTitle(evt.target.value)} />
        //                     </div>
        //                     <div id="theme">
        //                         <label htmlFor="theme"><span className="colorDeta">*</span>Quiz theme:</label>
        //                         <input required type="text" placeholder="History" onChange={(evt) => setTheme(evt.target.value)} />
        //                     </div>
        //                     <div>
        //                         <label htmlFor="creator"><span className="colorDeta">*</span>Quiz creator:</label>
        //                         <input required type="text" id="creator" placeholder="Gustavo Petro" onChange={(evt) => setCreator(evt.target.value)} />
        //                     </div>
        //                     <div>
        //                         <label htmlFor="imgUrl">Quiz banner:</label>
        //                         <input type="text" id="imgUrl" placeholder="url" onChange={(evt) => setUrlImg(evt.target.value)} />
        //                     </div>
        //                     <div id="des">
        //                         <label htmlFor="des"><span className="colorDeta">*</span>Description:</label>
        //                         <textarea placeholder="This quizz is about the different cultures that lived in Colombia" required  onChange={(evt) => setDescription(evt.target.value)} />
        //                     </div>
        //                     <input className="SubmitButton" type='submit' value='Submit' />
        //                     <div></div>
        //                 </form>
        //             )
        //         }}
        //     </ContextCreate.Consumer>
        // </LayoutForCreate>
    )
}