import { Link } from "react-router-dom"

export const ProfileWelcomeNeibs = () => {
    return (
        <>
            <div className="profile__method-body">
                <div className="profile__family">
                    <div className="profile__welcome-item">
                        <h6>Be Yourself</h6>
                        <p>
                            Your photo, information, age, education, services
                            must be real
                        </p>
                    </div>
                    <div className="profile__welcome-item">
                        <h6>Respect Others</h6>
                        <p>
                            Be polite and considerate when interacting with
                            fellow users
                        </p>
                    </div>
                    <div className="profile__welcome-item">
                        <h6>Protect Privacy</h6>
                        <p>
                            Don’t share users personal or confidential
                            information without their explicit consent
                        </p>
                    </div>
                    <div className="profile__welcome-item">
                        <h6>No Offensive Content</h6>
                        <p>
                            Avoid posting unlawful, insulting, discriminatory,
                            or violent content
                        </p>
                    </div>
                </div>
            </div>
            <button className={`profile__method-btlater`}>
                <Link to={"/admin"}>Apply</Link>
            </button>
        </>
    )
}
