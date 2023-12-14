import React from "react"
import { ChatMessage } from "../../general-components/messenger/ChatMessage"
import { UserHeaderChat, UserHeaderUserChatMessage } from "../header/UserHeaderChat"

export const MessegesChatMessage = () => {

    return (
        <>
            <UserHeaderUserChatMessage />
            <ChatMessage />
        </>
    )
}
