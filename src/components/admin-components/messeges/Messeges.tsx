import {useState} from 'react'
import { AdminSubHeader } from '../../ui/AdminSubHeader'
const Messeges = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false) 
 
  const changeAdd = () => {
    setIsOpenAdd(s => !s)
  }

  return (
    <div className='admin'>
      {/* <AdminSubHeader title={"Messenger"} onClickButton={changeAdd}  /> */}
    </div>
  )
}

export default Messeges