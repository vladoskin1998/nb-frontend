import { useState } from "react"
import { Link } from "react-router-dom"
import { v1 as uuidv4 } from "uuid"
import { FileButton } from "../../ui/FileButton"

interface CertificatesInterface {
    id: string
    file: File | null
}

export const ProfileCertificates = () => {
    const [certificates, setCertificates] = useState<CertificatesInterface[]>([
        { file: null, id: uuidv4() },
    ])

    const changeItemCertificates = ({
        index,
        file,
    }: {
        index: number
        file: File
    }) => {
        setCertificates(
            certificates.map((item, id) =>
                id === index ? { ...item, file } : item
            )
        )
    }

    const addItemCertificates = () => {
        setCertificates((s) => [...s, { file: null, id: uuidv4() }])
    }

    return (
        <>
            <div className="profile__certificates">
                <div className="profile__certificates-body">
                    {certificates.map((item, index) => (
                        <FileButton
                            getFile={(file: File) =>
                                changeItemCertificates({ index, file })
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
                Add SubCategory
            </button>
            <button className="profile__method-btlater profile__method-btlater--inherit">
                Setup later
            </button>
            <button className={`profile__method-btlater`}>
                <Link to={"/profile/birth"}>Continue</Link>
            </button>
        </>
    )
}
