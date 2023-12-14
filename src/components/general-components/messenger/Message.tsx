import { useContext, useEffect, useState } from "react"
import './../../../style/general/message.scss'
import { IconSmile } from "../../svg/IconSmile";
import { ModalSmile, ModalSmileLike } from "./ModalSmile";
import { Modal } from "../../ui/Modal";
import { ChatType, MessageType } from "../../../types/types";
import moment from "moment";
import { baseURL } from "../../../utils/config";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import $api from "../../../http";
import { useAppSelector } from "../../../utils/hooks";
import { SocketContext } from "../../../context/SocketContext";
import { SOCKET_MESSENDER_EVENT } from "../../../types/enum";


export const Message = (props:{senderId:string,index:number,updateList: (index:number, val:string)=>void, timeStamp:Date,chatId:string,Like:string | undefined,setLike:(o:string)=>void,audio:boolean,fileName:string | null,message: string, senderIdold: string, time:string, type:string, delete: ()=>void}, {isSupport=false}:{isSupport?:boolean}) => {

    const [Menu, setMenu] = useState(false);
    const [isOpenSmile, setIsOpenSmile] = useState(false)
    const { socket } = useContext(SocketContext)
    const [chatsList, setChatsList] = useState<ChatType[]>([])
    const { _id } = useAppSelector((s) => s.userReducer)

    // const navigate = useNavigate()

    const [IsOpenForward, setIsOpenForward] = useState(false);
    // const openChat = (props: {
    //     avatarFileName: string
    //     fullName: string
    //     userId: string
    // }) => {
    //     navigate(`chat?user=${JSON.stringify(props)}`, {
    //         state: {
    //             participants: [props]
    //         },
    //     })
    // }

    useEffect(() => {
        $api.post("messenger/list-chat", { _id, isSupport }).then(
            (r: AxiosResponse<ChatType[]>) => {
                const list = r.data.map((item) => ({
                    ...item,
                    participants: item.participants.filter(
                        (p) => p.userId._id !== _id
                    ),
                }))
                setChatsList(list)
            }
        )
    }, [])
    return(
        <div className="messenger__chat__after__content__section">
            <div className="messanger__chat__dot__menu">
            <button
                className="messenger__chat-sender-smile rowLine"
                onClick={() => {
                    setIsOpenSmile(true)
                }}>
                <IconSmile />
            </button>
                <div className="messanger__chat__dot__menu__btn" onClick={(e)=>{
                    setMenu(!Menu);
                }}>...</div>                       
                <div className="messenger__chat-messages-message-time">
                    {props.time}
                </div>
            </div>
            <div className={Menu ? `messanger__chat__dot__menu__child.active` : `messanger__chat__dot__menu__child`} >
                <div className="messanger__chat__dot__menu__child__btn" onClick={()=>{setIsOpenForward(true)}}>Forward</div>
                {props.type === "r" ? <div className="messanger__chat__dot__menu__child__btn del" onClick={props.delete}>Delete</div> : ""}
            </div>
            {isOpenSmile && (
                <ModalSmileLike
                    setIsOpenSmile={setIsOpenSmile}
                    chatId={props.chatId}
                    timeStamp={props.timeStamp}
                    fileName={props.fileName}
                    updateList={props.updateList}
                    index={props.index}
                    senderId={props.senderId}
                    // setLike={props.setLike}
                    // message={message}
                />
            )}
            {IsOpenForward && (
                     <div className="messenger__chat-modal">
                     <Modal className="" setIsOpen={setIsOpenForward}>
                     <div className="messenger__list">
                         <span>Forward To:</span>
                         {chatsList.map((item) => (
                             <div
                                 className="messenger__list-item"
                                 onClick={() =>
                                    {
                                        if (socket) {
                                            socket.current?.emit(SOCKET_MESSENDER_EVENT.FORWARD_PRIVATE_MESSAGE, {
                                                chatId:item.chatId,
                                                senderIdold: props.senderIdold,
                                                content: props.message,
                                                timestamp: props.time,
                                                senderId:_id,
                                                file:props.fileName,
                                                audio:props.audio
                                            })
                                        };
                                        console.log(item?.participants[0].userId)
                                        setIsOpenForward(false);
                                        // openChat(
                                        //     {
                                        //         avatarFileName:
                                        //         item?.participants[0]?.avatarFileName,
                                        //         fullName: item?.participants[0]?.fullName,
                                        //         userId: item?.participants[0]?.userId,
                                        //     }
                                        // );
                                    }
                                 }
                             >
                                 <img
                                     src={
                                         item?.participants[0]?.userId.avatarFileName
                                             ? `${baseURL}/uploads/avatar/${item?.participants[0]?.userId.avatarFileName}`
                                             : "/Images/Profile.jpg"
                                     }
                                     alt=""
                                     className="img__modal__list"
                                 />
                                 <div className="messenger__list-item-name-message-container">
                                     <h5 className="messenger__list-item-name">
                                         {item?.participants[0]?.userId.fullName}
                                     </h5>
                                     <div className="messenger__list-item-time">
                                         {moment(item.lastMessage?.timestamp).format(
                                             "MMM D, h:mm A"
                                         )}
                                     </div>
                                 </div>
                                 
                             </div>
                         ))}
                     </div>
                     </Modal>        
                 </div>
                )
            }
        </div>
    )
}
