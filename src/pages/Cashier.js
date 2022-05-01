import React from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import {BrowserRouter as Router,  Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Transactions from './Transactions/Transactions'
import Executives from './Executives/Executives'
import Comissions from './Commissions/Commissions'
import Concepts from './Concepts/Concepts'
import Denominations from './Denominations/Denominations'
import PositionArea from './PositionArea/PositionArea'
import Interests from './Interests/Interests'
import CreditDetails from './CreditDetails/CreditDetails'
import Clients from './Clients/Clients'
import Cuts from './Cuts/Cuts'

const Cashier = () => {
  return (
    <DashboardSidebar role={2}>
            <Routes>
                <Route exact path={'/transactions'} element={<Transactions/>}/>
                <Route exact path={'/cuts'} element={<Cuts/>}/>
            </Routes>
    </DashboardSidebar>
  )
}

export default Cashier