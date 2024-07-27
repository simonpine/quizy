import { Nav } from './navBar';
import { Footer } from './footer';
export function Layout({ selceted, children }) {
    return (
        <div className="App">
            <Nav selected={selceted} />
            {children}
            <Footer />
        </div>
    )
}