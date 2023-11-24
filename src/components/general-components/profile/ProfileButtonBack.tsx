import { useLocation, useNavigate } from "react-router-dom"
import { ButtonBackRoute } from "../../ui/ButtonBackRoute"
import { useEffect, useState } from "react"

export const ProfileButtonBack = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [route, setRoute] = useState("")

    const exit = () => {
        navigate(-1)
    }

    useEffect(() => {
        const localRoute = location.pathname
        setRoute(localRoute)
    }, [location])

    return (
        <div className="forget__back">
            {(() => {
                if (route === "/profile/stay-touch") {
                    return <></>
                } else if (route === "/profile/welcome-neibs") {
                    return (
                        <img
                            src="/Images/logoshort.png"
                            alt="error image"
                            style={{ marginLeft: "17px" }}
                        />
                    )
                } else {
                    return <ButtonBackRoute click={exit} />
                }
            })()}
        </div>
    )
}
