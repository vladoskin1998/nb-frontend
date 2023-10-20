import React, { ReactNode } from "react"

export const UserHeader = ({ children }: { children?: ReactNode }) => {
    return <div className="user__header">{children}</div>
}
