import { Navbar } from './navBar';
import { Footer } from './footer';
export function Layout({ selceted, children }) {
    return (
        <main className="App">
            <Navbar selected={selceted} />
            {children}
            <Footer />
        </main>
    )
}