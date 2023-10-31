import { useLocation } from "react-router-dom"
import { UserItem } from "./ProfileInfo"
import { ProfileInfoAvatar } from "./ProfileInfoAvatar"
import { ProfileInfoPerProf } from "./ProfileInfoPerProf"
import { useEffect, useState } from "react"
import { IdentityHttp } from "../../../http/identity-http"
import { UserIdentityInterface } from "../../../services/profile"
import { useAppSelector } from "../../../utils/hooks"
import { Loader } from "../../ui/Loader"

export const ProfileInfoView = () => {
    const location = useLocation()
    const props: UserItem = location.state
    const myIdentity = useAppSelector((s) => s.profileReducer)
    const myUser = useAppSelector((s) => s.userReducer)
    const [data, setData] = useState<UserItem>()

    useEffect(() => {
        const effectBody = async () => {
            const res = await IdentityHttp.getUserIdentity({ _id: props._id })
            setData({
                ...props,
                userIdentity: res,
            })
        }

        if (location.state?._id) {
            effectBody()
        } else {
            setData({
                ...myUser,
                userIdentity: myIdentity,
            })
        }
    }, [props])

    return (
        <>
            {data ? (
                <>
                    <ProfileInfoAvatar props={data} />
                    <ProfileInfoPerProf props={data} />
                </>
            ) : (
                <Loader/>
            )}
        </>
    )
}
