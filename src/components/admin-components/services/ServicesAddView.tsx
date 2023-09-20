import { FileButton } from "../../ui/FileButton"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { PropsServicesAddViewInterface } from "../../../types/services"
import { isEmptyFiledsObject } from "../../../utils/patterns"

const ServicesAddView = ({
    exit,
    handlerChangeNameCategory,
    handlerChangeFileCategory,
    idCategories,
    category,
    listSubCategory,
    addSubCategory,
    publishCategory,
    changeItemSubName,
    changeItemSubFile,
}: PropsServicesAddViewInterface) => {

    const validation = (idCategories ? listSubCategory : [category, ...listSubCategory ]).every(isEmptyFiledsObject)


    console.log("validation-->",validation);
    
    return (
        <>
            <div className="ui-admin__subheader">
                <div className="ui-admin__subheader-title">
                    <div className="services__exit" onClick={exit}>
                        <button>
                            <IconLeftChevrons />
                        </button>
                        <h6>Add Service Category</h6>
                    </div>
                </div>
            </div>
            <div className="services__add">
                {!idCategories ? (
                    <div>
                        <input
                            type="text"
                            placeholder="Category Name"
                            className="services__add-input"
                            value={category.name}
                            onChange={(e) =>
                                handlerChangeNameCategory(e.target.value)
                            }
                        />
                        <FileButton
                            getFile={(file: File) =>
                                handlerChangeFileCategory(file)
                            }
                            image={category.file}
                        />
                    </div>
                ) : (
                    <></>
                )}
                {listSubCategory.map((item, index) => {
                    return (
                        <div>
                            <input
                                type="text"
                                placeholder="Sub Category Name"
                                className="services__add-input"
                                value={item.name}
                                onChange={(e) =>
                                    changeItemSubName({
                                        index,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <FileButton
                                getFile={(file: File) =>
                                    changeItemSubFile({ index, file })
                                }
                                image={item.file}
                            />
                        </div>
                    )
                })}
                <button
                    onClick={addSubCategory}
                    className="services__add-button services__add-button--white services__add-button-1"
                >
                    Add SubCategory
                </button>
                <button
                    className={`services__add-button services__add-button-2 ${!validation ? "services__add-button--disabled": ""}`}
                    onClick={validation ? publishCategory : () => alert('Fill in all fields, add all images and names of categoties')}
                >
                    Publish
                </button>
            </div>
        </>
    )
}

export default ServicesAddView
