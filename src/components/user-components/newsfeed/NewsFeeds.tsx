import { Route, Routes, useNavigate } from "react-router-dom";
import { UserHeaderMain } from "../header/UserHeaderMain"
import { PublicationPosts } from "../../general-components/publication-lists/PublicationPosts";
import { FooterNav } from "../footer-navigate/FooterNav";

export const NewsFeeds = () => {

    const navigate = useNavigate()

   const  notification = () => {}
    const messenger = () => {}
   const  publish = () => {}


    return (
        <div className="user">
            <UserHeaderMain />
            <Routes>
                <Route path="all" element={<PublicationPosts />} />
                <Route path="" element={<PublicationPosts />} />
            </Routes>
        </div>
    )
}
