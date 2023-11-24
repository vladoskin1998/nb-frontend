import React, { useState, useEffect } from "react"
import { InputSearch } from "../../ui/InputSearch"
import { UserInitialStateInterface, setLoader } from "../../../reducer/users"
import { UserHttp } from "../../../http/user-http"
import { ROLES } from "../../../types/enum"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { IdentityHttp } from "../../../http/identity-http"
import { UserIdentityInterface } from "../../../services/profile"
import { baseURL } from "../../../utils/config"

export const AllUserChatList = () => {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState<UserInitialStateInterface[]>([])
    const { _id } = useAppSelector((s) => s.userReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setLoader(true))
        const timeOutId = setTimeout(() => {
            if(search){
                 getUsers()
            }
           
        }, 1000)
        return () => clearTimeout(timeOutId)
    }, [search])

    const getUsers = async () => {
        const res: UserInitialStateInterface[] = await UserHttp.getUsers({
            _id,
            role: ROLES.ALLUSERS,
            searchName: search,
        })

        setUsers(res)
        dispatch(setLoader(false))
    }

    return (
        <div>
            <div className="user__newsfeed-search">
                <InputSearch
                    placeholder={
                        <>
                            Search <b>NightborChats</b>
                        </>
                    }
                    value={search}
                    changeValue={setSearch}
                />
            </div>
            <div className="messenger__alluser">
                {users.map((item) => (
                    <UserItem {...item}/>
                ))}
            </div>
        </div>
    )
}



export const UserItem = (props:UserInitialStateInterface) => {

    const [userIdentity, setUserIdentity] =
    useState<UserIdentityInterface | null>(null)
    const [isMyFriend, setIsMyFriend] = useState(false)
    const { _id } = useAppSelector(s => s.userReducer)

    useEffect(() => {
        const effectBody = async () => {
            const res = await IdentityHttp.getUserIdentity({ _id: props._id, options: ['avatarFileName'] })
            setUserIdentity(res)
        }

        effectBody()
    }, [props])


    const toFriend = async () => {
        if (props?._id === _id || !props?._id) {
            return
        }
        const payload = {
            _id,
            friendId: props?._id,
        }
        if (isMyFriend) {
            await UserHttp.deleteMyFriend(payload).then(() =>
                setIsMyFriend(false)
            )
        } else {
            await UserHttp.addMyFriend(payload).then(() => setIsMyFriend(true))
        }
    }

    useEffect(() => {
        if (props?._id && props?._id !== _id) {
            UserHttp.checkMyFriend({
                _id,
                friendId: props?._id,
            }).then((res) => setIsMyFriend(res))
        }
    }, [])

    return (
        <div className="messenger__alluser-item messenger__alluser-item-1">
            <div className="messenger__alluser-item-img">
                <img  src={`${baseURL}/uploads/avatar/${userIdentity?.avatarFileName}`} alt="" />
            </div>
            <div className="messenger__alluser-item-text">
                <h5 className="messenger__alluser-item-title">{props.fullName}</h5>
                <h5 className="messenger__alluser-item-subtitle">{props?.phone ? props?.phone : props?.email}</h5>
            </div>
            <button className={`messenger__alluser-item-button ${!isMyFriend && "messenger__alluser-item-button--active"}`} onClick={toFriend}>
                {!isMyFriend ? "Follow" : "Neib"}
            </button>
        </div>
    )
}