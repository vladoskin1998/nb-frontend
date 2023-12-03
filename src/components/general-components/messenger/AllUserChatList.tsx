import React, { useState, useEffect } from "react"
import { InputSearch } from "../../ui/InputSearch"
import { UserInitialStateInterface, setLoader } from "../../../reducer/users"
import { UserHttp } from "../../../http/user-http"
import { ROLES } from "../../../types/enum"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { IdentityHttp } from "../../../http/identity-http"
import { UserIdentityInterface } from "../../../services/profile"
import { baseURL, roleUrl } from "../../../utils/config"
import { Loader } from "../../ui/Loader"
import { useNavigate } from "react-router-dom"

export const UserItem = React.memo((props: UserInitialStateInterface) => {

    const [isMyFriend, setIsMyFriend] = useState(false)
    const { _id, role } = useAppSelector((s) => s.userReducer)
    const navigate = useNavigate()

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


    
    const toProfileInfo = () => {
        navigate("/profileinfo", {
            state: {
                ...props 
            },
        })
    }

    const openChat = () => {
        navigate(`${roleUrl(role)}/messeges/chat`, {
            state: {
                participants: [
                    {
                        userId: props?._id,
                    },
                ],
            },
        })
    }

    return (
        <div className="messenger__alluser-item messenger__alluser-item-1">
            <div className="messenger__alluser-item-img" onClick={toProfileInfo}>
                <img
                    src={`${baseURL}/uploads/avatar/${props?.avatarFileName}`}
                    alt=""
                />
            </div>
            <div className="messenger__alluser-item-text" onClick={openChat}>
                <h5 className="messenger__alluser-item-title">
                    {props.fullName}
                </h5>
                <h5 className="messenger__alluser-item-subtitle">
                    {props?.phone ? props?.phone : props?.email}
                </h5>
            </div>
            <button
                className={`messenger__alluser-item-button ${
                    !isMyFriend && "messenger__alluser-item-button--active"
                }`}
                onClick={toFriend}
            >
                {!isMyFriend ? "Follow" : "Neib"}
            </button>
        </div>
    )
})

export const AllUserChatList = () => {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState<UserInitialStateInterface[]>([])
    const { _id } = useAppSelector((s) => s.userReducer)
    const dispatch = useAppDispatch()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (search) {
                getUsers()
            }
        }, 1000)
        return () => clearTimeout(timeOutId)
    }, [search])

    const getUsers = async () => {
        setLoad(true)
        const res: UserInitialStateInterface[] = await UserHttp.getUsers({
            _id,
            role: ROLES.ALLUSERS,
            searchName: search,
        })
        setLoad(false)
        setUsers(res)
        dispatch(setLoader(false))
    }

    return (
        <>
            {load ? (
                <Loader />
            ) : (
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
                            <UserItem {...item} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
