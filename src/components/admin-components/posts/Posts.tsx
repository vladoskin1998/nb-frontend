import React, { useState } from "react"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { IconBottomChevrons } from "../../svg/IconChevrons"
import { postsSubTitle } from "../../../utils/titles"
import { PostsRouterModal } from "./PostsRouterModal"
import { PostsReports } from "./PostsReports"
import { PublicationPosts } from "../../general-components/publication-lists/PublicationPosts"
import { PostsComments } from "./PostsComments"

export const Posts = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isOpenChevron, setIsOpenChevron] = useState(false)

    const handlerAddPost = () => {
        navigate("/publish/post")
    }

    const changeChevron = () => {
        setIsOpenChevron(false)
    }

    return (
        <div className="admin" id='posts'>
            <AdminSubHeader onClickButton={handlerAddPost}>
                <div className="services__exit">
                    <h5 style={{ textTransform: "capitalize" }}>
                        {postsSubTitle(location.pathname)}
                    </h5>
                </div>
                <button className="user__route--button" onClick={() => setIsOpenChevron(true)}>
                    <IconBottomChevrons />
                </button>
                {isOpenChevron && (
                    <PostsRouterModal setIsOpen={changeChevron} />
                )}
            </AdminSubHeader>
            <Routes>
                <Route path="reports" element={<PostsReports />} />
                <Route path="commens" element={<PostsComments />} />
                <Route path="all" element={<PublicationPosts />} />
                <Route path="" element={<PublicationPosts />} />
            </Routes>
        </div>
    )
}
