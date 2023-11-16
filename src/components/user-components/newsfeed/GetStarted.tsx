import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { baseURL } from "../../../utils/config"
import Slider from "react-slick"
import { Checkmark } from "./Checkmark"
import { steperBoleanNormalize } from "../../../utils/actions"
import { useNavigate } from "react-router-dom"
import { profileTextInfo } from "../../../services/profile"
import { setValueProfileReducer } from "../../../reducer/profile"
export const GetStarted = () => {
    const { fullName, isCheckedEmail, _id } = useAppSelector((s) => s.userReducer)
    const {
        avatarFileName,
        isGotAllProfileInfo,
        isSeenServices,
        isSeenActvities,
        isLocationVerify,
    } = useAppSelector((s) => s.profileReducer)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [list, setList] = useState<boolean[]>([])
    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        // afterChange: (n:number) => changeCurrentSlide(n)
    }

    useEffect(() => {
        setList([
            isGotAllProfileInfo,
            isSeenServices,
            isSeenActvities,
            isLocationVerify,
            isCheckedEmail,
        ])
    }, [
        isGotAllProfileInfo,
        isSeenServices,
        isSeenActvities,
        isLocationVerify,
        isCheckedEmail,
    ])

    const navigateToServices = async () => {
        const res =await profileTextInfo({
            isSeenServices:true,
            _id,
        })
        dispatch(setValueProfileReducer(res))
        navigate('/user/service')
    }

    const navigateToActivities = async () => {
        const res = await profileTextInfo({
            isSeenActvities:true,
            _id,
        })
        dispatch(setValueProfileReducer(res))
        navigate('/user/activities')
    }

    return isGotAllProfileInfo && isSeenServices && isSeenActvities ? (
        <></>
    ) : (
        <div className="user__newsfeed__getstarted">
            <div className="user__newsfeed__getstarted-mind">
                <div className="user__newsfeed__getstarted-mind-img">
                    <img
                        src={`${baseURL}/uploads/avatar/${avatarFileName}`}
                        alt=""
                    />
                </div>
                <div className="user__newsfeed__getstarted-mind-text">
                    <b>{fullName}</b>, what’s in your mind ?
                </div>
            </div>
            <h5 className="user__newsfeed__getstarted-title">Get Started</h5>
            <h6 className="user__newsfeed__getstarted-subtitle">
                Here’s how to get started on NeighborHarbor
            </h6>
            <div className="user__newsfeed-slick">
                <Slider {...settings}>
                    <div className="user__newsfeed-slick-item">
                        <div className="user__newsfeed-slick-mark">
                            {<Checkmark />}
                            Step 1
                        </div>
                        <div className="user__newsfeed-slick-img">
                            <img src="/Images/ImageSuccess.png" alt="" />
                        </div>

                        <button className="user__newsfeed-slick-button">
                            Get Started
                        </button>
                    </div>

                    <div className="user__newsfeed-slick-item">
                        <div className="user__newsfeed-slick-mark">
                            {<Checkmark />}
                            Step 2
                        </div>
                        <div className="user__newsfeed-slick-img">
                            <img src="/Images/ImageSuccess.png" alt="" />
                        </div>

                        <button className="user__newsfeed-slick-button">
                            Get Started
                        </button>
                    </div>

                    <div className="user__newsfeed-slick-item" onClick={() => navigate('/profile')}>
                        <div className="user__newsfeed-slick-mark">
                            {isGotAllProfileInfo && <Checkmark />}
                            Step 3
                        </div>
                        <div className="user__newsfeed-slick-img">
                            <img src="/Images/ImageSuccess.png" alt="" />
                        </div>

                        <button className="user__newsfeed-slick-button">
                            Get Started
                        </button>
                    </div>

                    <div className="user__newsfeed-slick-item" onClick={navigateToServices}>
                        <div className="user__newsfeed-slick-mark">
                            {isSeenServices && <Checkmark />}
                            Step 4
                        </div>
                        <div className="user__newsfeed-slick-img">
                            <img src="/Images/ImageSuccess.png" alt="" />
                        </div>

                        <button className="user__newsfeed-slick-button">
                            Get Started
                        </button>
                    </div>

                    <div className="user__newsfeed-slick-item" onClick={navigateToActivities}>
                        <div className="user__newsfeed-slick-mark">
                            {isSeenActvities && <Checkmark />}
                            Step 5
                        </div>
                        <div className="user__newsfeed-slick-img">
                            <img src="/Images/ImageSuccess.png" alt="" />
                        </div>
                        <button className="user__newsfeed-slick-button">
                            Get Started
                        </button>
                    </div>
                </Slider>
            </div>
            <div className="user__newsfeed-slick-steper">
                <p className="user__newsfeed-steper-title">
                    {list.filter(item => item !== false).length} of {list.length} steps completed
                </p>
                <div className="user__newsfeed-steper-body">
                    {steperBoleanNormalize(list).map((item) => (
                        <div
                            className={`user__newsfeed-steper-item ${
                                item &&
                                "user__newsfeed-steper-item-active"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
