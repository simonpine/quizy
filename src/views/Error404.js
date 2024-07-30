import errorImg from '../img/404Error.svg'
import { Link } from 'react-router-dom'
export function Error404() {
    return (
        <div className='Page404'>
            <img src={errorImg} alt="Error 404" />
            <aside>
                <h1>This is not the wabepage you are looking for</h1>
                <Link className='linkButton'>Explore quizies</Link>
            </aside>
        </div>
    )
}