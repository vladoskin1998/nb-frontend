import React from "react"
import { baseURL } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"
import {
    IconProfileInfoPen,
    IconProfileInfoComments,
    IconProfileInfoFlag,
    IconProfileInfoNotification,
    IconProfileInfoBookmark,
    IconProfileInfoKey,
} from "../../svg/IconProfileInfo"
import { IconLocationKey } from "../../svg/IconsLocation"
import { IconLeftChevrons, IconRightChevrons } from "../../svg/IconChevrons"
import { IconBoxComment } from "../../svg/IconActivitiesModal"
import { profileInfoSettings, profileInfoHelp } from "../../../utils/constant"
import { toOneKind } from "../../../utils/titles"
import { Link } from "react-router-dom"
export const ProfileSettings = () => {
    const { avatarFileName } = useAppSelector((s) => s.profileReducer)
    const { email, fullName } = useAppSelector((s) => s.userReducer)
    return (
        <div className="profileinfo__settings">
            <div className="profileinfo__settings-main-edit">
                <img
                    src={`${baseURL}/uploads/avatar/${avatarFileName}`}
                    alt=""
                />
                <div>
                    <b className="profileinfo__settings-main-edit-title">
                        {fullName}
                    </b>
                    <p className="profileinfo__settings-main-edit-subtitle">
                        {email}
                    </p>
                </div>
                <button>
                    <Link to={'/profileinfo/edit'}>
                        <IconProfileInfoPen />
                    </Link>
                 
                </button>
            </div>

            <div className="profileinfo__settings-main-setting ">
                {profileInfoSettings.map((item) => (
                    <Link to={`/profileinfo/${toOneKind(item.name)}`}>
                        <div
                            className="profileinfo__settings-main-setting-item"
                            key={item.name}
                        >
                            <button>{item.label()}</button>
                            <div>
                                <h6 className="profileinfo__settings-main-edit-title profileinfo__settings-main-setting-item-title">
                                    {item.name}
                                </h6>
                                <p className="profileinfo__settings-main-edit-subtitle">
                                    {item.subName}
                                </p>
                            </div>
                            <button className="profileinfo__settings-main-setting-item-svgstroke">
                                <IconRightChevrons />
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="profileinfo__settings-main-setting profileinfo__settings-main-help">
                {profileInfoHelp.map((item) => (
                    <Link to={`/profileinfo/${toOneKind(item.name)}`}>
                        <div
                            className="profileinfo__settings-main-setting-item"
                            key={item.name}
                        >
                            {item.label()}
                            <div>
                                <h6 className="profileinfo__settings-main-edit-title profileinfo__settings-main-setting-item-title">
                                    {item.name}
                                </h6>
                            </div>
                            <button className="profileinfo__settings-main-setting-item-svgstroke">
                                <IconRightChevrons />
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="profileinfo__settings-main-setting"></div>
        </div>
    )
}
