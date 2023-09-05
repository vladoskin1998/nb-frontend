import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../auth/Auth";
import { NoMatch } from "../404/NoMatch";
import RecoveryPhone from "../auth/forgot-pass/RecoveryPhone";
import ChangePassword from "../auth/forgot-pass/ChangePassword";
import ForgetPass from "../auth/forgot-pass/ForgetPass";
import LocationUser from "../auth/location/Location";
import Success from "../auth/Success";

export default function App() {
    return (

        <Routes>

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


