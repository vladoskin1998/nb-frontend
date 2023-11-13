import { lazy } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import { UserHeader } from "../user-components/header/UserHeader"
import { FooterNav } from "../user-components/footer-navigate/FooterNav"
import { Messeges } from "../user-components/messeges/Messeges"
import { NewsFeeds } from "../user-components/newsfeed/NewsFeeds"
import { PublicationPostComments } from "../general-components/publication-lists/PublicationPostComments"
import { Explore } from "../user-components/explore/Explore"
import { ServicesUser } from "../user-components/services/Services"
import { ActivitiesUser } from "../user-components/activities/Activities"
import { isShowFooterNavUser } from "../../utils/titles"
import { UserNotificationList } from "../user-components/notification/NotificationList"

const UserRouter = () => {
    const location = useLocation()

    return (
        <div>
            <Routes>
                <Route
                    path="explore"
                    element={<ProtectedRoute element={<Explore />} />}
                />
                <Route
                    path="service"
                    element={<ProtectedRoute element={<ServicesUser />} />}
                />
                <Route
                    path="activities"
                    element={<ProtectedRoute element={<ActivitiesUser />} />}
                />
                <Route
                    path="messeges/*"
                    element={<ProtectedRoute element={<Messeges />} />}
                />
                <Route
                    path="notification-list"
                    element={
                        <ProtectedRoute element={<UserNotificationList />} />
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
        </div>
    )
}

export default UserRouter
