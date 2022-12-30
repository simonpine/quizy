import { Navbar } from './navBar';
import { Footer } from './footer';
export function Layout( { selceted, children } ){
    return(
        <main className="App">
            <Navbar selected={selceted} />
           <div className='content'>
            { children }
            </div> 
            <Footer />
        </main>
    )
}