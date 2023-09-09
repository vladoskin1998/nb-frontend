import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../auth/Auth";
import ForgetPass from "../auth/forgot-pass/ForgetPass";
import LocationUser from "../auth/location/Location";
import Success from "../auth/Success";
import AdminRouter from "../route/AdminRouter";
import { useAppDispatch } from "../../utils/hooks";
import { useEffect } from "react";
import { refresh } from "../../services/auth-service";

export default function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(
            refresh()
        )
    }, [])

    return (


            <Routes>

                <Route path='/admin/*' element={<AdminRouter />}>
                </Route>
                <Route path='/user/*'>
                </Route>


                <Route path='/auth'>
                    <Route path='success' element={<Success />} />
                    <Route path='location/*' element={<LocationUser />} />
                    <Route path='forget-pass/*' element={<ForgetPass />} />
                    <Route path='' element={<Auth />} />
                </Route>

                <Route path='*' element={<Navigate to='/auth' />} />
            </Routes>
  
    );
}


