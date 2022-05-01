import React, {useContext} from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import {BrowserRouter as Router,  Routes, Route} from 'react-router-dom'
import Transactions from './Transactions/Transactions'
import Cuts from './Cuts/Cuts'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const Cashier = () => {
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
    if(decode.session.rol === 'executive'){
      navigate('/executive', { replace: true });
    }
  },[])

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