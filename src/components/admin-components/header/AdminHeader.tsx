import React, { useEffect, useState } from 'react'
import { IconAdminClose, IconAdminBurger, IconAdminImage } from '../../svg/IconAdminHeader'
import MenuHeader from './MenuHeader'
import { headerTitle } from '../../../utils/menu-title'
const AdminHeader = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(headerTitle(""))

  useEffect(() => {
    if (isOpen) {
      setTitle("Menu")
    }
    else {
      const localRoute = window.location?.pathname?.split('/')[2]      
      setTitle(
        headerTitle(localRoute)
      )
    }
  }, [isOpen])


  

  return (
    <div className='admin__header'>
      <button onClick={() => setIsOpen(s => !s)} className='admin__header-button'>
        {isOpen ? <IconAdminClose /> : <IconAdminBurger />}
      </button>
      <h4 className='admin__header-title'>
        {title}
      </h4>
      <button className='admin__header-button'>
        <IconAdminImage />
      </button>
      <MenuHeader isOpen={isOpen} setIsOpen={(o: boolean) => setIsOpen(o)} />
    </div>
  )
}

export default AdminHeader