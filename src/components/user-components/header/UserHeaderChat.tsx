import { useNavigate, useSearchParams } from "react-router-dom"
import { IconProfileInfoNotification } from "../../svg/IconProfileInfo"
import {
    IconsNewsfeedMessenger,
    IconsNewsfeedPlus,
} from "../../svg/IconsNewsfeed"
import { UserHeader } from "./UserHeader"
import { useEffect, useState } from "react"
import { IconNeibs } from "../../svg/IconPassEye"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { baseURL, roleUrl } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"
import { InputSearch } from "../../ui/InputSearch"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import { UserHttp } from "../../../http/user-http"
import { HeaderMessageType } from "../../../types/types"
import { SlickCategories } from "../../ui/SlickCategories"

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
            const userId = searchParams.get("userId") || ""
            UserHttp.getUserById({ userId }).then((s) => setUser(s))
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
