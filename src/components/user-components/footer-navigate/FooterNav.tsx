import { useState } from "react"
import { baseURL } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"
import { IconAdminImage } from "../../svg/IconAdminHeader"
import {
    IconFooterNavHome,
    IconFooterNavActivities,
    IconFooterNavExplore,
    IconFooterNavServices,
} from "../../svg/IconFooterNav"
import { Link } from "react-router-dom"

export const FooterNav = () => {
    const { avatarFileName } = useAppSelector((s) => s.profileReducer)
    const [active, setActive] = useState(1)

    return (
        <div className="user__footer">
            <div
                className={`user__footer--border user__footer--border-${active}`}
            />
            <button
                className={active === 1 ? "user__footer--active" : ""}
                onClick={() => setActive(1)}
            >
                <IconFooterNavHome />
                <p>Newsfeed</p>
            </button>
            <button
                className={active === 2 ? "user__footer--active" : ""}
                onClick={() => setActive(2)}
            >
                <IconFooterNavExplore />
                <p>Explore</p>
            </button>
            <button
                className={active === 3 ? "user__footer--active" : ""}
                onClick={() => setActive(3)}
            >
                <IconFooterNavServices />
                <p>Service</p>
            </button>
            <button
                className={active === 4 ? "user__footer--active" : ""}
                onClick={() => setActive(4)}
            >
                <IconFooterNavActivities />
                <p>Activities</p>
            </button>
            <button
                className={active === 5 ? "user__footer--active" : ""}
                onClick={() => setActive(5)}
            >
                <Link to="/profile">
                    <div className="user__footer-profile">
                        {avatarFileName ? (
                            <img
                                src={`${baseURL}/uploads/avatar/${avatarFileName}`}
                                alt=""
                            />
                        ) : (
                            <IconAdminImage />
                        )}
                    </div>
                </Link>

                <p>Profile</p>
            </button>
        </div>
    )
}
