import React from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Accounts from './Accounts'
import Transfer from './Transfer'
import Executives from './Executives'

const Manager = () => {
  return (
    <DashboardSidebar role={1}>
            <Routes>
                <Route exact path ={'/'} element={<Dashboard/>}/>
                <Route exact path ={'/accounts'} element={<Accounts/>}/>
                <Route exact path={'/transfer'} element={<Transfer/>}/>
                <Route exact path={'/executives'} element={<Executives/>}/>
            </Routes>
    </DashboardSidebar>
  )
}

export default Manager