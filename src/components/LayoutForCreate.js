import ContextCreateFather from '../context/createContext';
export function LayoutForCreate({ selceted, children }) {
    return (
        <ContextCreateFather>
            <main className="App">
                <div className='content'>
                    {children}
                </div>
            </main>
        </ContextCreateFather>
    )
}