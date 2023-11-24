import React from "react"
import { ChatMessage } from "../../general-components/messenger/ChatMessage"
import { UserHeaderChat } from "../header/UserHeaderChat"

export const MessegesChatMessage = () => {
    return (
        <>
            <UserHeaderChat />
            <ChatMessage />
        </>
    )
}
