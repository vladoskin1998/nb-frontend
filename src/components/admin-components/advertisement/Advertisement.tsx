import {useState} from 'react'
import { AdminSubHeader } from '../../ui/AdminSubHeader'

const Advertisement = () => {
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
      {/* <AdminSubHeader title={"Active"} onClickButton={changeAdd} onClickChevron={changeChevron} /> */}
    </div>
  )
}

export default Advertisement