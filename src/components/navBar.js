import { useState } from "react"
import { Link } from "react-router-dom"

import logo from '../img/logo1.svg'
export function Navbar({ selected }) {
    const [mo, setmo] = useState({ right: '-100%', })
    const [mo2, setmo2] = useState({ left: '-100%', })
    const one = {}
    const two = {}
    const tree = {}
    const four = {}
    if(selected == 1){
        one.color = "#ff755d"
    }
    else if (selected == 2){
        two.color = "#ff755d"
    }
    else if (selected == 4){
        four.color = "#ff755d"
    }
    else{
        tree.color = "#ff755d"
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark position-sticky p-nav">
            <div style={mo} className="mobile">
                <div className="mobileContainer">
                    <ul className="navbar-nav">
                        <li className="">
                            <button onClick={() => {
                    setmo({ right: '-100%', })
                    setmo2({ left: '-100%', })
                }}  type="button" className="close" aria-label="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x tras" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </button>
                        </li>
                        <li className="nav-item active">
                        <Link to={{pathname:"/"}} className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={{pathname:"/create"}} className="nav-link">Create</Link>
                    </li>
                    <li className="nav-item">
                        <Link  to={{pathname:"/tests"}} className="nav-link">Tests</Link>
                    </li>
                    <li className="nav-item">
                        <Link  to={{pathname:"/report"}} className="nav-link">Report</Link>
                    </li>
                    </ul>
                </div>
                <button style={mo2} onClick={() => {
                    setmo({ right: '-100%', })
                    setmo2({ left: '-100%', })
                }} className="darkclose" />
            </div>
            <a className="navbar-brand" onClick={() => window.scrollTo(0, 0)}><img className="navLogo" src={logo} /></a>
            <button className="navbar-toggler" onClick={() => {
                setmo2({ display: 'flex' })
                setmo({ right: '0px', })
            }}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end " id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link style={one} to={{pathname:"/"}} className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link style={two} to={{pathname:"/create"}} className="nav-link">Create</Link>
                    </li>
                    <li className="nav-item">
                        <Link style={tree} to={{pathname:"/tests"}} className="nav-link">Tests</Link>
                    </li>
                    <li className="nav-item">
                        <Link style={four} to={{pathname:"/report"}} className="nav-link">Report</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}