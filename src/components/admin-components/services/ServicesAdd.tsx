import { useState } from "react"
import { FileButton } from "../../ui/FileButton"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { useNavigate } from "react-router"

interface CategoryInterface {
    name: string,
    file: File
}

const categoryBody = {
    name: "",
    file: null as any
}

const ServicesAdd = () => {

    const [category, setCategory] = useState(categoryBody)
    const navigate = useNavigate()
    const [listSubCategory, setListSubCategory] = useState<CategoryInterface[]>(
        []
    )

    const addSubCategory = () => {
        setListSubCategory(s => ([...s, categoryBody]))
    }

    const changeItemSubName = ({ index, name, }: { index: number, name: string, }) => {
        setListSubCategory(s => {
            return s.map((item, id) => id === index ? { ...item, name } : item)
        }
        )
    }

    const changeItemSubFile = ({ index, file }: { index: number, file: File }) => {
        setListSubCategory(
            listSubCategory.map((item, id) => id === index ? { ...item, file } : item)
        )
    }

    const exit = () => navigate(-1)

    return (
        <>
            <div className="ui-admin__subheader">
                <div className="ui-admin__subheader-title">
                    <div className="services__exit" onClick={exit}>
                        <button>
                            <IconLeftChevrons />
                        </button>
                        <h6>
                            Add Service Category
                        </h6>
                    </div>
                </div>
            </div>
            <div className="services__add">
                <div>
                    <input type="text"
                        placeholder="Category Name"
                        className="services__add-input"
                        value={category.name}
                        onChange={(e) => setCategory(s => ({ ...s, name: e.target.value }))} />
                    <FileButton getFile={(file: File) => setCategory({ ...category, file })} />
                </div>
                {
                    listSubCategory.map(
                        (item, index) => {
                            return <div>
                                <input type="text"
                                    placeholder="Sub Category Name"
                                    className="services__add-input"
                                    value={item.name}
                                    onChange={e => changeItemSubName({ index, name: e.target.value })} />
                                <FileButton getFile={(file: File) => changeItemSubFile({ index, file })} />
                            </div>
                        }
                    )
                }
                <button onClick={addSubCategory} className="services__add-button services__add-button--white services__add-button-1">Add SubCategory</button>
                <button className="services__add-button services__add-button-2">Publish</button>
            </div>
        </>

    )
}

export default ServicesAdd

