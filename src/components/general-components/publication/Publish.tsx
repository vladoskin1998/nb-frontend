import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import { PublishService } from "./PublishService"
import { PublishEvent } from "./PublishEvent"
import { PublishPost } from "./PublishPost"
import { PublicationHeader } from "./PublishHeader"
import { PRIVACY } from "../../../types/enum"

export const Publish = () => {

    const [currentPrivacy, setCurrentPrivacy] = useState(PRIVACY.EVERYONE)
    
    return (
        <>
            <PublicationHeader currentPrivacy={currentPrivacy} setCurrentPrivacy={setCurrentPrivacy}/>
            <Routes>
                <Route path="post" element={<PublishPost currentPrivacy={currentPrivacy}/>} />
                <Route path="service" element={<PublishService currentPrivacy={currentPrivacy}/>} />
                <Route path="event" element={<PublishEvent currentPrivacy={currentPrivacy}/>} />
            </Routes>
        </>
    )
}
