import { UserItemView } from "./UserItemView"
import { UserItemModal } from "./UserItemModal"
import { useEffect, useState } from "react"
import { UserInitialStateInterface } from "../../../reducer/users"
import $api from "../../../http"
import { AxiosResponse } from "axios"
import { UserIdentityInterface } from "../../../services/profile"
import { useNavigate } from "react-router-dom"
import { roleUrl } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"

interface UserItemModuleProps extends UserInitialStateInterface {
    blockUser: (id: string) => void
    deleteUser: (id: string) => void
}

export const UserItemModule = (props: UserItemModuleProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [userIdentity, setUserIdentity] = useState<UserIdentityInterface | null>(null)
    const navigate = useNavigate()
    const {role} = useAppSelector(s => s.userReducer)

    const handlerBlockUser = () => {
        props.blockUser(props._id)
    }

    const handlerDeleteUser = () => {
        props.deleteUser(props._id)
    }

    useEffect(() => {
        $api.post("identity/get-user-identity", { _id: props._id })
            .then((res: AxiosResponse<UserIdentityInterface>) => 
            setUserIdentity(res.data)
            )
    }, [props])

    const openChat = () => {
        navigate(`${roleUrl(role)}/messeges/chat`, {
            state: [
                {
                    avatarFileName: userIdentity?.avatarFileName,
                    fullName: props?.fullName,
                    userId: props?._id,
                },
            ],
        })
    }

    return (
        <>
            <UserItemView {...props} setIsOpen={() => setIsOpen(true)}  userIdentity={userIdentity}/>
            <UserItemModal
            openChat={openChat}
                isOpen={isOpen}
                setIsOpen={(o: boolean) => setIsOpen(o)}
                handlerBlockUser={handlerBlockUser}
                handlerDeleteUser={handlerDeleteUser}
            />
        </>
    )
}
