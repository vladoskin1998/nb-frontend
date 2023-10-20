import { useState } from "react"
import { SliderButtons } from "../../ui/SliderButtons"
import { SlickCategories } from "../../ui/SlickCategories"
import { InputSearch } from "../../ui/InputSearch"
import { IconRightChevrons } from "../../svg/IconChevrons"
import { IconProfileInfoPen } from "../../svg/IconProfileInfo"
import { Link, useNavigate } from "react-router-dom"
import { roleUrl } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"
import { ROLES } from "../../../types/enum"
import { UserHttp } from "../../../http/user-http"

export interface UserChat {
    avatarFileName: string
    fullName: string
    userId: string
}

export const ProfileInfoHelpCenter = () => {
    const [isFaq, setIsFaq] = useState(true)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [value, setValue] = useState("")
    const navigate = useNavigate()
    const { role } = useAppSelector((s) => s.userReducer)

    const { lat, lng } = useAppSelector((s) => s.profileReducer.coordinates)

    const openChat = async (roleSuppors: ROLES) => {
        const res = await UserHttp.getClosestUser({
            role: roleSuppors,
            myLat: lat,
            myLng: lng,
        })

        navigate(`${roleUrl(role)}/messeges/chat`, {
            state: {
                isSupport: true,
                participants: [res],
            },
        })
    }

    return (
        <div className="profileinfo__help">
            <SliderButtons
                left={"FAQ"}
                right={"Contact us"}
                value={isFaq}
                changeValue={setIsFaq}
            />
            {isFaq ? (
                <>
                    <div className="profileinfo__help-slider">
                        <SlickCategories>
                            {["General", "Account", "Services", "Discover"].map(
                                (item, index) => (
                                    <div
                                        className={`activities__filter-item ${
                                            index === currentSlide &&
                                            "activities__filter-item--active"
                                        }`}
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                    >
                                        {item}
                                    </div>
                                )
                            )}
                        </SlickCategories>
                    </div>
                    <div className="profileinfo__help-slider">
                        <InputSearch
                            placeholder={"Search FAQ"}
                            value={value}
                            changeValue={setValue}
                        />
                    </div>
                    <div className="profileinfo__aboutnb">
                        <div className="profileinfo__aboutnb-item">
                            <p>What is NeighborHarbor</p>
                            <IconRightChevrons />
                        </div>
                        <div className="profileinfo__aboutnb-item">
                            <p>What is NeighborHarbor</p>
                            <IconRightChevrons />
                        </div>
                        <div className="profileinfo__aboutnb-item">
                            <p>What is NeighborHarbor</p>
                            <IconRightChevrons />
                        </div>
                    </div>
                </>
            ) : (
                <div className="profileinfo__aboutnb">
                    <div className="profileinfo__aboutnb-item">
                        <Link to={"/profileinfo/aboutneightborharbor"}>
                            <p>
                                <IconProfileInfoPen /> Customer Service
                            </p>
                        </Link>
                        <IconRightChevrons />
                    </div>
                    <div className="profileinfo__aboutnb-item">
                        <p>
                            <IconProfileInfoPen /> Local Coordinator
                        </p>
                        <IconRightChevrons />
                    </div>
                    <div
                        className="profileinfo__aboutnb-item"
                        onClick={() => openChat(ROLES.REGIONAL_ADMIN)}
                    >
                        <p>
                            <IconProfileInfoPen />
                            Regional Admin (Adv)
                        </p>
                        <IconRightChevrons />
                    </div>
                    <div
                        className="profileinfo__aboutnb-item"
                        onClick={() => openChat(ROLES.ADMIN)}
                    >
                        <p>
                            <IconProfileInfoPen /> Head Office
                        </p>
                        <IconRightChevrons />
                    </div>
                </div>
            )}
        </div>
    )
}
