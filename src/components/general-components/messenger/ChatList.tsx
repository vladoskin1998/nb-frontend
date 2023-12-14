import React, { useEffect, useState } from "react"
import { InputSearch } from "../../ui/InputSearch"
import moment from "moment"
import { baseURL, roleUrl } from "../../../utils/config"
import { Link, useNavigate } from "react-router-dom"
import $api from "../../../http"
import { useAppSelector } from "../../../utils/hooks"
import { AxiosResponse } from "axios"
import { ChatType, ParticipantType } from "../../../types/types"
import { GetStartedMessenger } from "./GetStartedMessenger"
import { Loader } from "../../ui/Loader"

export const ChatList = ({
    isSupport = false,
    search,
}: {
    isSupport?: boolean
    search?: string
}) => {
    const [chatsList, setChatsList] = useState<ChatType[]>([])
    const { _id, role } = useAppSelector((s) => s.userReducer)
    const navigate = useNavigate()
    const [load, setLoad] = useState(true)

    useEffect(() => {
        $api.post("messenger/list-chat", { _id, isSupport })
            .then((r: AxiosResponse<ChatType[]>) => {
                const list = r.data.map((item) => ({
                    ...item,
                    participants: item.participants.filter(
                        (p) => p.userId._id !== _id
                    ),
                }))
                setChatsList(list)
                setLoad(false)
            })
            .catch(() => {
                setLoad(false)
            })
    }, [])

    const openChat = (participants:ParticipantType[]) => {
        // navigate(`${roleUrl(role)}/messeges/chat`, {
        //     state: {
        //         participants: [
        //             {
        //                 userId: _id,
        //             },
        //         ],
        //     },
        // })
        navigate(`chat?userId=${JSON.stringify(participants)}`, {
            state: {
                participants:participants,
            },
        })
    }

    // const openChat = () => {
    //     navigate(`${roleUrl(role)}/messeges/chat`, {
    //         state: {
    //             participants: [
    //                 {
    //                     userId: props?._id,
    //                 },
    //             ],
    //         },
    //     })
    // }


    return (
        <>
            {load ? (
                <Loader />
            ) : (
                <>
                    {chatsList.length ? (
                        <div className="messenger">
                            <div className="messenger__list">
                                {(search
                                    ? chatsList.filter((item) =>
                                          item.participants[0].userId.fullName
                                              .toLocaleLowerCase()
                                              .includes(
                                                  search.toLocaleLowerCase()
                                              )
                                      )
                                    : chatsList
                                ).map((item, key) => (
                                    <>
                                        {item?.lastMessage &&
                                            item.lastMessage?.content && (
                                                <div
                                                    className="messenger__list-item"
                                                    onClick={() => {
                                                        if(item?.participants){
                                                            openChat(item?.participants)
                                                            console.log(item.participants)
                                                        }
                                                    }
                                                        // openChat({
                                                        //     userId: item
                                                        //         ?.participants?.[0]
                                                        //         ?.userId._id,
                                                        // })
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            item?.participants[0].userId?.avatarFileName ? `${baseURL}/uploads/avatar/${item?.participants[0].userId?.avatarFileName}`
                                                                : "/Images/Profile.jpg"
                                                        }
                                                        alt=""
                                                    />
                                                    <div>
                                                        <h5 className="messenger__list-item-name">
                                                        { item.groupName ? item.groupName : item?.participants[0]?.userId.fullName}
                                                            {/* {
                                                                item
                                                                    ?.participants?.[0]
                                                                    ?.userId
                                                                    ?.fullName
                                                            } */}
                                                        </h5>
                                                        <p
                                                            className={`messenger__list-item-message
                                            ${
                                                // !item.lastMessage?.isRead &&
                                                // !item.notReadingMessage.length &&
                                                "messenger__list-item-message--notread"
                                            }`}
                                                        >
                                                            {
                                                                item.lastMessage
                                                                    ?.content
                                                            }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <div className="messenger__list-item-time">
                                                            {moment(
                                                                item.lastMessage
                                                                    ?.timestamp
                                                            ).format(
                                                                "MMM D, h:mm A"
                                                            )}
                                                        </div>
                                                        {Boolean(
                                                            // item
                                                            //     .notReadingMessage
                                                            //     .length
                                                        ) && (
                                                            <div className="messenger__list-item-nummes">
                                                                {
                                                                    // item
                                                                    //     .notReadingMessage
                                                                    //     .length
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                    </>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <GetStartedMessenger />
                    )}
                </>
            )}
        </>
    )
}
