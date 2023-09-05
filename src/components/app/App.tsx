import { Route, Routes } from "react-router-dom";
import Auth from "../auth/Auth";
import { NoMatch } from "../404/NoMatch";
import RecoveryPhone from "../auth/forgot-pass/RecoveryPhone";
import ChangePassword from "../auth/forgot-pass/ChangePassword";
import ForgetPass from "../auth/forgot-pass/ForgetPass";
import LocationUser from "../auth/location/Location";

export default function App() {
    return (

        <Routes>
           
            <Route path='/auth'>
                <Route path='location/*' element={<LocationUser />} />
                <Route path='forget-pass/*' element={<ForgetPass />} />
                <Route path='' element={<Auth />} />
            </Route>

           
            <Route path='*' element={<NoMatch />} />
        </Routes>

    );
}


