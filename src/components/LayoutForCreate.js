import { Navbar } from './navBar';
import { Footer } from './footer';
import { ContextCreateFather } from '../context/createContext';
export function LayoutForCreate({ selceted, children }) {
    return (
        <main className="App">
            <Navbar selected={selceted} />
            <ContextCreateFather>
                <div className='content'>
                    {children}
                </div>
            </ContextCreateFather>
            <Footer />
        </main>
    )
}