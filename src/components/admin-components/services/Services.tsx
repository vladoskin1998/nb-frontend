import { useState } from 'react'
import { AdminSubHeader } from '../../ui/AdminSubHeader'
import { Link, Route, Routes } from 'react-router-dom';
import ServicesAll from './ServicesAll';
import ServicesAdd from './ServicesAdd';
import ServicesSub from './ServicesSub';
import ServicesFavor from './ServicesFavor';

const Services = () => {


    return (
        <div className='admin'>
         
            <Routes>
                <Route path="servicessub" element={<ServicesSub />} />
                <Route path="favor" element={<ServicesFavor />}/>
                <Route path="servicesadd" element={<ServicesAdd />} />
                <Route path="*" element={<ServicesAll />} />
            </Routes>
        </div>
    )

}

export default Services