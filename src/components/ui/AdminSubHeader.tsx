import { ReactNode } from "react"
import { IconSubHeaderAdd } from "../svg/IconSubHeader"

export const AdminSubHeader = (
    {
        children,
        onClickButton 
    }:
        {
            children?: ReactNode,
            onClickButton?: () => void,
        }
) => {
    return (
        <div className='ui-admin__subheader'>
            <div className='ui-admin__subheader-title'>
                {children}
            </div>
            {
                onClickButton &&  <div>
                <button className='ui-admin__subheader-button' onClick={onClickButton}>
                    Add <IconSubHeaderAdd />
                </button>
            </div>
            }
           
        </div>
    )
}
