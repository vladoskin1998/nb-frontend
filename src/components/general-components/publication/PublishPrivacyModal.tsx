import React, { ReactNode, useState } from "react"
import { PRIVACY } from "../../../types/enum"
import { Modal } from "../../ui/Modal"
import { IconClosedEye, IconNeibs, IconOpenEye } from "../../svg/IconPassEye"
import { IconProfileCircle } from "../../svg/IconProfile"
import {
    IconSvgPrivacyPublishCircle,
    IconSvgPrivacyPublishCheckCircle,
} from "../../svg/IconSvgPrivacyPublish"

const buttonChild = (key: PRIVACY) => {
    switch (key) {
        case PRIVACY.NEIBS:
            return {
                title: "Neibs",
                label: IconNeibs,
                subtitle: "Your friends on NeighborHarbor",
            }
        case PRIVACY.ONLYME:
            return {
                title: "Only me",
                label: IconClosedEye,
                subtitle: "Only me",
            }
        default:
            return {
                title: "Anyone",
                label: IconOpenEye,
                subtitle: "Any on or off NeightborHarbor",
            }
    }
}

const list = Object.values(PRIVACY)

export const PublishPrivacyModal = ({
    isOpen,
    setIsOpen,
    currentPrivacy,
    setCurrentPrivacy,
    applyMethod = () => {},
    title = "Select Privacy",
    subtitle = "Control who can see your post",
}: {
    isOpen: boolean
    setIsOpen: (s: boolean) => void
    currentPrivacy: PRIVACY
    setCurrentPrivacy: (p: PRIVACY) => void
    applyMethod?: () => void
    title?: string | ReactNode
    subtitle?: string | ReactNode
}) => {
    return (
        <>
            <div className="publish__privacy">
                <button
                    className="publish__location-button"
                    onClick={() => setIsOpen(true)}
                >
                    {buttonChild(currentPrivacy).label()}
                    {buttonChild(currentPrivacy).title}
                </button>
            </div>
            <div
                className={`activities__favor-modal  ${
                    isOpen ? "activities__favor-modal--open" : ""
                }`}
            >
                <Modal className="" setIsOpen={(s: boolean) => setIsOpen(s)}>
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsOpen(false)
                        }}
                        className="activities__favor-modal-linebody"
                    >
                        <button className="activities__favor-modal-line" />
                    </div>
                    <div className="publish__modaladd">
                        <h5 className="publish__modaladd-title">{title}</h5>
                        <h6 className="publish__modaladd-subtitle">
                            {subtitle}
                        </h6>
                        <div className="publish__modaladd-body publish__privacy-body">
                            {list.map((item) => (
                                <div
                                    className="publish__privacy-item"
                                    onClick={() => setCurrentPrivacy(item)}
                                >
                                    <div
                                        className={`${
                                            item === currentPrivacy &&
                                            "publish__privacy-item--active"
                                        }`}
                                    >
                                        {buttonChild(item).label()}
                                    </div>

                                    <div>
                                        <p className="publish__modaladd-subtitle publish__privacy-item-text">
                                            {buttonChild(item).title}
                                        </p>
                                        <p className="publish__modaladd-subtitle">
                                            {buttonChild(item).subtitle}
                                        </p>
                                    </div>
                                    <button>
                                        {currentPrivacy === item ? (
                                            <IconSvgPrivacyPublishCheckCircle />
                                        ) : (
                                            <IconSvgPrivacyPublishCircle />
                                        )}
                                    </button>
                                </div>
                            ))}
                            <button
                                className="publish__privacy-apply"
                                onClick={() => {
                                    applyMethod()
                                    setIsOpen(false)
                                }}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}
