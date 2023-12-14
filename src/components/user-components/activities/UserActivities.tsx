import React, { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"

import { allCategories } from "../../../services/categories"
import { useAppSelector, useAppDispatch } from "../../../utils/hooks"
import { Loader } from "../../ui/Loader"

import { SERVICES_EVENT, USER_LIST_APP } from "../../../types/enum"
import { UserActivitiesMain } from "./UserActivitiesMain"
import { allActivities } from "../../../services/activities"
import { UserActivitiesCategory } from "./UserActivitiesCategory"
import { UserPublishActivitiesList } from "./UserPublishActivitiesList"
import { UserActivitiesSpecialOffers } from "./UserActivitiesSpecialOffers"
import { UserPublishActivitiesItem } from "./UserPublishActivitiesItem"

export const UserActivities = () => {

    const { isLoad } = useAppSelector((s) => s.categoriesReducer)
    const dispatch = useAppDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(allActivities())
    }, [])
    
    return (
        <div className={`user user--body ${location.pathname === '/user/activities/publish-activities-item' && 'user--none'}`}>
            <Routes>
                <Route path="publish-activities-item" element={<UserPublishActivitiesItem />} />
                <Route path="user-activities-special-offers" element={<UserActivitiesSpecialOffers />} />  
                <Route path="user-last-publish-activities" element={<UserPublishActivitiesList event={USER_LIST_APP.LAST}/>} />

                <Route path="user-publish-activities-list" element={<UserPublishActivitiesList event={USER_LIST_APP.ALL}/>} />

                <Route path="user-activities-categories" element={<UserActivitiesCategory  />} />
                <Route path="*" element={<UserActivitiesMain />} />
            </Routes>
            {isLoad && <Loader />}
        </div>
    )
}
