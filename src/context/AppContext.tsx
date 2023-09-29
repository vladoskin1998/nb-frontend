import {
    createContext,
    useState,
    useEffect,
    type ReactNode,
    useContext,
} from "react"
import { useAppDispatch, useAppSelector } from "../utils/hooks"
import { useNavigate } from "react-router-dom"
import { refresh } from "../services/auth"
import { UserIdentityInterface, getIdentityInforamation } from "../services/profile"
import { PayloadAction } from "@reduxjs/toolkit"

const AppContext = createContext<{}>({})

const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector((s) => s.authReducer)
    const { _id } = useAppSelector((s) => s.profileReducer)
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            dispatch(refresh())
        }
    }, [])

    useEffect(() => {
        if (isAuth) {
            dispatch(getIdentityInforamation({ _id }))
                .unwrap()
                .then((res) => {
                    console.log(res);
                    
                    if(!res.isLocationVerify ){
                       return navigate(`/location`)
                    }
                    return navigate(`/admin`)
                })
        }
    }, [isAuth])


    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}

export { AppContextProvider, AppContext }
