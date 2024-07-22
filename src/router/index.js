import { Tests } from "../views/tests.js";
import { Create } from "../views/create.js";
import { CreateQuestions } from "../views/createQuestions.js";
import { Resolve } from "../views/resolve.js";
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../firebase.js'
import App from '../App.js'
import { Route, Routes } from "react-router-dom";
export const RoutesForTheApp = () => {
    // const [user] = useAuthState(auth)
    return (
        <Routes>
            <Route path="/" element={<App />} />
            {/* <Route path={"*"} element={<Error404/>}/> */}
            <Route path="/tests" element={<Tests />} />
            <Route path="/create" element={<Create />} />
            <Route path="/create/questions" element={<CreateQuestions />} />
            <Route path="/tests/:id" element={<Resolve />} />

            {/* <Route path="/saved" element={!!user ? <Saved /> : <Navigate to='/' />} /> */}
        </Routes>
    )
}