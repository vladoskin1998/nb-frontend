import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { IconProfileInfoNotification } from "../../svg/IconProfileInfo"
import {
    IconsNewsfeedMessenger,
    IconsNewsfeedPlus,
} from "../../svg/IconsNewsfeed"
import { UserHeader } from "./UserHeader"
import { ReactNode, useEffect, useState } from "react"
import { IconNeibs } from "../../svg/IconPassEye"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { baseURL, roleUrl } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"
import { InputSearch } from "../../ui/InputSearch"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import { UserHttp } from "../../../http/user-http"
import { ChatType, HeaderMessageType, ParticipantType } from "../../../types/types"
import { SlickCategories } from "../../ui/SlickCategories"
import { AxiosResponse } from "axios"
import $api from "../../../http"
import { Modal } from "../../ui/Modal"
import { IconMark } from "../../svg/IconMark"

export const UserHeaderChat = ({
    search,
    setSearch,
    isActiveSearch, setIsActiveSearch
}: {
    search: string
    setSearch: (s: string) => void

    isActiveSearch:boolean, setIsActiveSearch: (s: boolean) => void
}) => {
    const { role } = useAppSelector((s) => s.userReducer)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [openPublish, setOpenPublish] = useState<boolean>(false);
    const navigate = useNavigate()
  
    const toFriendUserChatList = () => {
        navigate(`${roleUrl(role)}/messeges/friend-user-chat`)
    }

    const toAllUserChatList = () => {
        navigate(`${roleUrl(role)}/messeges/all-user-chat`)
    }

    const onFocus = () => {
        setIsActiveSearch(true)
    }

    const onBlur = () => {
        setIsActiveSearch(false)
    }

    const toComments = (index: number, comment:string) => {
        setCurrentSlide(index)
        navigate(`${roleUrl(role)}/messeges/comments-${comment}`)
    }


    
    return (
        <UserHeader>
            {!isActiveSearch && (
                <div className="user__header-main user__header-main-chat">
                    <h5 className="user__header-title">NeighborHarbor</h5>
                    <div className="user__header-main-buttons">
                        <button
                            className="user__header-main-button"
                            onClick={toFriendUserChatList}
                        >
                            <IconNeibs />
                        </button>
                        <button
                            className="user__header-main-button"
                            onClick={toAllUserChatList}
                        >
                            <IconsNewsfeedPlus />
                        </button>
                        <button className="user__header-main-button"
                            onClick={()=>setOpenPublish(true)}
                        >
                            New Group
                        {/* <IconsNewsfeedPlus /> */}
                        </button>
                    </div>
                </div>
            )}

            <div
                className={`user__header-main-search ${
                    isActiveSearch && "user__header-main-search--active"
                }`}
            >
                <div className="user__header-main-search-input">
                    <InputSearch
                        placeholder={"Search NightborChats"}
                        value={search}
                        changeValue={setSearch}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                    {isActiveSearch && (
                        <button className="user__header-main-search--cancel">
                            Cancel
                        </button>
                    )}
                </div>

                <div className="activities__filter">
                    <SlickCategories>
                        {[
                            "All",
                            "Personal",
                            "Services",
                            "Activities",
                            "Posts",
                        ].map((item, index) => (
                            <div
                                className={`activities__filter-item ${
                                    index === currentSlide &&
                                    "activities__filter-item--active"
                                }`}
                                key={index}
                                onClick={() => 
                                    toComments(index, item.toLocaleLowerCase())
                                }
                            >
                                {item}
                            </div>
                        ))}
                    </SlickCategories>
                </div>
            </div>
            {openPublish && (
                <PublishModal setIsOpen={setOpenPublish}/>
            )}
        </UserHeader>
        
    )
}

export const UserHeaderUserChatList = ({
    headerTitle,
}: {
    headerTitle: string
}) => {
    const navigate = useNavigate()

    return (
        <UserHeader>
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="user__header-chatuser"
                >
                    <IconLeftChevrons />
                    <h5 className="user__header-title">{headerTitle}</h5>
                </button>
            </div>
        </UserHeader>
    )
}

export const UserHeaderUserChatMessage = () =>
    //     {
    //     headerTitle,
    // }: {
    //     headerTitle: string
    // }
    {
        const navigate = useNavigate()
        const [searchParams] = useSearchParams()
        const [user, setUser] = useState<HeaderMessageType>({
            avatarFileName: "",
            email: "",
            fullName: "",
        })
        useEffect(() => {
            const userId = searchParams.get("headerUserId") || ""
            if(userId){
                UserHttp.getUserById({ userId }).then((s) => setUser(s))
            }
         
        }, [])

        return (
            <UserHeader>
                <div className="user__header-messages">
                    <button
                        onClick={() => navigate(-1)}
                        className="user__header-chatuser user__header-messages-exit"
                    >
                        <IconLeftChevrons />
                    </button>
                    <div className="user__header-messages-img">
                        <img
                            src={`${baseURL}/uploads/avatar/${user.avatarFileName}`}
                            alt=""
                        />
                    </div>
                    <div>
                        <div className="user__header-messages-name">
                            {user.fullName}
                        </div>
                        <div className="user__header-messages-online">
                            {user.email}
                        </div>
                    </div>
                    <button>
                        <IconServicesAllPoint />
                    </button>
                </div>
            </UserHeader>
        )
    }
    export const PublishModal = (props:{setIsOpen:(o:boolean)=>void}, {isSupport=false}:{isSupport?:boolean}) => {
        const [chatsList, setChatsList] = useState<ChatType[]>([])
        const { _id, role } = useAppSelector((s) => s.userReducer)
        const {fullName} = useAppSelector((s)=>s.userReducer)
        const {avatarFileName} = useAppSelector((s)=>s.profileReducer as any)
        const [Participians, setParticipians] = useState<ParticipantType[]>([]);
        const [GroupName, setGroupName] = useState<string>("")
        const navigate = useNavigate()
        const location = useLocation();
    
    
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
        const updateParticipians = (obj:ParticipantType[]) => {
                let array = [...Participians]; 
                let index = array.indexOf(obj[0])
                if (!array.includes(array[index])) {
                        if(array.length==0){
                            array.push(obj[0]);
                            array.push(obj[1])
                            // array.push({userId:_id, avatarFileName:avatarFileName, fullName:fullName});
                            setParticipians(array);
                        }else{
                            setParticipians(s=>[
                                ...s,
                                obj[0]
                            ])
                        }
                }
        }
        const removeUser = (obj:ParticipantType[]) => {
            var array = [...Participians]; 
            var index = array.indexOf(obj[0])
            if (index !== -1) {
              array.splice(index, 1);
              setParticipians(array);
            }
        }
    
        // const { socket } = useContext(SocketContext)
        const openChat = () => {
                // navigate(`${roleUrl(role)}/messeges/chat`, {
                //     state: {
                //         groupName:GroupName,
                //         participants:Participians,
                //     },
                // })
                // console.log(location.state);
                let array = [...Participians]; 
                // array.push({userId:_id, avatarFileName:avatarFileName, fullName:fullName});
                // setParticipians(array);
                console.log(array);
                $api.post('messenger/new-chat', {participants:array, groupName:GroupName}).then(
                    ()=>{
                        navigate(`chat?userId=${JSON.stringify(array)}`, {
                            state: {
                                participants: array,
                            },
                        })
                        props.setIsOpen(false)
                    }
                );
        }
        return(
        <Modal className="group__pannel" setIsOpen={props.setIsOpen}>
            <span><b>Create New Group</b></span>
            <div className="new__group__form">
                <input onChange={(e)=>setGroupName(e.target.value)} type="text" name="groupName" className="group__chatName__input" placeholder="Enter your group name"/>
                <span className="new__group__title">Select group participians:</span>
                <div className="group__participians__select" style={{margin:"10px 0"}}>
                    {/* <input type="text" name="participians" className="group__chatName__input" placeholder="Select your group participians"/> */}
                    <div className="messenger__list">
                        {chatsList.map((item) => (
                        <UserElement removeParticipant={removeUser} participants={Participians} item={item.participants} updateParticipians={updateParticipians}>
                            <img
                                src={
                                    item?.participants[0]?.userId.avatarFileName
                                        ? `${baseURL}/uploads/avatar/${item?.participants[0]?.userId.avatarFileName}`
                                        : "/Images/Profile.jpg"
                                }
                                alt=""
                            />
                            <div>
                                <h5 className="messenger__list-item-name">
                                    {item?.participants[0]?.userId.fullName}
                                </h5>
                            </div>
                        </UserElement>
                        ))}
                    </div>
                </div>   
                        <button
                            className={`${
                                (Participians.length<2 || GroupName.length<3) ? "messenger__chat-sender-send--disabled" : "messenger__chat-sender-send"
                            }`}
                            onClick={()=>{
                                openChat()
                            }}
                            disabled={(Participians.length<2 || GroupName.length<3)} // || GroupName !== item.chatName
                        >
                            Create
                        </button>   
            </div>
        </Modal>
        );
    }
    export const UserElement = (props:{removeParticipant:(obj:ParticipantType[])=>void, participants:ParticipantType[], item:ParticipantType[],updateParticipians:(obj:ParticipantType[])=>void, children:ReactNode}) => {
        const [userSelected, setuserSelected] = useState<boolean>(false)
        return(
            <div
            className="el" style={{justifyContent:"flex-start"}}
            onClick={(e) => {
                if(!userSelected){
                    setuserSelected(true)
                    props.updateParticipians(props.item);
                }else{
                    setuserSelected(false);
                    props.removeParticipant(props.item);
                }
            }}>
                    {props.item.length == 2 && userSelected && <div className="user__selected"><IconMark /></div> }
                    {props.children}
            </div>
        );
    }