
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


