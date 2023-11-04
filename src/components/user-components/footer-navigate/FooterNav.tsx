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
import { Link, useLocation, useNavigate } from "react-router-dom"
import { isShowFooterNavUser } from "../../../utils/titles"

export const FooterNav = () => {
    const { avatarFileName } = useAppSelector((s) => s.profileReducer)
    const [active, setActive] = useState(1)
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div className="user__footer" style={{
            display: `${isShowFooterNavUser(location.pathname) ? "grid" : "none" }`
        }}  >
            <div
                className={`user__footer--border user__footer--border-${active}`}
            />
            <button
                className={active === 1 ? "user__footer--active" : ""}
                onClick={() => {
                    setActive(1)
                    navigate('/user')
                }}
            >
                <IconFooterNavHome />
                <p>Newsfeed</p>
            </button>
            <button
                className={active === 2 ? "user__footer--active" : ""}
                onClick={() => {setActive(2)
                    navigate('/user/explore')
                }}
            >
                <IconFooterNavExplore />
                <p>Explore</p>
            </button>
            <button
                className={active === 3 ? "user__footer--active" : ""}
                onClick={() => {setActive(3)
                    navigate('/user/service')
                }}
            >
                <IconFooterNavServices />
                <p>Service</p>
            </button>
            <button
                className={active === 4 ? "user__footer--active" : ""}
                onClick={() => {setActive(4)
                    navigate('/user/activities')
                }}
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
