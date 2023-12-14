import React, { useEffect, useState } from "react"
import { InputSearch } from "../../ui/InputSearch"
import { UserHeaderUserChatList } from "../header/UserHeaderChat"
import {
    GetAllPublishActivitiesInterface,
    GetAllPublishServicetInterface,
    PublishEventItemInterface,
    PublishServiceItemInterface,
} from "../../../types/types"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useInView } from "react-intersection-observer"
import { ServiceHttp } from "../../../http/service-http"
import { IconArrowRight } from "../../svg/IconArrow"
import { IconStars } from "../../svg/IconFavor"
import { IconProfileInfoBookmark } from "../../svg/IconProfileInfo"
import { baseURL } from "../../../utils/config"
import { USER_LIST_APP } from "../../../types/enum"
import { useAppSelector } from "../../../utils/hooks"
import { ActivitiesHttp } from "../../../http/activities-http"
import { UserPublishServicesModal } from "../services/UserPublishServicesModal"
// import { UserPublishServicesModal } from "./UserPublishServicesModal"

export const UserPublishActivitiesList = ({
    event,
}: {
    event: USER_LIST_APP
}) => {
    const [searsh, setSearch] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [searchParams] = useSearchParams()
    const [allPageNumber, setAllPageNumber] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [publishActivities, setPublishActivities] = useState<
        PublishEventItemInterface[]
    >([])
    const navigate = useNavigate()

    const [currentIdActivities, setCurrentIdActivities] = useState("")

    const { ref, inView } = useInView({
        threshold: 0,
    })

    const toPublishService = (_id: string) => {
        navigate(`/user/service/publish-service?publishServiceId=${_id}`)
    }

    useEffect(() => {
        const effectBody = async () => {
            if (USER_LIST_APP.LAST === event) {
                ActivitiesHttp.getTenPublishActivities().then((s) =>
                    setPublishActivities(s)
                )
            }
            const activitiesId = searchParams.get("id")

            if (inView && allPageNumber >= pageNumber && activitiesId)  {
                const res: GetAllPublishActivitiesInterface =
                await ActivitiesHttp.getAllPublishEvent({
                    pageNumber,
                    activitiesId,
                })
                setPublishActivities((s) => [...s, ...res.publishActivities])
                setAllPageNumber(res.allPageNumber)
                setPageNumber((s) => s + 1)
            }
        }
        effectBody()
    }, [inView])

    return (
        <>
            <UserHeaderUserChatList
                headerTitle={
                    USER_LIST_APP.LAST === event
                        ? "Latest Event"
                        : `${publishActivities?.[0]?.activitiesId?.name || ""}  `
                }
            />
            <div className="user__newsfeed-search">
                <InputSearch
                    placeholder={
                        <>
                            Search<span> NeightborHarbor</span>
                        </>
                    }
                    value={searsh}
                    changeValue={setSearch}
                />
            </div>
            <div className="user__category-publish">
                {publishActivities
                    .filter((item) => item.title.includes(searsh))
                    .map((item) => (
                        <div
                            className="user__services-last-item"
                            onClick={() => {
                                toPublishService(item._id)
                            }}
                        >
                            <div className="user__services-last-item-img">
                                <div className="user__services-last-item-img-1 user__services-last-item-img-info">
                                    <div className="user__services-last-item-img-text">
                                        {item.activitiesId.name}
                                    </div>
                                </div>

                                <img
                                    src={`${baseURL}/uploads/publish_activities/${item.filesName[0]}`}
                                    alt=""
                                    onClick={() => {
                                        setIsOpen(true)
                                        setCurrentIdActivities(
                                            item?.activitiesId?._id
                                        )
                                    }}
                                />
                                <div className="user__services-last-item-img-2 user__services-last-item-img-info">
                                    <div className="user__services-last-item-img-text">
                                        <IconStars />
                                        <b>4.5</b>
                                        <span>{"( 808 )"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="user__services-last-item-info">
                                <div className="user__services-last-item-row1">
                                    <h5 className="user__services-last-item-title">
                                        {item.title}
                                    </h5>
                                    <button>
                                        <IconProfileInfoBookmark />
                                    </button>
                                </div>
                                <h6 className="user__services-last-item-text">
                                    {item.text}
                                </h6>
                                <div className="user__services-last-item-foot">
                                    1 km
                                    <IconArrowRight />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <UserPublishServicesModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                categorieName={
                    publishActivities.find(
                        (item) => item.activitiesId._id === currentIdActivities
                    )?.activitiesId.name || "none"
                }
            />
            <div ref={ref} />
        </>
    )
}
