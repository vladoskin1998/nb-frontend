import  { ReactElement } from "react";
import {useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";

const ProtectedRoute = ({ element }: { element: ReactElement }) => {
    const navigate = useNavigate();


    const isAuthenticated = useAppSelector((s:any) => s.authReducer.isAuth); 

    if (!isAuthenticated) {
        navigate("/auth"); 
        return null;
    }

    return element;
};

export default ProtectedRoute;