import { useState } from "react"
import { SliderButtons } from "../../ui/SliderButtons"
import { useAppSelector } from "../../../utils/hooks"
import { IconProfileCircle } from "../../svg/IconProfile"
import { ACTIVITIE } from "../../../types/enum"
import { baseURL } from "../../../utils/config"
import { SlickCategories } from "../../ui/SlickCategories"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const list = Object.values(ACTIVITIE)

var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
}

export const ProfileInfoPerProf = () => {
    const [category, setCategory] = useState(ACTIVITIE.ALL)
    const [isPersonal, setIsPersonal] = useState(true)
    const { aboutMe, skills, interests, certificatesFileName } = useAppSelector(
        (s) => s.profileReducer
    )
    return (
        <div className="profileinfo__perprof">
            <SliderButtons
                left={"Personal"}
                right={"Professional"}
                value={isPersonal}
                changeValue={setIsPersonal}
            />
            {isPersonal ? (
                <>
                    <h5 className="profileinfo__avatar-information profileinfo__perprof-about-title">
                        About me
                    </h5>
                    <p className="profileinfo__perprof-about-text">{aboutMe}</p>
                    <h5 className="profileinfo__avatar-information profileinfo__perprof-skills-title">
                        Skills ({skills.length})
                    </h5>
                    <div className="profileinfo__perprof-skills-list">
                        {skills.map((item) => (
                            <div className="profileinfo__perprof-skills-list-item">
                                <IconProfileCircle />
                                {item.title}
                            </div>
                        ))}
                    </div>
                    <h5 className="profileinfo__avatar-information profileinfo__perprof-skills-title">
                        Interests ({interests.length})
                    </h5>
                    <div className="profileinfo__perprof-skills-list">
                        {interests.map((item) => (
                            <div className="profileinfo__perprof-skills-list-item">
                                <IconProfileCircle />
                                {item.title}
                            </div>
                        ))}
                    </div>
                    <h5 className="profileinfo__avatar-information profileinfo__perprof-skills-title">
                        Latest Activity
                    </h5>
                </>
            ) : (
                <>
                    <h5 className="profileinfo__avatar-information profileinfo__perprof-skills-title">
                        Certificates ({certificatesFileName.length})
                    </h5>
                    <div className="profileinfo__perprof-certificates">
                        <Slider {...settings}>
                            {certificatesFileName.map((item) => (
                                <div className="profileinfo__perprof-certeficate">
                                    <img
                                        src={`${baseURL}/uploads/certificates/${item}`}
                                        alt=""
                                        key={item}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </>
            )}

            <div className="profileinfo__perprof-skills-list">
                {list.map((item) => (
                    <button
                        key={item}
                        className={`profileinfo__perprof-categories-item 
                        ${
                            category === item &&
                            "profileinfo__perprof-categories-item--active"
                        }
                    `}
                        onClick={() => setCategory(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    )
}
