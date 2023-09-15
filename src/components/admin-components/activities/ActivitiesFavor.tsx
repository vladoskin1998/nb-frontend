import React, { useState } from 'react'
import ServicesFavorList from '../services/ServicesFavorList'
import ActivitiesFavorModal from './ActivitiesFavorModal'

export const ActivitiesFavorList = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div onClick={()=>setIsOpen(true)}>
      <ServicesFavorList />
      <ActivitiesFavorModal isOpen={isOpen} setIsOpen={(o:boolean) => setIsOpen(o)}/>
    </div>

  )
}
