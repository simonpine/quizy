import { Navbar } from './navBar';
import { Footer } from './footer';
import ContextCreateFather from '../context/createContext';
export function LayoutForCreate({ selceted, children }) {
    return (
        <ContextCreateFather>
            <main className="App">
                <Navbar selected={selceted} />
                <div className='content'>
                    {children}
                </div>
                <Footer />
            </main>
        </ContextCreateFather>
    )
}