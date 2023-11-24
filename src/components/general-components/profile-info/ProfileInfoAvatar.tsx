import moment from "moment"
import { baseURL, roleUrl } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"
import { IconPickerSmoll, IconStars } from "../../svg/IconFavor"
import { IconNeibs } from "../../svg/IconPassEye"
import { IconLocationPoint } from "../../svg/IconsLocation"
import { UserItem } from "./ProfileInfo"
import { useNavigate } from "react-router-dom"
import { UserHttp } from "../../../http/user-http"
import { useEffect, useState } from "react"

export const ProfileInfoAvatar = ({ props }: { props?: UserItem }) => {
    console.log(props)

    const [isMyFriend, setIsMyFriend] = useState(false)
    const navigate = useNavigate()
    const { role, _id } = useAppSelector((s) => s.userReducer)

    const openChat = () => {
        navigate(`${roleUrl(role)}/messeges/chat`, {
            state: {
                participants: [
                    {
                        avatarFileName: props?.userIdentity.avatarFileName,
                        fullName: props?.fullName,
                        userId: props?._id,
                    },
                ],
            },
        })
    }

    const toFriend = async () => {
        if (props?._id === _id || !props?._id) {
            return
        }
        const payload = {
            _id,
            friendId: props?._id,
        }
        if (isMyFriend) {
            await UserHttp.deleteMyFriend(payload).then(() =>
                setIsMyFriend(false)
            )
        } else {
            await UserHttp.addMyFriend(payload).then(() => setIsMyFriend(true))
        }
    }

    useEffect(() => {
        if (props?._id && props?._id !== _id) {
            UserHttp.checkMyFriend({
                _id,
                friendId: props?._id,
            }).then((res) => setIsMyFriend(res))
        }
    }, [])

    return (
        <div className="profileinfo__avatar">
            <div className="profileinfo__avatar-block">
                <img
                    src={`${baseURL}/uploads/avatar/${props?.userIdentity.avatarFileName}`}
                    alt=""
                />
                <div className="profileinfo__avatar-block-mark">
                    <IconStars />
                    <b>4.5</b>
                    <span>(808)</span>
                </div>
            </div>
            <h5 className="profileinfo__avatar-title">{props?.fullName}</h5>
            <h6 className="profileinfo__avatar-subtitle">
                {props?.userIdentity.profession[0]?.title}
            </h6>
            {_id !== props?._id && (
                <div className="profileinfo__avatar-buttons">
                    <button
                        className="profileinfo__avatar-buttons-button"
                        onClick={toFriend}
                    >
                        <IconNeibs />
                        {isMyFriend ? "Neib" : "Follow"}
                    </button>
                    <button
                        className="profileinfo__avatar-buttons-button profileinfo__avatar-buttons-button--inheritbody"
                        onClick={openChat}
                    >
                        Messege
                    </button>
                </div>
            )}

            <h5 className="profileinfo__avatar-information">Information</h5>
            <div className="profileinfo__avatar-item">
                <IconPickerSmoll />
                <span>
                    Date of Birth:{" "}
                    <b>
                        {moment(props?.userIdentity.dateBirth).format(
                            "DD/MM/YYYY"
                        )}
                    </b>
                </span>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />
                <span>
                    <b>Ph.D </b>in
                    <b>{props?.userIdentity.studySchool}</b>
                </span>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />

                <span>
                    <b>{props?.userIdentity.nationality[0]?.title}</b>
                    born in <b>{props?.userIdentity.cityBirth}</b>
                </span>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />{" "}
                <span>
                    I am: <b>{props?.userIdentity.sex}</b>, my orientation:{" "}
                    <b>{props?.userIdentity.orientation}</b>
                </span>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />
                <span>
                    Family status: <b>{props?.userIdentity.familyStatus}</b>
                </span>
            </div>
            <div className="profileinfo__avatar-item">
                <IconLocationPoint />
                <span>
                    On NeighborHarbor:{" "}
                    <b>
                        {moment(props?.userIdentity.createdUserDate).format(
                            "MMM D, YYYY"
                        )}
                    </b>
                </span>
            </div>
        </div>
    )
}
