import React, { useState, useEffect } from "react"
import { InputSearch } from "../../ui/InputSearch"
import { UserInitialStateInterface, setLoader } from "../../../reducer/users"
import { UserHttp } from "../../../http/user-http"
import { ROLES } from "../../../types/enum"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { IdentityHttp } from "../../../http/identity-http"
import { UserIdentityInterface } from "../../../services/profile"
import { baseURL, roleUrl } from "../../../utils/config"
import { FriendTypeResponse } from "../../../types/types"
import { Loader } from "../../ui/Loader"
import { useNavigate } from "react-router-dom"


export const UserItem = React.memo((props: FriendTypeResponse) => {
    const [userIdentity, setUserIdentity] =
        useState<UserIdentityInterface | null>(null)
    const navigate = useNavigate()
    const {role} = useAppSelector(s => s.userReducer)

    useEffect(() => {
        const effectBody = async () => {
            const res = await IdentityHttp.getUserIdentity({
                _id: props?.friendId._id,
                options: ["online"],
            })
            if (props?.friendId._id) {
                setUserIdentity(res)
            }
        }

        effectBody()
    }, [props])

    const toProfileInfo = async () => {
        navigate("/profileinfo", {
            state: {
                ...props.friendId
            },
        })
    }

    const openChat = () => {
        navigate(`${roleUrl(role)}/messeges/chat`, {
            state: {
                participants: [
                    {
                        userId: props?.friendId?._id,
                    },
                ],
            },
        })
    }

    return (
        <div className="messenger__alluser-item">
            <div
                className="messenger__alluser-item-img"
                onClick={toProfileInfo}
            >
                <img
                    src={`${baseURL}/uploads/avatar/${props?.friendId.avatarFileName}`}
                    alt=""
                />
            </div>
            <div className="messenger__alluser-item-text" onClick={openChat}>
                <h5 className="messenger__alluser-item-title">
                    {props?.friendId?.fullName}
                </h5>
                <h5 className="messenger__alluser-item-subtitle">
                    {userIdentity?.online}
                </h5>
            </div>
        </div>
    )
})

export const FriendUserChatList = () => {
    
    const [search, setSearch] = useState("")
    const [friend, setFriend] = useState<FriendTypeResponse[]>([])
    const [friendFiltered, setFriendFiltered] = useState<FriendTypeResponse[]>([])
    const { _id } = useAppSelector((s) => s.userReducer)
    const [letters, setLetters] = useState<string[]>([])
    const [load, setLoad] = useState(false)

    
    const rightPanelLetter = (res: FriendTypeResponse[]) => {
        if (res) {
            setLetters(
                res
                    .map((it) => it.friendId.fullName[0].toLocaleLowerCase())
                    .filter((it, id) => {
                        if (!id) {
                            return true
                        }
                        if (
                            it !==
                            res[id - 1].friendId.fullName[0].toLocaleLowerCase()
                        ) {
                            return true
                        }
                        return false
                    })
            )
        }
      
    }

    const getFrined = async () => {
        //добавить поиск
        setLoad(true)
        const res = await UserHttp.getMyFriends({
            _id,
        })

        setFriend(res)
        rightPanelLetter(res)
        setLoad(false)
    }


    useEffect(() => {
        getFrined()
    },[])

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            const friendsSearch = friend.filter(item => item.friendId.fullName.includes(search)) 
            setFriendFiltered(friendsSearch)
            rightPanelLetter(friendsSearch)
        }, 1000)
        return () => clearTimeout(timeOutId)
    }, [search])



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
                    <div className="messenger__alluser--letters">
                        {letters.map((item) => (
                            <div>{item.toUpperCase()}</div>
                        ))}
                    </div>
                    <div className="messenger__alluser">
                        {friendFiltered.map((item, index) => (
                            <>
                                {!index && (
                                    <div className="messenger__alluser--letter">
                                        {item.friendId.fullName[0].toUpperCase()}
                                    </div>
                                )}

                                {index &&
                                item.friendId.fullName[0].toLocaleLowerCase() !==
                                    friend[
                                        index - 1
                                    ].friendId.fullName[0].toLocaleLowerCase() ? (
                                    <div className="messenger__alluser--letter">
                                        {item.friendId.fullName[0].toUpperCase()}
                                    </div>
                                ) : (
                                    <></>
                                )}

                                <UserItem {...item} />
                            </>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
