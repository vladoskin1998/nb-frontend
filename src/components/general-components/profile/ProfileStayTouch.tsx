import { Link } from "react-router-dom"

export const ProfileStayTouch = () => {
    return (
        <>
            <div className="profile__method-body">
                <div className="profile__staytouch">
                    <img src="/Images/setUpNOtification.png" alt="" />
                </div>
            </div>
            <button className="profile__method-btlater profile__method-btlater--inherit">
                {/* <Link to={"/admin"}> */}
                Setup later
                {/* </Link> */}
            </button>
            <button className={`profile__method-btlater`}>
                <Link to={"/profile/welcome-neibs"}>Continue</Link>
            </button>
        </>
    )
}
