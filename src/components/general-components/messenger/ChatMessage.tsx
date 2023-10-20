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

import { IconSmile } from "../../svg/IconSmile"
import { ModalSmile } from "./ModalSmile"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { baseURL } from "../../../utils/config"

export const ChatMessage = () => {
    const { _id, fullName } = useAppSelector((s) => s.userReducer)
    const { avatarFileName } = useAppSelector((s) => s.profileReducer)
    const { socket } = useContext(SocketContext)
    const [messageList, setMessageList] = useState<MessageType[]>([])
    const [message, setMessage] = useState("")
    const [chatId, setChatId] = useState("")
    const messagesContainerRef = useRef<HTMLDivElement | null>(null)
    const [isOpenSmile, setIsOpenSmile] = useState(false)

    const [image, setImage] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const location = useLocation()

    const props: 
    {
        isSupport?:boolean,
        participants: {
            userId: string
            avatarFileName: string
            fullName: string
        }[]
    } = location.state

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value)
    }

    useEffect(() => {
        const effectBody = async () => {
            const resOpenChat: AxiosResponse<OpenChatData> = await $api.post(
                "messenger/open-chat",
                {
                    isSupport: props?.isSupport ?  props?.isSupport : false,
                    participants: [
                        ...props.participants,
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
                        isRead: boolean,
                        file: string | null
                    ) => {
                        setMessageList((s) => [
                            ...s,
                            { chatId, senderId, content, timestamp, isRead, file },
                        ])
                    }
                )
            }
        }

        effectBody()
    }, [])

    const sendMessage = async () => {
        let fileName: null | string = null
        if (image) {
            const formData = new FormData()

            formData.append("file", image)

            const res:AxiosResponse<string> = await $api.post('messenger/file-message',formData)
            fileName = res.data
        }
     
        if (socket) {
            socket.current?.emit(SOCKET_MESSENDER_EVENT.SEND_PRIVATE_MESSAGE, {
                chatId,
                senderId: _id,
                content: message,
                timestamp: new Date(),
                isRead: true,
                file: fileName,
            })
            setMessageList((s) => [
                ...s,
                {
                    chatId,
                    senderId: _id,
                    content: message,
                    timestamp: new Date(),
                    isRead: true,
                    file: fileName
                },
            ])
            setMessage("")
            removeFile()
        }
    }

    const removeFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
          }
        setImage(null)
        setImageUrl('')
    }

    console.log(image, imageUrl, fileInputRef);
    
    useEffect(() => {
        if (messagesContainerRef.current && messageList.length > 0) {
            console.log(messagesContainerRef)
            window.scrollTo({
                top: messagesContainerRef.current.scrollHeight + 100,
                behavior: "smooth",
            })
        }
    }, [messageList])

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        setImage(file)
        if (file) {
            const url = URL.createObjectURL(file)
            setImageUrl(url)
        }
    }

    return (
        <>
            <div
                className="messenger__chat-messages"
                ref={messagesContainerRef}
            >
                {messageList.map((item) => (
                    <div
                        className={`messenger__chat-messages-message messenger__chat-messages-message-${
                            item?.senderId === _id ? "r" : "l"
                        }`}
                    >
                        {
                            item.file && <img src={`${baseURL}/uploads/messenger/${item.file}`} alt="" />
                        }
                        
                        <div>{item?.content}</div>
                        <div className="messenger__chat-messages-message-time">
                            {moment(item?.timestamp).format("h:mm A")}
                        </div>
                    </div>
                ))}
            </div>
            <div className="messenger__chat-sender-body">
                {imageUrl && (
                    <div className="messenger__chat-sender-file">
                        <img src={`${imageUrl}`} alt="" />
                        <div>{image?.name}</div>
                        <button onClick={removeFile}>
                            <IconAdminClose />
                        </button>
                    </div>
                )}
                <div className="messenger__chat-sender">
                    <label
                        htmlFor="file-avatar-profile"
                        className="messenger__chat-sender-attach"
                    >
                        <IconArrachFile />
                    </label>
                    <input
                        multiple={false}
                        id="file-avatar-profile"
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileSelect}
                    />
                    <button
                        className="messenger__chat-sender-smile"
                        onClick={() => setIsOpenSmile(true)}
                    >
                        <IconSmile />
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
            {isOpenSmile && (
                <ModalSmile
                    setIsOpenSmile={setIsOpenSmile}
                    setMessage={setMessage}
                    message={message}
                />
            )}
        </>
    )
}
