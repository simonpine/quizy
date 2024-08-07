import { Tests } from "../views/tests.js";
import { Create } from "../views/create.js";
import { CreateQuestions } from "../views/createQuestions.js";
import { Resolve } from "../views/resolve.js";
import App from '../App.js'
import { Route, Routes } from "react-router-dom";
import { Settings } from "../views/settings.js";
import { Error404 } from "../views/Error404.js";
import { QuizProvider } from "../context/createContext.js";
import { UserProvider } from "../context/userContext.js";
export const RoutesForTheApp = () => {
    return (
        <main className="content">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path={"*"} element={<Error404 />} />
                <Route path="/tests" element={<UserProvider><Tests /></UserProvider>} />
                <Route path="/create" element={<UserProvider><QuizProvider><Create /></QuizProvider></UserProvider>} />
                <Route path="/create/questions" element={<UserProvider><QuizProvider><CreateQuestions /></QuizProvider></UserProvider>} />
                <Route path="/tests/:id" element={<UserProvider><Resolve /></UserProvider>} />
                <Route path="/settings" element={<UserProvider><QuizProvider><Settings /></QuizProvider></UserProvider>} />
            </Routes>
        </main>
    )
}