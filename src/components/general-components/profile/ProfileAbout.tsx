import React, { useState } from "react"
import { StandartTitleSubtitle } from "../../ui/StandartTitleSubtitle"
import { TextareaAutosize } from "@mui/base/TextareaAutosize"
import { IconProfileTextareaCorner } from "../../svg/IconProfile"
import { Link } from "react-router-dom"

const maxLength = 250
export const ProfileAbout = () => {
    const [text, setText] = useState("")

    const handleChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
    
        // Проверяем, не превышает ли текст максимальное количество символов
        if (newText.length <= maxLength) {
          setText(newText);
        }
      };
    return (
        <>
            <div className="profile__method-body">
                <div className="profile__about-body">
                    <TextareaAutosize
                        value={text}
                        onChange={handleChange}
                        className="profile__about-autoresize"
                        minRows={3}
                        placeholder="Be concise, authentic, and feel free to let your personality shine through"
                    />
                    <button className="profile__about-resize">
                        <span>{text.length+1}/{maxLength}</span>
                        {/* <IconProfileTextareaCorner/> */}
                    </button>
                </div>
            </div>
            <button className="profile__method-btlater profile__method-btlater--inherit">
                {/* <Link to={"/admin"}> */}
                    Setup later
                {/* </Link> */}
            </button>
            <button className={`profile__method-btlater`}>
                <Link to={"/profile/profession"}>Continue</Link>
            </button>
        </>
    )
}
