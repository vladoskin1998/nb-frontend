import { useState } from "react"
import { ChatList } from "../../general-components/messenger/ChatList"
import { ChatMessage } from "../../general-components/messenger/ChatMessage"
import { Routes, Route } from "react-router-dom"
export const Messeges = () => {
    return (
        <div className="admin">
            <Routes>
                <Route path="chat" element={<ChatMessage />} />
                <Route path="*" element={<ChatList/>} />
            </Routes>
            
        </div>
    )
}
