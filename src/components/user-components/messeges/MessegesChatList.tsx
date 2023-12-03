import React, { useState } from "react"
import { UserHeaderChat } from "../header/UserHeaderChat"
import { ChatList } from "../../general-components/messenger/ChatList"

export const MessegesChatList = () => {
    const [search, setSearch] = useState("")
    const [isActiveSearch, setIsActiveSearch] = useState(false)

    return (
        <div className={`user__chat ${isActiveSearch && "user__chat--active"}`}>
            <UserHeaderChat
                search={search}
                setSearch={setSearch}
                isActiveSearch={isActiveSearch}
                setIsActiveSearch={setIsActiveSearch}
            />
            <ChatList search={search} />
        </div>
    )
}
