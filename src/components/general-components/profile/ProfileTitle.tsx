import { useLocation } from "react-router-dom"
import { StandartTitleSubtitle } from "../../ui/StandartTitleSubtitle"
import { useEffect, useState } from "react"
import { profileTitle } from "../../../utils/titles"

export const ProfileTitle = () => {
    const [title, setTitle] = useState(profileTitle(""))
    const location = useLocation()
    const [route, setRoute] = useState("")

    useEffect(() => {
        const localRoute = location.pathname
        setTitle(profileTitle(localRoute))
        setRoute(localRoute)
    }, [location])

    return (
        <>
            {
                <div
                    style={{
                        textAlign:
                            route === "/profile/stay-touch"
                                ? "center"
                                : "start",
                    }}
                >
                    <StandartTitleSubtitle
                        title={title.tt}
                        subTitle={title.sbtt}
                    />
                </div>
            }
        </>
    )
}
