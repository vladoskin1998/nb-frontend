import { IconLocationPoint } from "../../svg/IconsLocation"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import {
    IconStars,
    IconComment,
    IconLike,
    IconPicker,
} from "../../svg/IconFavor"
import { useEffect, useState } from "react"
import { PublishPostHttp } from "../../../http/publish-post-http"
import { useInView } from "react-intersection-observer"
import { useLocation, useSearchParams } from "react-router-dom"
import {
    GetAllPublishActivitiesInterface,
    GetAllPublishServicetInterface,
    PublishEventItemInterface,
    PublishServiceItemInterface,
} from "../../../types/types"
import { ServiceHttp } from "../../../http/service-http"
import { baseURL } from "../../../utils/config"
import moment from "moment"
import { ActivitiesHttp } from "../../../http/activities-http"

export const ActivitiesFavorList = () => {
    const [searchParams] = useSearchParams()
    const [allPageNumber, setAllPageNumber] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [publishService, setPublishService] = useState<
        PublishEventItemInterface[]
    >([])
    const { ref, inView } = useInView({
        threshold: 0,
    })
    const location = useLocation()

    useEffect(() => {
        const effectBody = async () => {
            const activitiesId = searchParams.get("activitiesId")
            if (inView && allPageNumber >= pageNumber && activitiesId) {
                const res: GetAllPublishActivitiesInterface =
                    await ActivitiesHttp.getAllPublishEvent({
                        pageNumber,
                        activitiesId,
                    })
                setPublishService((s) => [...s, ...res.publishActivities])
                setAllPageNumber(res.allPageNumber)
                setPageNumber((s) => s + 1)
            }
        }

        effectBody()
    }, [inView])

    return (
        <>
            {publishService.map((item) => {
                return (
                    <div className="services__favor-item" key={item._id}>
                        <div className="services__favor-item-row1">
                            <div className="services__favor-item-row1-img">
                                <img
                                    src={`${baseURL}/uploads/publish_activities/${item.filesName[0]}`}
                                    alt="avatar"
                                />
                            </div>
                            <div>
                                <div className="services__favor-item-row1-header">
                                    <div>
                                        <h5 className="services__favor-item-row1-title">
                                            {item.title}
                                        </h5>

                                        <h6 className="services__favor-item-row1-time">
                                            {moment(item.startDate).format(
                                                "DD MMM YYYY HH:mm"
                                            )}
                                        </h6>
                                    </div>
                                    <button>
                                        <IconServicesAllPoint />
                                    </button>
                                </div>
                                <div className="services__favor-item-row1-footer">
                                    <div className="services__favor-item-row1-userimg">
                                        <img
                                            src={`${baseURL}/uploads/avatar/${item.userId.avatarFileName}`}
                                            alt="publish services"
                                        />
                                    </div>

                                    <h5> {item.userId.fullName}</h5>
                                    <IconStars />
                                    <span>{4.5}</span>
                                    <span>{"(" + 808 + ")"}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="services__favor-item-row2">
                                <IconComment />
                                <span>{0}</span>
                                <IconPicker />
                                <span>
                                    {moment(item.createEventDate).format(
                                        "DD MMM YYYY HH:mm"
                                    )}
                                </span>
                            </div>
                            <div className="services__favor-item-row2 services__favor-item-row2-2">
                                <IconLike />
                                <span>{0}</span>
                                <div className="services__favor-item-row2-svg">
                                    <IconLocationPoint />
                                </div>
                                <span>{item.addressLocation}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div ref={ref} />
        </>
    )
}
