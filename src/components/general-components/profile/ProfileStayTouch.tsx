import { Link } from "react-router-dom"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"

export const ProfileStayTouch = () => {
    return (
        <>
            <div className="profile__method-body">
                <div className="profile__staytouch">
                    <img src="/Images/setUpNOtification.png" alt="" />
                </div>
            </div>
            <ProfileButtonSetupLater />
            <button className={`profile__method-btlater`}>
                <Link to={"/profile/welcome-neibs"}>Recieve Notifications</Link>
            </button>
        </>
    )
}
