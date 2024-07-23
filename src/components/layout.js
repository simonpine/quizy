import { Navbar } from './navBar';
import { Footer } from './footer';
export function Layout({ selceted, children }) {
    return (
        <div className="App">
            <Navbar selected={selceted} />
            {children}
            <Footer />
        </div>
    )
}