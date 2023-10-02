import { Link } from "react-router-dom"
import { IconRightChevrons } from "../../svg/IconChevrons"

export const ProfileInfoAboutNH = () => {
    return (
        <div className="profileinfo__aboutnb">
            <Link to="/profileinfo/termsofservice">
                <div className="profileinfo__aboutnb-item">
                    <p>Terms of Service</p>
                    <IconRightChevrons />
                </div>
            </Link>
            <Link to="/profileinfo/privacypolicy">
                <div className="profileinfo__aboutnb-item">
                    <p>Privacy Policy</p>
                    <IconRightChevrons />
                </div>
            </Link>
        </div>
    )
}
