import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
export function Card({ title, theme, img, id, des }) {
    const [im, setIm] = useState(img)
    useEffect(()=>{
        if(img === ''){
            setIm(`https://source.unsplash.com/1000x500/?${theme}`)
        }
    }, [img, theme])
    return (
        <div className="card">
            <img className="card-img-top" src={im} alt={`Quiz about ${theme}`}  />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h4 className="card-theme">{theme}</h4>
                    <p className="card-text">{des}</p>
                    <Link to={{ pathname: `/tests/${id}` }}  className="link">Resolve</Link>
                </div>
        </div>
    )
}