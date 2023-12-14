import React from "react"
import { IconRightChevrons } from "../../svg/IconChevrons"
import { UserHeaderUserChatList } from "../header/UserHeaderChat"

export const UserServicesSpecialOffers = () => {
    const advService = [
        "Ger discount for every order, only valid for today",
        "Ger discount for every order, only valid for today",
        "Ger discount for every order, only valid for today",
        "Ger discount for every order, only valid for today",
        "Ger discount for every order, only valid for today",
        "Ger discount for every order, only valid for today",
        "Ger discount for every order, only valid for today",
    ]

    return (
        <>
            <UserHeaderUserChatList headerTitle={"Special Offers"} />
            <div className="user__category-special">
                {advService.map((item, index) => (
                    <div className="user__services-adv-item-body">
                        <div
                            className={`user__services-adv-item ${"user__services-adv-item--active"}`}
                        >
                            <div>
                                <h6 className="user__services-adv-item-undertitle">
                                    Offer AC Service
                                </h6>
                                <h4 className="user__services-adv-item-title">
                                    Today’s Special!
                                </h4>
                                <h5 className="user__services-adv-item-subtitle">
                                    {item}
                                </h5>
                                <button className="user__services-adv-item-button">
                                    Grab Offer <IconRightChevrons />
                                </button>
                            </div>
                            <div className="user__services-adv-item-img">
                                <img src="/Images/MaskDelete.png" alt="" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
