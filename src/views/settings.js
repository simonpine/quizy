import { UserContext } from "../context/userContext";
import { useContext } from "react"
import { Navigate } from "react-router-dom";

export function Settings() {
    const { logout, isthere } = useContext(UserContext);
    return (
        <>
            {
                !isthere ?

                   <div>
                     < h1 onClick={logout} > HOLA</h1 >
                   </div>

                    :
                    <Navigate to='/' />
            }
        </>

    )
}