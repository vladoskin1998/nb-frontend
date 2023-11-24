import React, { useEffect, useState } from "react"
import { InputSearch } from "../../ui/InputSearch"
import moment from "moment"
import { baseURL } from "../../../utils/config"
import { Link, useNavigate } from "react-router-dom"
import $api from "../../../http"
import { useAppSelector } from "../../../utils/hooks"
import { AxiosResponse } from "axios"
import { ChatType } from "../../../types/types"
import { GetStartedMessenger } from "./GetStartedMessenger"

export const ChatList = ({ isSupport = false }: { isSupport?: boolean }) => {
    const [search, setSearch] = useState("")
    const [chatsList, setChatsList] = useState<ChatType[]>([])
    const { _id } = useAppSelector((s) => s.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        $api.post("messenger/list-chat", { _id, isSupport }).then(
            (r: AxiosResponse<ChatType[]>) => {
                const list = r.data.map((item) => ({
                    ...item,
                    participants: item.participants.filter(
                        (p) => p.userId !== _id
                    ),
                }))
                setChatsList(list)
            }
        )
    }, [])

    const openChat = (props: {
        avatarFileName: string
        fullName: string
        userId: string
    }) => {
        navigate(`chat?user=${JSON.stringify(props)}`, {
            state: {
                participants: [props],
            },
        })
    }

    return (
        <>
            {chatsList.length ? (
                <div className="messenger">
                    <InputSearch
                        placeholder={"Search NightborChats"}
                        value={search}
                        changeValue={setSearch}
                    />
                    <div className="messenger__list">
                        {chatsList.map((item) => (
                            <div
                                className="messenger__list-item"
                                onClick={() =>
                                    openChat({
                                        avatarFileName:
                                            item?.participants[0]
                                                ?.avatarFileName,
                                        fullName:
                                            item?.participants[0]?.fullName,
                                        userId: item?.participants[0]?.userId,
                                    })
                                }
                            >
                                <img
                                    src={
                                        item?.participants[0]?.avatarFileName
                                            ? `${baseURL}/uploads/avatar/${item?.participants[0]?.avatarFileName}`
                                            : "/Images/Profile.jpg"
                                    }
                                    alt=""
                                />
                                <div>
                                    <h5 className="messenger__list-item-name">
                                        {item?.participants[0]?.fullName}
                                    </h5>
                                    <p className="messenger__list-item-message">
                                        {item.lastMessage?.content}
                                    </p>
                                </div>
                                <div>
                                    <div className="messenger__list-item-time">
                                        {moment(
                                            item.lastMessage?.timestamp
                                        ).format("MMM D, h:mm A")}
                                    </div>
                                    {/* {item.numberMessages && (
                                <div className="messenger__list-item-nummes">
                                    {item.numberMessages}
                                </div>
                            )} */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <GetStartedMessenger/>
            )}
        </>
    )
}
