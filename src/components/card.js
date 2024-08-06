import { useNavigate } from "react-router-dom"

export function Card({ info }) {
    const navigate = useNavigate()

    return (
        <button onClick={() => navigate(`/tests/${info.id}`)} className="card">
            <img className="card-img-top" src={info.banner} alt="Quiz about banner" />
            <div className="card-body">
                <div className="MoreInfo">
                    <span>{info.questions.length} Qs</span>
                    <span>{info.subject}</span>
                </div>
                <h2 className="card-title">{info.title}</h2>
            </div>
        </button>
    )
}