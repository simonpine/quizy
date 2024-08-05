import trash from '../img/trash.png'
import arrows from '../img/arrows.png'
import pen from '../img/pen.png'
import { useContext, useState } from 'react'
import { QuizContext } from '../context/createContext'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities";
import { Sure } from './sure'
import { EditingQuestion } from './editingQuestion'


export function Question({ info }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: info.id,
    })
    const { AILoading, deleteQuestion } = useContext(QuizContext)
    const [suerDelete, setSureDelete] = useState(false)
    const [editingQuestion, setEditingQuestion] = useState(false)
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'auto'
    };

    return (
        <>
            <EditingQuestion key={Math.random()} info={info} state={editingQuestion} setState={setEditingQuestion} />
            <Sure msg={"Do you want to delete the question: \n " + info?.question} func={deleteQuestion} setState={setSureDelete} state={suerDelete} extraInfo={[info?.id]} />

            <article  {...attributes} ref={setNodeRef} style={style} className="Question">
                <div className='FunctionsQuestionCont'>
                    <div>
                        {AILoading ?
                            <button disabled={AILoading} style={{ cursor: 'grab' }} className='IconButton' ><img src={arrows} alt={`Move the question number ${info?.id}`} /></button>
                            :
                            <button {...listeners} disabled={AILoading} style={{ cursor: 'grab' }} className='IconButton' ><img src={arrows} alt={`Move the question number ${info?.id}`} /></button>
                        }
                        <h4>Id: {info?.id}</h4>
                    </div>
                    <div>
                        <button disabled={AILoading} onClick={() => setEditingQuestion(true)} className='IconButton' >Edit <img src={pen} alt={`Edit the question number ${info?.id}`} /></button>
                        <button disabled={AILoading} className='IconButtonDelete' ><img src={trash} alt={`Delete the question number ${info?.id}`} onClick={() => setSureDelete(true)} /></button>

                    </div>
                </div>
                <div className='HorizontalSection'>
                    {info?.banner !== undefined && <div className='ImageInputCont'>

                        <img src={URL.createObjectURL(info.banner)} alt="Question banner" />


                    </div>}
                    <div >
                        <h3>{info?.question}</h3>
                        <h4>- Aswer choices: </h4>
                        <ul className='listAnswers'>
                            {info?.answers &&
                                info?.answers.map(ans => {
                                    return (
                                        <li key={ans?.id ? ans?.id : Math.random()}>{ans?.id === info?.idOfTheCorrectAnswer ? '✅' : '❌'} {ans?.answer}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </article>
        </>
    )
}