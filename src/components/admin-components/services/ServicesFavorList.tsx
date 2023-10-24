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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import {
    GetAllPublishServicetInterface,
    OptionsType,
    PostUserInterface,
    PublishServiceItemInterface,
} from "../../../types/types"
import { ServiceHttp } from "../../../http/service-http"
import { baseURL } from "../../../utils/config"
import moment from "moment"
import { Link } from "react-router-dom"
import { AutocompleteSearch } from "../../ui/AutocompleteSearch"
import { ServicesListItemViewModal } from "./ServicesListItemViewModal"
import { ServicesFavorListModal } from "./ServicesFavorListModal"

const ServicesFavorList = ({ changeAdd }: { changeAdd: () => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchParams] = useSearchParams()
    const [allPageNumber, setAllPageNumber] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [publishService, setPublishService] = useState<
        PublishServiceItemInterface[]
    >([])
    const { ref, inView } = useInView({
        threshold: 0,
    })

    useEffect(() => {
        const effectBody = async () => {
            const subServicesId = searchParams.get("subCategoryId")
            if (inView && allPageNumber >= pageNumber && subServicesId) {
                const res: GetAllPublishServicetInterface =
                    await ServiceHttp.getAllPublishService({
                        pageNumber,
                        subServicesId,
                    })
                setPublishService((s) => [...s, ...res.publishServices])
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
                    <>
                        <div className="services__favor-item" key={item._id}>
                            <div className="services__favor-item-row1">
                                <div className="services__favor-item-row1-img">
                                    <img
                                        src={`${baseURL}/uploads/publish_services/${item.filesName[0]}`}
                                        alt="publish_services"
                                    />
                                </div>
                                <div>
                                    <div className="services__favor-item-row1-header">
                                        <h5 className="services__favor-item-row1-title">
                                            {item.title}
                                        </h5>
                                        <button onClick={() => setIsOpen(true)}>
                                            <IconServicesAllPoint />
                                        </button>
                                    </div>
                                    <div className="services__favor-item-row1-footer">
                                        <div className="services__favor-item-row1-userimg">
                                            <img
                                                src={`${baseURL}/uploads/avatar/${item.userIdentityId.avatarFileName}`}
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
                                        {moment(
                                            item.createdPublishServiceDate
                                        ).format("DD MMM YYYY HH:mm")}
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
                        {isOpen && (
                            <ServicesFavorListModal setIsOpen={setIsOpen} isOpen={isOpen}/>
                        )}
                    </>
                )
            })}
            <div ref={ref} />
        </>
    )
}

export default ServicesFavorList
