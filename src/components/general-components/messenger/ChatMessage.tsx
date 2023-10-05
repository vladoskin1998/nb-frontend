import TextareaAutosize from "@mui/material/TextareaAutosize"
import { useState, useContext, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { IconArrachFile } from "../../svg/IconArrachFile"
import { useAppSelector } from "../../../utils/hooks"
import moment from "moment"
import { SocketContext } from "../../../context/SocketContext"
import { SOCKET_MESSENDER_EVENT } from "../../../types/enum"
import $api from "../../../http"
import { AxiosResponse } from "axios"
import { MessageType, OpenChatData } from "../../../types/types"

export const ChatMessage = () => {
    const { _id, fullName } = useAppSelector((s) => s.userReducer)
    const { avatarFileName } = useAppSelector((s) => s.profileReducer)
    const { socket } = useContext(SocketContext)
    const [messageList, setMessageList] = useState<MessageType[]>([])
    const [message, setMessage] = useState("")
    const [chatId, setChatId] = useState("")
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    
    const location = useLocation()

    const props: {
        userId: string
        avatarFileName: string
        fullName: string
    }[] = location.state

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value)
    }

    useEffect(() => {
        const effectBody = async () => {
            const resOpenChat: AxiosResponse<OpenChatData> = await $api.post(
                "messenger/open-chat",
                {
                    participants: [
                        ...props,
                        {
                            userId: _id,
                            avatarFileName,
                            fullName,
                        },
                    ],
                }
            )

            setChatId(resOpenChat.data.chatId)

            const resMessageList: AxiosResponse<MessageType[]> =
                await $api.post("messenger/list-message", {
                    chatId: resOpenChat.data.chatId,
                })

            setMessageList(resMessageList.data)

            if (socket) {
                socket.current?.emit(
                    SOCKET_MESSENDER_EVENT.JOIN_ROOM,
                    String(resOpenChat.data.chatId)
                )
                socket.current?.on(
                    SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE,
                    (
                        chatId: string,
                        senderId: string,
                        content: string,
                        timestamp: Date,
                        isRead: boolean
                    ) => {
                        setMessageList((s) => [
                            ...s,
                            { chatId, senderId, content, timestamp, isRead },
                        ])
                    }
                )
            }
        }

        effectBody()
    }, [])

    const sendMessage = () => {
        if (socket) {
            socket.current?.emit(SOCKET_MESSENDER_EVENT.SEND_PRIVATE_MESSAGE, {
                chatId,
                senderId: _id,
                content: message,
                timestamp: new Date(),
                isRead: true,
            })
            setMessageList((s) => [
                ...s,
                {
                    chatId,
                    senderId: _id,
                    content: message,
                    timestamp: new Date(),
                    isRead: true,
                },
            ])
            setMessage("")
        }
    }

    useEffect(() => {
        if (messagesContainerRef.current && messageList.length > 0) {
            console.log( messagesContainerRef);
            
            window.scrollTo(0, messagesContainerRef.current.scrollHeight + 45);
        }
      }, [messageList]);

    return (
        <>
            <div className="messenger__chat-messages" ref={messagesContainerRef}>
                {messageList.map((item) => (
                    <div
                        className={`messenger__chat-messages-message messenger__chat-messages-message-${
                            item?.senderId === _id ? "r" : "l"
                        }`}
                    >
                        <div>{item?.content}</div>
                        <div className="messenger__chat-messages-message-time">
                            {moment(item?.timestamp).format("h:mm A")}
                        </div>
                    </div>
                ))}
            </div>
            <div className="messenger__chat-sender-body">
                <div className="messenger__chat-sender">
                    <button className="messenger__chat-sender-attach">
                        <IconArrachFile />
                    </button>

                    <TextareaAutosize
                        value={message}
                        onChange={handleChange}
                        className="messenger__chat-sender-autoresize"
                        minRows={1}
                        placeholder="Enter message"
                    />

                    <button
                        className={`messenger__chat-sender-send ${
                            !message && "messenger__chat-sender-send--disabled"
                        }`}
                        onClick={sendMessage}
                        disabled={!message}
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    )
}
