import {useState} from 'react'
import { AdminSubHeader } from '../../ui/AdminSubHeader'
 
export const HelpCenter = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenChevron, setIsOpenChevron] = useState(false)

  const changeAdd = () => {
    setIsOpenAdd(s => !s)
  }

  const changeChevron = () => {
    setIsOpenChevron(s => !s)
  }

  return (
    <div className='admin'>
      {/* <AdminSubHeader title={"Incoming"} onClickButton={changeAdd} onClickChevron={changeChevron} /> */}
    </div>
  )
}
