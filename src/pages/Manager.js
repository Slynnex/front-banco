import React, {useContext} from 'react'
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
import { useNavigate } from "react-router-dom";
import Mortgages from './Mortgages/Mortgages'
import { Context } from '../context/User/UserContext'

const Manager = () => {
  const {state} = useContext(Context)
  const navigate = useNavigate();

  // Protection of routes and redirection
  React.useEffect(()=>{
    if (!state.token) {
      navigate('/', { replace: true });
    }
    if(state.rol === 'executive'){
      navigate('/executive', { replace: true });
    }
    if(state.rol === 'cashier'){
      navigate('/cashier', { replace: true });
    }
  },[])
  

  

  return (
    <DashboardSidebar role={1}>
            <Routes>
                <Route exact path ={'/'} element={<Dashboard/>}/>
                <Route exact path ={'/clients'} element={<Clients/>}/>
                <Route exact path={'/transactions'} element={<Transactions/>}/>
                <Route exact path={'/executives'} element={<Executives/>}/>
                <Route exact path={'/denominations'} element={<Denominations/>}/>
                <Route exact path={'/positionArea'} element={<PositionArea/>}/>
                <Route exact path={'/comissions'} element={<Comissions/>}/>
                <Route exact path={'/concepts'} element={<Concepts/>}/>
                <Route exact path={'/interests'} element={<Interests/>}/>
                <Route exact path={'/creditdetails'} element={<CreditDetails/>}/>
                <Route exact path={'/cuts'} element={<Cuts/>}/>
                <Route exact path={'/mortgages'} element={<Mortgages/>}/>
            </Routes>
    </DashboardSidebar>
  )
}

export default Manager