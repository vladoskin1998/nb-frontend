import React, { useState } from "react"
import { SliderButtons } from "../../ui/SliderButtons"
import { ProfoleIdentityModule } from "../profile/ProfoleIdentityModule"
import { QUALITYENUM } from "../../../types/enum"

export const ProfileInfoSkillsInterests = () => {
    const [isSkills, setIsSkills] = useState(true)
    return (
        <div className="profileinfo__skillsinterets">
            <SliderButtons
                left={"Skills"}
                right={"Interests"}
                value={isSkills}
                changeValue={setIsSkills}
            />
            <div className="profileinfo__skillsinterets-list">
                {isSkills ? (
                    <ProfoleIdentityModule
                        quality={QUALITYENUM.SKILLS}
                    />
                ) : (
                    <ProfoleIdentityModule
                        quality={QUALITYENUM.INTERESTS}
                    />
                )}
            </div>
        </div>
    )
}
