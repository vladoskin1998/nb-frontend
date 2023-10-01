import moment from "moment"
import { baseURL } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"
import { IconPicker, IconPickerSmoll, IconStars } from "../../svg/IconFavor"
import { IconNeibs } from "../../svg/IconPassEye"
import { IconLocationPoint } from "../../svg/IconsLocation"

export const ProfileInfoAvatar = () => {
    const { fullName } = useAppSelector((s) => s.userReducer)
    const { avatarFileName, sex,orientation,dateBirth, studySchool, nationality, cityBirth, familyStatus, createdUserDate } =
        useAppSelector((s) => s.profileReducer)
    return (
        <div className="profileinfo__avatar">
            <div className="profileinfo__avatar-block">
                <img
                    src={`${baseURL}/uploads/avatar/${avatarFileName}`}
                    alt=""
                />
                <div className="profileinfo__avatar-block-mark">
                    <IconStars />
                    <b>4.5</b>
                    <span>(808)</span>
                </div>
            </div>
            <h5 className="profileinfo__avatar-title">{fullName}</h5>
            <div className="profileinfo__avatar-buttons">
                <button className="profileinfo__avatar-buttons-button">
                    <IconNeibs />
                    Follow
                </button>
                <button className="profileinfo__avatar-buttons-button profileinfo__avatar-buttons-button--white">
                    Messege
                </button>
            </div>
            <h5 className="profileinfo__avatar-information">Information</h5>
            <div className="profileinfo__avatar-item">
                <IconPickerSmoll />
                Date of Birth: <b>{moment(dateBirth).format("DD/MM/YYYY")}</b>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />
                <b>Ph.D </b>in<b>{studySchool}</b>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />
                <b>{nationality[0].title}</b>born in <b>{cityBirth}</b>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />
                I am: <b>{sex}</b>, my orientation: <b>{orientation}</b>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />
                Family status: <b>{familyStatus}</b>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />
                On NeighborHarbor:  <b>{moment(createdUserDate).format("MMM D, YYYY") }</b>
            </div>
        </div>
    )
}
