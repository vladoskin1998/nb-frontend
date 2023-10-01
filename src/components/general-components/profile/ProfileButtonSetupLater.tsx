import { roleUrl } from "../../../utils/config"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../../utils/hooks"

export const ProfileButtonSetupLater = () => {
    const { role } = useAppSelector((s) => s.userReducer)
    return (
        <button className="profile__method-btlater profile__method-btlater--inherit">
            <Link to={roleUrl(role)}>Setup later</Link>
        </button>
    )
}
