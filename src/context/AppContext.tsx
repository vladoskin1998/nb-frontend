import {
    createContext,
    useEffect,
    type ReactNode,
    useRef,
} from "react"
import { useAppDispatch, useAppSelector } from "../utils/hooks"
import { useNavigate } from "react-router-dom"
import { refresh } from "../services/auth"
import {
    getIdentityInforamation,
} from "../services/profile"
import { AuthResponseInterface } from "../types/types"
import { roleUrl } from "../utils/config"


const AppContext = createContext<{}>({})

const AppContextProvider = ({ children }: { children: ReactNode }) => {


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
                    console.log("roleUrl(role)",roleUrl(role))
                    
                    return navigate(roleUrl(role))
                })
        }
    }, [isAuth, _id])

    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}

export { AppContextProvider, AppContext }
