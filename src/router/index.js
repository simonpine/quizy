import { createBrowserRouter } from "react-router-dom";
import App from '../App.js'
import { Report } from "../views/report.js";
import { Tests } from "../views/tests.js";
import { Create } from "../views/create.js";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        
    },
    {
        path: '/report',
        element: <Report />,
        
    },
    {
        path: '/tests',
        element: <Tests />,
        
    },
    {
        path: '/create',
        element: <Create />,
        
    },   
])