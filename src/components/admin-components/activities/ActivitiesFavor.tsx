import React, { useState } from 'react'
import ServicesFavorList from '../services/ServicesFavorList'
import ActivitiesFavorModal from './ActivitiesFavorModal'
import { ActivitiesFavorList } from './ActivitiesFavorList'

export const ActivitiesFavor = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div onClick={()=>setIsOpen(true)}>
      <ActivitiesFavorList />
      <ActivitiesFavorModal isOpen={isOpen} setIsOpen={(o:boolean) => setIsOpen(o)}/>
    </div>

  )
}
