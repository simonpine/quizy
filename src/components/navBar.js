import { NavLink } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import logo from '../img/logo1.svg'
import { useState, useEffect } from "react"
import { useKey } from "react-use";
import { auth } from '../firebasecom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleAuthProvider } from "firebase/auth";
function Navbar({ setMenu, menu }) {
    return (
        <nav>
            <NavLink className='navlinkGeneral' to='/'>
                <img className="logoNav" src={logo} alt="SimonPine brand logo" />
            </NavLink>
            <button className="buttonMain" onClick={() => setMenu(!menu)}>
                {!menu ? 'Menu' : 'Close'}
            </button>
        </nav>
    )
}

export function Nav() {
    const [user] = useAuthState(auth)
    const [menu, setMenu] = useState(false)
    const location = useLocation();
    useKey('Escape', () => { setMenu(false) });
    function signInWithGoogle (){
        auth.signOut()
        const provider = new GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    useEffect(()=>{
        console.log(user)
    }, [user])
    useEffect(() => {
        setMenu(false)
    }, [location]);
    return (

        <>
            <Navbar menu={menu} setMenu={setMenu} />
            {menu &&
                <aside className="fullnav">
                    <ul className="nav-ul">
                        <li className="nav-li">
                            <NavLink to='/'>
                                {({ isActive }) => {
                                    return (
                                        <div className="nav-a">
                                            <span className="nav-a-letters">
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> H</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> o</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> m</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> e</span>
                                            </span>
                                            <span className="nav-a-stripe nav-a-stripe--yellow"> </span>
                                            <span className="nav-a-stripe nav-a-stripe--turquoise"> </span>
                                            <span className="nav-a-stripe nav-a-stripe--purple"> </span>
                                            <span className="nav-a-letters-top">
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> H</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> o</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> m</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> e</span>

                                            </span>
                                        </div>
                                    )
                                }}
                            </NavLink>
                        </li>
                        <li className="nav-li middleDelay">
                            <NavLink to='/create'>
                                {({ isActive }) => {
                                    return (
                                        <div className="nav-a">
                                            <span className="nav-a-letters">
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> C</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> r</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> e</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> a</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> t</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> e</span>
                                            </span>
                                            <span className="nav-a-stripe nav-a-stripe--yellow"> </span>
                                            <span className="nav-a-stripe nav-a-stripe--turquoise"> </span>
                                            <span className="nav-a-stripe nav-a-stripe--purple"> </span>
                                            <span className="nav-a-letters-top">
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> C</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> r</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> e</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> a</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> t</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> e</span>
                                            </span>
                                        </div>
                                    )
                                }}
                            </NavLink>
                        </li>
                        <li className="nav-li lastDelay">
                            <NavLink to='/tests'>
                                {({ isActive }) => {
                                    return (
                                        <div className="nav-a">
                                            <span className="nav-a-letters">
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> T</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> e</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> s</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> t</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> s</span>
                                            </span>
                                            <span className="nav-a-stripe nav-a-stripe--yellow"> </span>
                                            <span className="nav-a-stripe nav-a-stripe--turquoise"> </span>
                                            <span className="nav-a-stripe nav-a-stripe--purple"> </span>
                                            <span className="nav-a-letters-top">
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> T</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> e</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> s</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> t</span>
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> s</span>
                                            </span>
                                        </div>
                                    )
                                }}
                            </NavLink>
                        </li>
                        {!user ?
                            <li className="nav-li lastDelay">

                                    <button onClick={signInWithGoogle} className="nav-a">
                                        <span className="nav-a-letters">
                                            <span className={`nav-a-letter`}> S</span>
                                            <span className={`nav-a-letter`}> i</span>
                                            <span className={`nav-a-letter`}> g</span>
                                            <span className={`nav-a-letter`}> n</span>
                                            <span className={`nav-a-letter`}> -</span>
                                            <span className={`nav-a-letter`}> i</span>
                                            <span className={`nav-a-letter`}> n</span>

                                        </span>
                                        <span className="nav-a-stripe nav-a-stripe--yellow"> </span>
                                        <span className="nav-a-stripe nav-a-stripe--turquoise"> </span>
                                        <span className="nav-a-stripe nav-a-stripe--purple"> </span>
                                        <span className="nav-a-letters-top">
                                            <span className={`nav-a-letter`}> S</span>
                                            <span className={`nav-a-letter`}> i</span>
                                            <span className={`nav-a-letter`}> g</span>
                                            <span className={`nav-a-letter`}> n</span>
                                            <span className={`nav-a-letter`}> -</span>
                                            <span className={`nav-a-letter`}> i</span>
                                            <span className={`nav-a-letter`}> n</span>
                                        </span>
                                    </button>

                                {/* </button> */}
                            </li>
                            :
                            <li className="nav-li lastDelay">
                                <NavLink to='/tests'>
                                    {({ isActive }) => {
                                        return (
                                            <div className="nav-a">
                                                <span className="nav-a-letters">
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> S</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> e</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> t</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> t</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> i</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> n</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> g</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> s</span>
                                                </span>
                                                <span className="nav-a-stripe nav-a-stripe--yellow"> </span>
                                                <span className="nav-a-stripe nav-a-stripe--turquoise"> </span>
                                                <span className="nav-a-stripe nav-a-stripe--purple"> </span>
                                                <span className="nav-a-letters-top">
                                                <span className={`nav-a-letter ${isActive && 'activelink'}`}> S</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> e</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> t</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> t</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> i</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> n</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> g</span>
                                                    <span className={`nav-a-letter ${isActive && 'activelink'}`}> s</span>
                                                </span>
                                            </div>
                                        )
                                    }}
                                </NavLink>
                            </li>
                        }
                    </ul>
                </aside>
            }
        </>
    )
}