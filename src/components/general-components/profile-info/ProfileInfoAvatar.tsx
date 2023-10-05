import moment from "moment"
import { baseURL, roleUrl } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"
import { IconPicker, IconPickerSmoll, IconStars } from "../../svg/IconFavor"
import { IconNeibs } from "../../svg/IconPassEye"
import { IconLocationPoint } from "../../svg/IconsLocation"
import { UserItem } from "./ProfileInfo"
import { useNavigate } from "react-router-dom"

export const ProfileInfoAvatar = ({ props }: { props?: UserItem }) => {
    const navigate = useNavigate()
    const { fullName, role, _id } = useAppSelector((s) => s.userReducer)
    const {
        avatarFileName,
        sex,
        orientation,
        dateBirth,
        studySchool,
        nationality,
        cityBirth,
        familyStatus,
        createdUserDate,
    } = useAppSelector((s) => s.profileReducer)

    const openChat = () => {
        navigate(`${roleUrl(role)}/messeges/chat`, {
            state: [
                {
                    avatarFileName: props?.userIdentity.avatarFileName
                        ? props?.userIdentity.avatarFileName
                        : avatarFileName,
                    fullName: props?.fullName ? props?.fullName : fullName,
                    userId: props?._id ? props?._id : _id,
                },
            ],
        })
    }

    return (
        <div className="profileinfo__avatar">
            <div className="profileinfo__avatar-block">
                <img
                    src={`${baseURL}/uploads/avatar/${
                        props?.userIdentity.avatarFileName
                            ? props?.userIdentity.avatarFileName
                            : avatarFileName
                    }`}
                    alt=""
                />
                <div className="profileinfo__avatar-block-mark">
                    <IconStars />
                    <b>4.5</b>
                    <span>(808)</span>
                </div>
            </div>
            <h5 className="profileinfo__avatar-title">
                {props?.fullName ? props?.fullName : fullName}
            </h5>
            <div className="profileinfo__avatar-buttons">
                <button className="profileinfo__avatar-buttons-button">
                    <IconNeibs />
                    Follow
                </button>
                <button
                    className="profileinfo__avatar-buttons-button profileinfo__avatar-buttons-button--white"
                    onClick={openChat}
                >
                    Messege
                </button>
            </div>
            <h5 className="profileinfo__avatar-information">Information</h5>
            <div className="profileinfo__avatar-item">
                <IconPickerSmoll />
                Date of Birth:{" "}
                <b>
                    {moment(
                        props?.userIdentity.dateBirth
                            ? props?.userIdentity.dateBirth
                            : dateBirth
                    ).format("DD/MM/YYYY")}
                </b>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />
                <b>Ph.D </b>in
                <b>
                    {props?.userIdentity.studySchool
                        ? props?.userIdentity.studySchool
                        : studySchool}
                </b>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />
                <b>
                    {props?.userIdentity.nationality[0]?.title
                        ? props?.userIdentity.nationality[0]?.title
                        : nationality[0]?.title || ""}
                </b>
                born in{" "}
                <b>
                    {props?.userIdentity.cityBirth
                        ? props?.userIdentity.cityBirth
                        : cityBirth}
                </b>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />I am: <b>{sex}</b>, my orientation:{" "}
                <b>
                    {props?.userIdentity.cityBirth
                        ? props?.userIdentity.orientation
                        : orientation}
                </b>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />
                Family status:{" "}
                <b>
                    {props?.userIdentity.familyStatus
                        ? props?.userIdentity.familyStatus
                        : familyStatus}
                </b>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />
                On NeighborHarbor:{" "}
                <b>
                    {moment(
                        props?.userIdentity.createdUserDate
                            ? props?.userIdentity.createdUserDate
                            : createdUserDate
                    ).format("MMM D, YYYY")}
                </b>
            </div>
        </div>
    )
}
