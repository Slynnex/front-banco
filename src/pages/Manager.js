import React from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Accounts from './Accounts'
import Transfer from './Transfer'
import Executives from './Executives/Executives'
import Comissions from './Commissions/Commissions'
import Concepts from './Concepts/Concepts'
import Denominations from './Denominations/Denominations'
import PositionArea from './PositionArea/PositionArea'
import Interests from './Interests/Interests'
import CreditDetails from './CreditDetails/CreditDetails'

const Manager = () => {
  return (
    <DashboardSidebar role={1}>
            <Routes>
                <Route exact path ={'/'} element={<Dashboard/>}/>
                <Route exact path ={'/accounts'} element={<Accounts/>}/>
                <Route exact path={'/transfer'} element={<Transfer/>}/>
                <Route exact path={'/executives'} element={<Executives/>}/>
                <Route exact path={'/denominations'} element={<Denominations/>}/>
                <Route exact path={'/positionArea'} element={<PositionArea/>}/>
                <Route exact path={'/comissions'} element={<Comissions/>}/>
                <Route exact path={'/concepts'} element={<Concepts/>}/>
                <Route exact path={'/interests'} element={<Interests/>}/>
                <Route exact path={'/creditdetails'} element={<CreditDetails/>}/>
            </Routes>
    </DashboardSidebar>
  )
}

export default Manager