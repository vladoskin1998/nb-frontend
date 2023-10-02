import { useState } from "react"
import { SliderButtons } from "../../ui/SliderButtons"
import { SlickCategories } from "../../ui/SlickCategories"
import { InputSearch } from "../../ui/InputSearch"
import { IconRightChevrons } from "../../svg/IconChevrons"
import { IconProfileInfoPen } from "../../svg/IconProfileInfo"

export const ProfileInfoHelpCenter = () => {
    const [isFaq, setIsFaq] = useState(true)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [value, setValue] = useState("")
    return (
        <div className="profileinfo__help">
            <SliderButtons
                left={"FAQ"}
                right={"Contact us"}
                value={isFaq}
                changeValue={setIsFaq}
            />
            {
                isFaq 
                ?
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
            :
            <div className="profileinfo__aboutnb">
            <div className="profileinfo__aboutnb-item">
                <p><IconProfileInfoPen /> Customer Service</p>
                <IconRightChevrons />
            </div>
            <div className="profileinfo__aboutnb-item">
                <p><IconProfileInfoPen /> Local Coordinator</p>
                <IconRightChevrons />
            </div>
            <div className="profileinfo__aboutnb-item">
                <p><IconProfileInfoPen />Regional Admin (Adv)</p>
                <IconRightChevrons />
            </div> 
            <div className="profileinfo__aboutnb-item">
                <p><IconProfileInfoPen /> Head Office</p>
                <IconRightChevrons />
            </div> 
        </div>                  
            }
        </div>
   
    )
}
