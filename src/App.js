import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login';
import Manager from './pages/Manager';
import Cashier from './pages/Cashier';

import { Provider as ExecutiveProvider } from './context/Executives/ExecutivesContext'
import { Provider as DenominationProvider } from './context/Denominations/DenominationsContext'
import {Provider as PositionAreaProvider} from './context/PositionArea/PositionAreaContext'
import {Provider as CommissionProvider} from './context/Commissions/CommissionsController'
import {Provider as InterestsProvider} from './context/Interests/InterestsContext'
import {Provider as CreditDetailsProvider} from './context/CreditDetails/CreditDetailsContext'



function App() {
  return (
    <ExecutiveProvider>
      <PositionAreaProvider>
        <DenominationProvider>
          <CommissionProvider>
            <InterestsProvider>
              <CreditDetailsProvider>
                <Router>
                  <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route exact path='/manager/*' element={<Manager />} />
                    <Route exact path='/cashier/*' element={<Cashier />} />
                  </Routes>
                </Router>
              </CreditDetailsProvider>
            </InterestsProvider>
          </CommissionProvider>
        </DenominationProvider>
      </PositionAreaProvider>
    </ExecutiveProvider>

  );
}

export default App;
