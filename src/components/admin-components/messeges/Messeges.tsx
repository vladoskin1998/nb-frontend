import { useState } from "react"
import { ChatList } from "../../general-components/messenger/ChatList"
import { ChatMessage } from "../../general-components/messenger/ChatMessage"
import { Routes, Route } from "react-router-dom"
import { AllUserChatList } from "../../general-components/messenger/AllUserChatList"
import { FriendUserChatList } from "../../general-components/messenger/FriendUserChatList"
import { AdminChatMessage } from "./AdminChatMessage"
export const Messeges = () => {
    return (
        <div className="admin">
            <Routes>
                <Route path="friend-user-chat" element={<FriendUserChatList />} />
                <Route path="all-user-chat" element={<AllUserChatList />} />
                <Route path="chat" element={<ChatMessage />} />
                <Route path="" element={<AdminChatMessage/>} />
            </Routes>
        </div>
    )
}
