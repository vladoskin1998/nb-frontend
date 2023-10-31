import React from "react"
import { baseURL } from "../../../utils/config"

export const PublicationPostCommentsView = ({
    avatar
}:{ avatar: string[]}) => {
    return (
        <div className="commenst__view">
            <div className="commenst__user-img">
                <img
                    src={`${baseURL}/uploads/avatar/${avatar[0]}`}
                    alt=""
                />
            </div>
            <div className="commenst__user-img">
                <img
                    src={`${baseURL}/uploads/avatar/${avatar[1]}`}
                    alt=""
                />
            </div>
            <div className="commenst__user-img">
                <img
                    src={`${baseURL}/uploads/avatar/${avatar[2]}`}
                    alt=""
                />
            </div>
        </div>
    )
}
