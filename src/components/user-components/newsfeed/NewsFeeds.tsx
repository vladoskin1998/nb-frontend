import { useNavigate } from "react-router-dom";
import { UserHeaderMain } from "../header/UserHeaderMain"

export const NewsFeeds = () => {

    const navigate = useNavigate()

   const  notification = () => {}
    const messenger = () => {}
   const  publish = () => {}


    return (
        <div className="user">
            <UserHeaderMain />
        </div>
    )
}
