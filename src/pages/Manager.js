import React from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Accounts from './Accounts'
import Transfer from './Transfer'
import Executives from './Executives'
import Areas from './Areas'
import Comissions from './Comissions'
import Concepts from './Concepts'
import Denominations from './Denominations'
import Positions from './Positions'

const Manager = () => {
  return (
    <DashboardSidebar role={1}>
            <Routes>
                <Route exact path ={'/'} element={<Dashboard/>}/>
                <Route exact path ={'/accounts'} element={<Accounts/>}/>
                <Route exact path={'/transfer'} element={<Transfer/>}/>
                <Route exact path={'/executives'} element={<Executives/>}/>
                <Route exact path={'/denominations'} element={<Denominations/>}/>
                <Route exact path={'/positions'} element={<Positions/>}/>
                <Route exact path={'/areas'} element={<Areas/>}/>
                <Route exact path={'/comissions'} element={<Comissions/>}/>
                <Route exact path={'/concepts'} element={<Concepts/>}/>
            </Routes>
    </DashboardSidebar>
  )
}

export default Manager