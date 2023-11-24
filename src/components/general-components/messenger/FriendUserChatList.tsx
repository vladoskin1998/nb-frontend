import React, { useState, useEffect } from "react"
import { InputSearch } from "../../ui/InputSearch"
import { UserInitialStateInterface, setLoader } from "../../../reducer/users"
import { UserHttp } from "../../../http/user-http"
import { ROLES } from "../../../types/enum"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { IdentityHttp } from "../../../http/identity-http"
import { UserIdentityInterface } from "../../../services/profile"
import { baseURL } from "../../../utils/config"
import { FriendTypeResponse } from "../../../types/types"

export const FriendUserChatList = () => {
    const [search, setSearch] = useState("")
    const [friend, setFriend] = useState<FriendTypeResponse[]>([])
    const { _id } = useAppSelector((s) => s.userReducer)
    const dispatch = useAppDispatch()
    const [letters,setLetters] = useState<string[]>([])

    useEffect(() => {
        dispatch(setLoader(true))
        const timeOutId = setTimeout(() => {
            getFrined()
        }, 1000)
        return () => clearTimeout(timeOutId)
    }, [search])

    const getFrined = async () => {
        const res = await UserHttp.getMyFriends({
            _id,
        })

        setFriend(res)
        if(res){
            setLetters(
                res.map(it => it.friendId.fullName[0].toLocaleLowerCase()).filter((it, id) => {
                    if(!id) {
                        return true
                    }
                    if(it !== res[id-1].friendId.fullName[0].toLocaleLowerCase()){
                        return true
                    }
                    return false
                })
            )
        }
        
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
            <div className="messenger__alluser--letters">
                {
                    letters.map(item => <div>{item.toUpperCase()}</div>)
                }
            </div>
            <div className="messenger__alluser">
                {friend.map((item, index) => (
                    <>
                        {!index && (
                            <div className="messenger__alluser--letter">
                                {item.friendId.fullName[0].toUpperCase()}
                            </div>
                        )}

                        {index &&
                        item.friendId.fullName[0].toLocaleLowerCase() !==
                            friend[index - 1].friendId.fullName[0].toLocaleLowerCase() ? (
                            <div className="messenger__alluser--letter">
                               { item.friendId.fullName[0].toUpperCase()}
                            </div>
                        ) : (
                            <></>
                        )}

                        <UserItem {...item} />
                    </>
                ))}
            </div>
        </div>
    )
}

export const UserItem = (props: FriendTypeResponse) => {
    const [userIdentity, setUserIdentity] =
        useState<UserIdentityInterface | null>(null)

    useEffect(() => {
        const effectBody = async () => {
            const res = await IdentityHttp.getUserIdentity({
                _id: props?.friendId._id,
                options: ["avatarFileName", "online"],
            })
            if (props?.friendId._id) {
                setUserIdentity(res)
            }
        }

        effectBody()
    }, [props])

    return (
        <div className="messenger__alluser-item">
            <div className="messenger__alluser-item-img">
                <img
                    src={`${baseURL}/uploads/avatar/${userIdentity?.avatarFileName}`}
                    alt=""
                />
            </div>
            <div className="messenger__alluser-item-text">
                <h5 className="messenger__alluser-item-title">
                    {props?.friendId?.fullName}
                </h5>
                <h5 className="messenger__alluser-item-subtitle">
                    {userIdentity?.online}
                </h5>
            </div>
        </div>
    )
}
