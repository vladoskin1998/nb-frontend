import { UserItemView } from "./UserItemView"
import { UserItemModal } from "./UserItemModal"
import { useEffect, useState } from "react"
import {
    UserInitialStateInterface,
    setValueUserReducer,
} from "../../../reducer/users"
import $api from "../../../http"
import { AxiosResponse } from "axios"
import { UserIdentityInterface } from "../../../services/profile"
import { useNavigate } from "react-router-dom"
import { roleUrl } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"
import { ROLES } from "../../../types/enum"
import { userTextInfo } from "../../../services/user"
import { useDispatch } from "react-redux"
import { LocationEditType } from "./UserEditMap"
import { UserHttp } from "../../../http/user-http"
import { success } from "../../ui/LoadSuccess"
import { IdentityHttp } from "../../../http/identity-http"

interface UserItemModuleProps extends UserInitialStateInterface {
    blockUser: (id: string) => void
    deleteUser: (id: string) => void
}

export const UserItemModule = (props: UserItemModuleProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [userIdentity, setUserIdentity] =
        useState<UserIdentityInterface | null>(null)
    const navigate = useNavigate()
    const { role } = useAppSelector((s) => s.userReducer)

    const handlerBlockUser = () => {
        props.blockUser(props._id)
    }

    const [itemRole, setItemRole] = useState<ROLES>(props.role)

    const handlerDeleteUser = () => {
        props.deleteUser(props._id)
    }

    useEffect(() => {
        const effectBody = async () => {
            const res = await IdentityHttp.getUserIdentity({ _id: props._id })
            setUserIdentity(res)
        }

        effectBody()
    }, [props])

    const openChat = () => {
        navigate(`${roleUrl(role)}/messeges/chat`, {
            state: {
                participants: [
                    {
                        avatarFileName: userIdentity?.avatarFileName,
                        fullName: props?.fullName,
                        userId: props?._id,
                    },
                ],
            },
        })
    }

    const changeRole = async (role: ROLES) => {
        try {
            await userTextInfo({
                role,
                _id: props._id,
            })
            setItemRole(role)
        } catch (error) {
            alert("set role is faild" + error)
        }
    }

    const changeLocation = (location: LocationEditType) => {
        if (userIdentity) {
            setUserIdentity({
                ...userIdentity,
                ...location,
            })
        }
    }

    const confirmLocation = async () => {
        try {
            if (
                userIdentity &&
                userIdentity?.coordinates &&
                userIdentity?.city &&
                userIdentity?.country &&
                userIdentity?.houseNumber &&
                userIdentity?.street
            ) {
                await UserHttp.changeLocation({
                    coordinates: userIdentity?.coordinates,
                    city: userIdentity?.city,
                    country: userIdentity?.country,
                    houseNumber: userIdentity?.houseNumber,
                    street: userIdentity?.street,
                    _id: props._id,
                })
                success()
                return
            }
            alert("Bad address")
        } catch (error) {}
    }

    return (
        <>
            <UserItemView
                {...props}
                role={itemRole}
                setIsOpen={() => setIsOpen(true)}
                userIdentity={userIdentity}
            />
            <UserItemModal
                role={itemRole}
                userIdentity={userIdentity}
                fullName={props?.fullName}
                openChat={openChat}
                isOpen={isOpen}
                setIsOpen={(o: boolean) => setIsOpen(o)}
                changeLocation={changeLocation}
                confirmLocation={confirmLocation}
                changeRole={changeRole}
                handlerBlockUser={handlerBlockUser}
                handlerDeleteUser={handlerDeleteUser}
            />
        </>
    )
}
