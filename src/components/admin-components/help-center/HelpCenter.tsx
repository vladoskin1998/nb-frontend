import { useState } from "react"
import { ChatList } from "../../general-components/messenger/ChatList"
import { ChatMessage } from "../../general-components/messenger/ChatMessage"
import { Routes, Route } from "react-router-dom"
import { HelpCenterChat } from "./HelpCenterChat"
export const HelpCenter = () => {
    return (
        <div className="admin">
            <Routes>
                <Route path="chat" element={<HelpCenterChat />} />
                <Route path="*" element={<ChatList isSupport={true} />} />
            </Routes>
        </div>
    )
}
