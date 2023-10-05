import React, { useEffect, useState } from "react"
import { InputSearch } from "../../ui/InputSearch"
import moment from "moment"
import { baseURL } from "../../../utils/config"
import { Link, useNavigate } from "react-router-dom"
import $api from "../../../http"
import { useAppSelector } from "../../../utils/hooks"
import { AxiosResponse } from "axios"
import { ChatType } from "../../../types/types"

const chatList = [
    {
        avatarFileName: "",
        chatId: "",
        userName: "User Name",
        senderId: "",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis minima dolore architecto, non facere enim ea. Amet necessitatibus, nihil, voluptatibus, id aut quas iste minima deleniti porro delectus provident modi!",
        timestamp: new Date(),
        numberMessages: 1,
    },
]

export const ChatList = () => {
    const [search, setSearch] = useState("")
    const [chatsList, setChatsList] = useState<ChatType[]>([])
    const { _id } = useAppSelector((s) => s.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        $api.post("messenger/list-chat", { _id }).then(
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
        navigate(`chat`, {
            state: [props],
        })
    }

    return (
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
                                    item?.participants[0]?.avatarFileName,
                                fullName: item?.participants[0]?.fullName,
                                userId: item?.participants[0]?.userId,
                            })
                        }
                    >
                        <img
                            src={`${baseURL}/uploads/avatar/${item?.participants[0]?.avatarFileName}`}
                            alt=""
                        />
                        <div>
                            <h5 className="messenger__list-item-name">
                                {item?.participants[0]?.fullName}
                            </h5>
                            <p className="messenger__list-item-message">
                                {item.lastMessage.content}
                            </p>
                        </div>
                        <div>
                            <div className="messenger__list-item-time">
                                {moment(item.lastMessage.timestamp).format(
                                    "MMM D, h:mm A"
                                )}
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
    )
}
