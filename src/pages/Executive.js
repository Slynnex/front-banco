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
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const Executive = () => {
  const navigate = useNavigate();

  React.useEffect(()=>{
    const token = localStorage.getItem('token');
    const decode = jwt_decode(token);
    if (!token) {
      navigate('/', { replace: true });
    }
    if(decode.session.rol === 'manager'){
      navigate('/manager', { replace: true });
    }
    if(decode.session.rol === 'cashier'){
      navigate('/cashier', { replace: true });
    }
  },[])

  return (
    <DashboardSidebar role={3}>
            <Routes>
                <Route exact path={'/transactions'} element={<Transactions/>}/>
                <Route exact path={'/cuts'} element={<Cuts/>}/>
                <Route exact path={'/clients'} element={<Clients/>}/>
            </Routes>
    </DashboardSidebar>
  )
}

export default Executive