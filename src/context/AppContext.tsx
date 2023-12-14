import {
    createContext,
    useEffect,
    type ReactNode,
    useRef,
    useState,
} from "react"
import { useAppDispatch, useAppSelector } from "../utils/hooks"
import { useLocation, useNavigate } from "react-router-dom"
import { refresh } from "../services/auth"
import { getIdentityInforamation, profileTextInfo } from "../services/profile"
import { AuthResponseInterface } from "../types/types"
import { roleUrl } from "../utils/config"
import { ONLINEOFFLINE, ROLES } from "../types/enum"
import { WelcomeLogo } from "../components/general-components/welcome/WelcomeItems"

const AppContext = createContext<{
    userRoleUrl: ROLES
}>({
    userRoleUrl: ROLES.USER,
})

const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [userRoleUrl, setUserRoleUrl] = useState<ROLES>(ROLES.USER)
    const location = useLocation()
    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector((s) => s.authReducer)
    const { _id, role, isCheckedEmail } = useAppSelector((s) => s.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        // const accessToken = localStorage.getItem("accessToken")
        // if (accessToken) {

        dispatch(refresh())
            .unwrap()
            .then((res: AuthResponseInterface) => {})
            .catch((e) => {
                navigate(`/auth`)
            })
        // }
    }, [])

    console.log(location.pathname);
    
    useEffect(() => {
        if (isAuth && _id && !isCheckedEmail) {
            navigate(`/auth/confirm`)
        }
        if (isAuth && _id && isCheckedEmail) {
            dispatch(getIdentityInforamation({ _id }))
                .unwrap()
                .then((res) => {
                    if (!res.isLocationVerify) {
                        return navigate(`/location`)
                    }
                    console.log("auth", "roleUrl(role)", roleUrl(role))
                    if (
                        location.pathname === "/auth/login" ||
                        location.pathname === "/auth"
                    ) {
                        return navigate(roleUrl(role))
                    }
                })
            if(_id){
                profileTextInfo({
                    online: ONLINEOFFLINE.ONLINE,
                    _id,
                })
            }
          
        }

        return () => {
            if (_id) {
                profileTextInfo({
                    online: ONLINEOFFLINE.OFFLINE,
                    _id,
                })
            }
        }
    }, [isAuth, _id, isCheckedEmail])


    return (
        <AppContext.Provider value={{ userRoleUrl }}>
            <>{children}</>
        </AppContext.Provider>
    )
}

export { AppContextProvider, AppContext }
