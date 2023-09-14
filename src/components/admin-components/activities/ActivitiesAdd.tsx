import { useEffect, useState } from "react"
import { FileButton } from "../../ui/FileButton"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { useNavigate } from "react-router"
import { v1 as uuidv4 } from "uuid"
import { useAppDispatch } from "../../../utils/hooks"
import { addActivities } from "../../../services/activities"

interface CategoryInterface {
    id: string
    name: string
    file: File
}

const activitiesBody = {
    id: "",
    name: "",
    file: null as any,
}

const ActivitiesAdd = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [activities, setActivities] = useState({ ...activitiesBody, id: uuidv4() })



    const addNewCategory = async () => {
        try {
            const formData = new FormData()
            const payload = {
                activitie: {
                    fileName: `${activities.id}.${activities?.file?.type.split("/")[1]}`,
                    name: activities.name,
                }

            }

            formData.append("payload", JSON.stringify(payload))
            formData.append("files", activities.file, activities.id)
            dispatch(
                addActivities(
                    formData
                )
            )

            setActivities({ ...activitiesBody, id: uuidv4() })
        } catch (error) {
            throw error
        }
    }

    return (
        <>
            <div className="ui-admin__subheader">
                <div className="ui-admin__subheader-title">
                    <div
                        className="services__exit"
                        onClick={() => navigate(-1)}
                    >
                        <button>
                            <IconLeftChevrons />
                        </button>
                        <h6>Add Activities Category</h6>
                    </div>
                </div>
            </div>
            <div className="services__add">
                <div>
                    <input
                        type="text"
                        placeholder="Activities Name"
                        className="services__add-input"
                        value={activities.name}
                        onChange={(e) =>
                            setActivities((s) => ({
                                ...s,
                                name: e.target.value,
                            }))
                        }
                    />
                    <FileButton
                        getFile={(file: File) => {
                            setActivities((s) => ({ ...s, file }))
                        }}
                        image={activities.file}
                    />
                </div>
                <button
                    className="services__add-button services__add-button-2"
                    onClick={addNewCategory}
                >
                    Publish
                </button>
            </div>
        </>
    )
}

export default ActivitiesAdd
