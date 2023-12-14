import { lazy } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import { UserHeader } from "../user-components/header/UserHeader"
import { FooterNav } from "../user-components/footer-navigate/FooterNav"
import { Messeges } from "../user-components/messeges/Messeges"
import { NewsFeeds } from "../user-components/newsfeed/NewsFeeds"
import { PublicationPostComments } from "../general-components/publication-lists/PublicationPostComments"
import { Explore } from "../user-components/explore/Explore"

import { UserActivities } from "../user-components/activities/UserActivities"

import { UserNotification } from "../user-components/notification/UserNotification"
import { UserServices } from "../user-components/services/UserServices"

const UserRouter = () => {
    const location = useLocation()

    return (
        <>
            <Routes>
                <Route
                    path="explore/*"
                    element={<ProtectedRoute element={<Explore />} />}
                />
                <Route
                    path="service/*"
                    element={<ProtectedRoute element={<UserServices />} />}
                />
                <Route
                    path="activities/*"
                    element={<ProtectedRoute element={<UserActivities />} />}
                />
                <Route
                    path="messeges/*"
                    element={<ProtectedRoute element={<Messeges />} />}
                />

                <Route
                    path="notification/*"
                    element={
                        <ProtectedRoute element={<UserNotification />} />
                    }
                />
                <Route
                    path="comments"
                    element={
                        <ProtectedRoute element={<PublicationPostComments />} />
                    }
                />
                <Route
                    path="posts"
                    element={<ProtectedRoute element={<NewsFeeds />} />}
                />
                <Route
                    path="*"
                    element={<ProtectedRoute element={<NewsFeeds />} />}
                />
            </Routes>
            {<FooterNav />}
        </>
    )
}

export default UserRouter
