import { useLocation } from "react-router-dom"
import { StandartTitleSubtitle } from "../../ui/StandartTitleSubtitle"
import { useEffect, useState } from "react"
import { profileTitle } from "../../../utils/titles"

export const ProfileTitle = () => {
    const [title, setTitle] = useState(profileTitle(""))
    const location = useLocation()

    useEffect(() => {
        const localRoute = location.pathname
        setTitle(profileTitle(localRoute))
    }, [location])

    return <StandartTitleSubtitle title={title.tt} subTitle={title.sbtt} />
}
