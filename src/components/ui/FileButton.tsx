import { useState, useRef } from "react";
import { IconArrachFile } from "../svg/IconArrachFile";

export const FileButton = ({getFile}:{getFile:(f:File) => void}) => {

    const [selectedFile, setSelectedFile] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileSelect = () => {
        const fileInput = fileInputRef?.current;
        if (fileInput && fileInput?.files && fileInput.files[0]) {
            const file = fileInput?.files[0];
            getFile(file)
            setSelectedFile(URL.createObjectURL(file));
        }
    };

    return (
            <label className="ui-file-button">

                {
                    selectedFile
                        ? <img className="ui-file-button-image" src={selectedFile} alt="Вибране зображення" />
                        : <IconArrachFile />
                }
                <input

                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                />
            </label>
    )
}


