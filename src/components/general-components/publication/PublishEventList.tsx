import React, { useEffect, useState } from "react"
import { Activities } from "../../../types/types"
import { ActivitiesHttp } from "../../../http/activities-http"
import { baseURL } from "../../../utils/config"

export const PublishEventList = ({
    activitiesId,
    setActivitiesId,
}: {
    activitiesId: string
    setActivitiesId: (s: string) => void
}) => {
    const [activities, setActivities] = useState<Activities[]>([])

    useEffect(() => {
        const effectBody = async () => {
            const res = await ActivitiesHttp.getAllActivities()
            setActivities(res)
        }
        effectBody()
    }, [])

    return (
        <div className="publish__activities-list">
            {activities.map((item) => (
                <div
                    className={`publish__activities-list-item ${
                        activitiesId === item._id &&
                        "publish__activities-list-item--active"
                    }`}
                    onClick={() => setActivitiesId(item._id)}
                >
                    <div className="publish__activities-list-item-img">
                        <img
                            src={`${baseURL}/uploads/activities/${item.fileName}`}
                            alt=""
                        />
                    </div>
                    <h6 className="publish__activities-list-item-title">
                        {item.name}
                    </h6>
                </div>
            ))}
        </div>
    )
}
