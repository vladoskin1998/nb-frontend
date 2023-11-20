import React, { useState } from "react"
import { useAppSelector } from "../../../utils/hooks"
import { FileButton } from "../../ui/FileButton"
import { PublishModalAddFile } from "./PublishModalAddFile"
import { PublishAttachButton } from "./PublishAttachButton"
import { TextareaAutosize } from "@mui/material"
import { IconAdminClose } from "../../svg/IconAdminHeader"

const maxLength = 300

export const PublicationMainComponent = ({
    files,
    setFiles,
    text,
    setText,
    title,
    setTitle,
    placeholderTitle,
    placeholderText,
}: {
    files: File[]
    setFiles: (f: File[]) => void
    text: string
    setText: (s: string) => void
    title: string
    setTitle: (s: string) => void
    placeholderTitle?: string
    placeholderText?: string
}) => {
    const { fullName } = useAppSelector((s) => s.userReducer)

    const [isOpen, setIsOpen] = useState(false)

    const getFile = (f: File) => {
        setFiles([...files, f])
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value
        if (newText.length <= maxLength) {
            setText(newText)
        }
    }

    const handlerDeleteFile = (index: number) => {
        setFiles(files.filter((item, id) => id !== index))
    }
    return (
        <div className="publish__main">
            <input
                className="services__add-input"
                placeholder={placeholderTitle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className="profile__about-body">
                <TextareaAutosize
                    value={text}
                    onChange={handleChange}
                    className="profile__about-autoresize"
                    minRows={1}
                    placeholder={`${fullName}, ${placeholderText}`}
                />
            </div>
            <div className="publish__main-list">
                {files.map((item, index) => (
                    <div className="publish__main-list-item">
                        <button
                            className=" publish__main-list-item-remove"
                            onClick={() => handlerDeleteFile(index)}
                        >
                            <IconAdminClose />
                        </button>
                        <img
                            src={URL.createObjectURL(item)}
                            alt="Вибране зображення"
                        />
                    </div>
                ))}
                <PublishAttachButton onClick={() => setIsOpen(true)} />
            </div>
            <PublishModalAddFile
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                getFile={getFile}
            />
        </div>
    )
}
