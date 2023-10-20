import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v1 as uuidv4 } from "uuid"
import { FileButton } from "../../ui/FileButton"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { setLoader, setValueProfileReducer } from "../../../reducer/profile"
import { profileUploadCertificates } from "../../../services/profile"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"

interface CertificatesInterface {
    id: string
    file: File | null
}

export const ProfileCertificates = () => {
    const navigate = useNavigate()
    const { _id, role } = useAppSelector((s) => s.userReducer)
    const dispatch = useAppDispatch()
    const [certificates, setCertificates] = useState<CertificatesInterface[]>([
        { file: null, id: uuidv4() },
    ])

    const changeItemCertificates = ({
        index,
        file,
    }: {
        index: string
        file: File
    }) => {
        console.log("filehandleFileSelect");
        console.log(index,
            file,);
        
        setCertificates(
            certificates.map((item, id) =>
                item.id === index ? { ...item, file } : item
            )
        )
    }

    const addItemCertificates = () => {
        setCertificates((s) => [...s, { file: null, id: uuidv4() }])
    }

    const uploadToServerCertificates = async () => {
        try {
            let isAllFiles = true

            const formData = new FormData()
            const payload = { _id }

            formData.append("payload", JSON.stringify(payload))
            if (certificates) {
                for (let i = 0; i < certificates.length; i++) {
                    if (!certificates[i].file) {
                        continue
                    }
                    formData.append("files", certificates[i].file as Blob)
                }
            }

            dispatch(setLoader(true))

            const res = await profileUploadCertificates(formData)

            dispatch(setValueProfileReducer(res))
            dispatch(setLoader(false))

            navigate("/profile/birth")
        } catch (error) {
            dispatch(setLoader(false))
            alert("upload file is faild" + error)
        }
    }

    console.log(certificates);
    

    return (
        <>
            <div className="profile__certificates">
                <div className="profile__certificates-body">
                    {certificates.map((item, index) => (
                        <FileButton
                            key={item.id}
                            getFile={(file: File) =>{                                
                               changeItemCertificates({ index: item.id, file })
                                }
                            }
                            image={item.file as File}
                        />
                    ))}
                </div>
            </div>
            <button
                onClick={addItemCertificates}
                className="profile__method-btlater profile__method-btlater--white"
            >
                Add Sertificates
            </button>
            <ProfileButtonSetupLater />
            <button
                className={`profile__method-btlater`}
                onClick={uploadToServerCertificates}
            >
                Continue
            </button>
        </>
    )
}
