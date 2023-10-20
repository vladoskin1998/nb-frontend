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
import {
    getIdentityInforamation,
} from "../services/profile"
import { AuthResponseInterface } from "../types/types"
import { roleUrl } from "../utils/config"
import { ROLES } from "../types/enum"


const AppContext = createContext<{
    userRoleUrl: ROLES
}>({
    userRoleUrl: ROLES.USER
})

const AppContextProvider = ({ children }: { children: ReactNode }) => {


    const [userRoleUrl, setUserRoleUrl] = useState<ROLES>(ROLES.USER)
    const location = useLocation()
    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector((s) => s.authReducer)
    const { _id, role } = useAppSelector((s) => s.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            dispatch(refresh())
                .unwrap()
                .then((res: AuthResponseInterface) => {})
        }
    }, [])

    useEffect(() => {
        if (isAuth && _id) {
            dispatch(getIdentityInforamation({ _id }))
                .unwrap()
                .then((res) => {
                    if (!res.isLocationVerify) {
                        return navigate(`/location`)
                    }
                    console.log("auth","roleUrl(role)",roleUrl(role))
                    if(location.pathname === "/auth"){
                        return navigate(roleUrl(role))
                    }
                   
                })
        }
    }, [isAuth, _id])

    return <AppContext.Provider value={
        {userRoleUrl}
    }>{children}</AppContext.Provider>
}

export { AppContextProvider, AppContext }
