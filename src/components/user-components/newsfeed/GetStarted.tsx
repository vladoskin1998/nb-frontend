import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { baseURL } from "../../../utils/config"
import Slider from "react-slick"
import { Checkmark } from "./Checkmark"
import { steperBoleanNormalize } from "../../../utils/actions"
import { Link, useNavigate } from "react-router-dom"
import { profileTextInfo } from "../../../services/profile"
import { setValueProfileReducer } from "../../../reducer/profile"
export const GetStarted = () => {
    const { fullName, isCheckedEmail, _id,  phone, } = useAppSelector(
        (s) => s.userReducer
    )

    const {
        avatarFileName,
        isAddedServices,
        isAddedPost,
        isExploreDone,
    } = useAppSelector((s) => s.profileReducer)

  

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [list, setList] = useState<boolean[]>([])

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    }

    useEffect(() => {
        setList([
            isAddedServices,
            isAddedPost,
            isExploreDone,
            Boolean(avatarFileName),
            Boolean(phone),
        ])
    }, [
        isAddedServices,
        isAddedPost,
        isExploreDone,
        avatarFileName,
        phone
    ])

    const navigateToServices = async () => {
        // const res = await profileTextInfo({
        //     isSeenServices: true,
        //     _id,
        // })
        // dispatch(setValueProfileReducer(res))
        // navigate("/user/service")
    }

    const navigateToActivities = async () => {
        // const res = await profileTextInfo({
        //     isSeenActvities: true,
        //     _id,
        // })
        // dispatch(setValueProfileReducer(res))
        // navigate("/user/activities")
    }

    return (
        <div className="user__newsfeed__getstarted">
            <Link to={"/publish/post"}>
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
            </Link>
            {Boolean(phone) && isAddedPost && isAddedServices && isExploreDone && Boolean(avatarFileName) ? (
                <></>
            ) : (
                <>
                    <h5 className="user__newsfeed__getstarted-title">
                        Get Started
                    </h5>
                    <h6 className="user__newsfeed__getstarted-subtitle">
                        Here’s how to get started on NeighborHarbor
                    </h6>
                    <div className="user__newsfeed-slick">
                        <Slider {...settings}>
                            <div className="user__newsfeed-slick-item">
                                <div className="user__newsfeed-slick-mark">
                                    {Boolean(phone) && <Checkmark />}
                                    Step 1
                                </div> 
                                <div className="user__newsfeed-slick-img" onClick={() => navigate('/profileinfo/security')}>
                                    <img
                                        src="/Images/get1.png"
                                        alt=""
                                        style={{
                                            width: "102px",
                                            height: "110px",
                                        }}
                                    />
                                </div>

                                <button className="user__newsfeed-slick-button">
                                    Connect your phone
                                </button>
                            </div>

                            <div className="user__newsfeed-slick-item">
                                <div className="user__newsfeed-slick-mark">
                                    {isAddedPost && <Checkmark />}
                                    Step 2
                                </div>
                                <div className="user__newsfeed-slick-img" onClick={() => navigate('/publish/post')}>
                                    <img
                                        src="/Images/get2.png"
                                        alt=""
                                        style={{
                                            width: "139px",
                                            height: "100px",
                                        }}
                                    />
                                </div>

                                <button className="user__newsfeed-slick-button">
                                    Write your first post
                                </button>
                            </div>

                            <div
                                className="user__newsfeed-slick-item"
                            >
                                <div className="user__newsfeed-slick-mark">
                                    {isAddedServices && <Checkmark />}
                                    Step 3
                                </div>
                                <div className="user__newsfeed-slick-img" onClick={() => navigate('/publish/service')}>
                                    <img
                                        src="/Images/get3.png"
                                        alt=""
                                        style={{
                                            width: "87px",
                                            height: "87px",
                                        }}
                                    />
                                </div>

                                <button className="user__newsfeed-slick-button">
                                Provide a service
                                </button>
                            </div>

                            <div
                                className="user__newsfeed-slick-item"
                                onClick={navigateToServices}
                            >
                                <div className="user__newsfeed-slick-mark">
                                    {isExploreDone && <Checkmark />}
                                    Step 4
                                </div>
                                <div className="user__newsfeed-slick-img">
                                    <img
                                        src="/Images/get4.png"
                                        alt=""
                                        style={{
                                            width: "159px",
                                            height: "74px",
                                        }}
                                    />
                                </div>

                                <button className="user__newsfeed-slick-button">
                                    Make your first discovery
                                </button>
                            </div>

                            <div
                                className="user__newsfeed-slick-item"
                                onClick={navigateToActivities}
                            >
                                <div className="user__newsfeed-slick-mark">
                                    {Boolean(avatarFileName) && <Checkmark />}
                                    Step 5
                                </div>
                                <div className="user__newsfeed-slick- "  onClick={() => navigate('/profileinfo/edit')}>
                                    <img
                                        src="/Images/get5.png"
                                        alt=""
                                        style={{
                                            width: "101px",
                                            height: "101px",
                                        }}
                                    />
                                </div>
                                <button className="user__newsfeed-slick-button">
                                    Add your profile photo
                                </button>
                            </div>
                        </Slider>
                    </div>
                    <div className="user__newsfeed-slick-steper">
                        <p className="user__newsfeed-steper-title">
                            {list.filter((item) => item !== false).length} of{" "}
                            {list.length} steps completed
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
                </>
            )}
        </div>
    )
}
