
export interface ServicesInterface{
    id: string,
    name: string,
    numberView: number,
}

export interface SubCategoriesInterface extends ServicesInterface{
    subCategoriesNames: []
}

export interface subCategoriesNames{
    id: string,
    name: string,
    user: {
        id: string,
        name: string,
        mark: number,
        markNumber: number,
    },
    view: number,
    like: number,
    date: Date | string,
    location: string 
}

export interface ServicesResponseInterface extends ServicesInterface{
    subCategories: SubCategoriesInterface[]
}

export interface CategoryInterface {
    id: string
    name: string
    file: File
}


export interface PropsServicesAddViewInterface{
    exit: () => void
    handlerChangeNameCategory: (s: string) => void
    handlerChangeFileCategory: (f: File) => void
    idCategories: string
    category: CategoryInterface
    listSubCategory: CategoryInterface[]
    addSubCategory: () => void
    publishCategory: () => void
    changeItemSubName: (s: { index: number; name: string }) => void
    changeItemSubFile: (s: { index: number; file: File }) => void
}