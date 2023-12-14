import TextareaAutosize from "@mui/material/TextareaAutosize"
import { useState, useContext, useEffect, useRef, useCallback } from "react"
import { useLocation } from "react-router-dom"
import { IconArrachFile } from "../../svg/IconArrachFile"
import { useAppSelector } from "../../../utils/hooks"
import moment from "moment"
import { SocketContext } from "../../../context/SocketContext"
import { SOCKET_MESSENDER_EVENT } from "../../../types/enum"
import $api from "../../../http"
import { AxiosResponse } from "axios"
import { MessageType, OpenChatData, ParticipantType } from "../../../types/types"
import { IconSmile } from "../../svg/IconSmile"
import { ModalSmile } from "./ModalSmile"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { baseURL } from "../../../utils/config"
import { Message } from "./Message"
import { UserItem } from "../profile-info/ProfileInfo"
import { VoiceButton, VoiceMessage } from "./VoiceMessage"

export const ChatMessage = () => {

    const myRef = useRef<null | HTMLDivElement>(null)
    const { _id, fullName } = useAppSelector((s) => s.userReducer)
    const { socket } = useContext(SocketContext)
    const [messageList, setMessageList] = useState<MessageType[]>([])
    const [message, setMessage] = useState("")
    const [chatId, setChatId] = useState("")
    const [isOpenSmile, setIsOpenSmile] = useState(false)

    const [image, setImage] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [IsOpenVoice, setIsOpenVoice] = useState<boolean>(false);
    // const [NewMessage, setNewMessage] = useState<MessageType>();

    const [Like, setLike] = useState<string>("");

    const location = useLocation()

    const props: 
    {
        isSupport?:boolean,
        participants: ParticipantType[]
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
                        },
                    ],
                }
            )

            setChatId(resOpenChat.data.chatId)

            const resMessageList: AxiosResponse<MessageType[]> =
            await $api.post("messenger/list-message", {
                chatId: resOpenChat.data.chatId,
            })
        

            resMessageList.data.forEach(item => {
                if(!item.isRead && item.senderId !== _id){
                    $api.post('messenger/read-message',{messageId:item?.messageId})
                }
                });

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
                        file: string | null,
                        forward: boolean,
                        senderIdold: string,
                        audio: boolean,
                        like: string,
                        messageId:string
                    ) => {
                        setMessageList((s) => [
                            ...s,
                            { chatId, senderId, content, timestamp, isRead, file, forward, senderIdold, audio, like, messageId },
                        ])
                    }
                )
            }
        }

        effectBody()
    }, [])

    useEffect(() => {
        if ( myRef.current ) {
            myRef.current.scrollIntoView() 
        }
    }, [messageList, messageList.length])



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
                    file: fileName,
                    forward:false,
                    senderIdold:"",
                    audio:false,
                    like:"",
                    messageId:''
                },
            ])
            setMessage("")
            removeFile()
        }
    }

    const updateList = (NewMessage:MessageType) => {
        if(NewMessage) {
            setMessageList( (s) => [
                ...s,
                NewMessage,
            ]);
        }
    }

    const updateFieldChanged = (index:number, val:string) => {
        let newArr = [...messageList]; 
        newArr[index].like = val;
      
        setMessageList(newArr);
      }

    const removeFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
          }
        setImage(null)
        setImageUrl('')
    }
    


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

            >
                {messageList.map((item, index) => (
                    <div
                        className={`messenger__chat-messages-message messenger__chat-messages-message-${
                            item?.senderId === _id ? "r" : "l"
                        }`}
                    >
                        
                        {item.forward && <span className="forward">{`From: ${item.senderIdold}`}</span>}
                        {
                            item.file && !item.audio && <img src={`${baseURL}/uploads/messenger/${item.file}`} alt="" />
                        }
                        {
                            item.file && item.audio && <VoiceMessage Side={item?.senderId === _id ? "r": "l"} Audio={`${baseURL}/uploads/messenger/${item.file}`}/>
                        }
                        <div>{item?.content}</div>
                        {item?.like && <div className={`messanger__chat__like`} onClick={()=>{
                                     if (socket) {
                                        socket.current?.emit(SOCKET_MESSENDER_EVENT.DELETE_PRIVATE_MESSAGE_LIKE, {
                                            chatId,
                                            senderId: item.senderId,
                                            // likeSenderId
                                            timestamp:item.timestamp,
                                            like: Like,
                                            isRead: true,
                                        })
                                        updateFieldChanged(index, "");
                                    }
                            }}>{item.like}</div>}
                            {/* {item?.like ? <div className={`messanger__chat__like.active`}>{item.like}</div> : ""} */}
                            <Message senderId={item.senderId} index={index} updateList={updateFieldChanged} chatId={chatId} Like={Like} setLike={setLike} audio={item.audio} time={moment(item?.timestamp).format("h:mm A")} timeStamp={item.timestamp} delete={()=>{
                                        let fileName: null | string = null
                                        if (socket) {
                                            socket.current?.emit(SOCKET_MESSENDER_EVENT.DELETE_PRIVATE_MESSAGE, {
                                                chatId,
                                                senderId: _id,
                                                content: message,
                                                timestamp: item.timestamp,
                                                isRead: true,
                                                file: fileName
                                            })
                                        }
                                        let array = [...messageList]; 
                                        let index = array.indexOf(item)
                                        if (index !== -1) {
                                          array.splice(index, 1);
                                          setMessageList(array);
                                        }
                                        console.log(messageList);
                            }}
                            message={item.content} senderIdold={item.senderId} fileName={item.file} type={item.senderId===_id?"r":"l"}/>
                        </div>
                ))}
                <div ref={myRef}/>
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
                    <VoiceButton updateList={updateList} chatId={chatId} _id={_id} setIsOpenVoice={setIsOpenVoice} IsOpenVoice={IsOpenVoice}/>
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
