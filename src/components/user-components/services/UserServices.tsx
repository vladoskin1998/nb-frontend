import React, { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { UserServicesMain } from "./UserServicesMain"
import { allCategories } from "../../../services/categories"
import { useAppSelector, useAppDispatch } from "../../../utils/hooks"
import { Loader } from "../../ui/Loader"
import { UserCategories } from "./UserCategories"
import { SERVICES_EVENT, USER_LIST_APP } from "../../../types/enum"
import { UserPublishServicesList } from "./UserPublishServicesList"
import { UserServicesSpecialOffers } from "./UserServicesSpecialOffers"
import { UserPublishServicesItem } from "./UserPublishServicesItem"

export const UserServices = () => {

    const { isLoad } = useAppSelector((s) => s.categoriesReducer)
    const dispatch = useAppDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(allCategories())
    }, [])
    
    return (
        <div className={`user user--body ${location.pathname === '/user/service/publish-service' && 'user--none'}`}>
            <Routes>
                <Route path="publish-service" element={<UserPublishServicesItem />} />
                <Route path="user-special-offers" element={<UserServicesSpecialOffers />} />
                <Route path="user-last-publish-service" element={<UserPublishServicesList event={USER_LIST_APP.LAST}/>} />

                <Route path="user-publish-service-list" element={<UserPublishServicesList event={USER_LIST_APP.ALL}/>} />
                <Route path="user-sub-categories" element={<UserCategories event={SERVICES_EVENT.SUB_LIST} />} /> 
                <Route path="user-categories" element={<UserCategories event={SERVICES_EVENT.LIST} />} /> 
                <Route path="*" element={<UserServicesMain />} />
            </Routes>
            {isLoad && <Loader />}
        </div>
    )
}
