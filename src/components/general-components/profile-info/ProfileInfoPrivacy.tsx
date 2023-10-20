import { IconProfileCircle } from "../../svg/IconProfile"

export const ProfileInfoPrivacy = () => {
    return (
        <div className="profileinfo__skillsinterets">
            <h5
                className="profileinfo__edit-title "
                style={{ marginTop: "20px" }}
            >
                Category Name
            </h5>
            <div className="profileinfo__notification-list">
                <div className="profileinfo__notification-item">
                    <span>Who can see my profile</span>
                    <button className="profileinfo__privacy-button">
                        Everyone
                        <IconProfileCircle />
                    </button>
                </div>
                <div className="profileinfo__notification-item">
                    <span>Who can see my profile</span>
                    <button className="profileinfo__privacy-button">
                        None
                        <IconProfileCircle />
                    </button>
                </div>

                <div className="profileinfo__notification-item">
                    <span>Who can see my profile</span>
                    <button className="profileinfo__privacy-button">
                        NetMate <IconProfileCircle />
                    </button>
                </div>
            </div>
            <button className={`profile__method-btlater `}>
                Update Notifications
            </button>
        </div>
    )
}
