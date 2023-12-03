import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { UserServicesMain } from "./UserServicesMain"

export const UserServices = () => {
    return (
        <div className="user user--body">
            <Routes>
                {/* <Route path="publish-service" element={} />
                <Route path="publish-services" element={} />
                <Route path="special-services" element={} />
                <Route path="user-sub-service" element={} />
                <Route path="user-service" element={} /> */}
                <Route path="*" element={<UserServicesMain />} />
            </Routes>
        </div>
    )
}
