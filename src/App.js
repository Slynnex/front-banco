import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login';
import Manager from './pages/Manager';
import Cashier from './pages/Cashier';


import {Provider as ConceptProvider} from './context/Concepts/ConceptsContext'
import { Provider as ExecutiveProvider } from './context/Executives/ExecutivesContext'
import { Provider as DenominationProvider } from './context/Denominations/DenominationsContext'
import {Provider as PositionAreaProvider} from './context/PositionArea/PositionAreaContext'
import {Provider as CutsProvider} from './context/Cuts/CutsContext'
import {Provider as CommissionProvider} from './context/Commissions/CommissionsController';
import {Provider as ClientsProvider} from './context/Clients/ClientsContext';
import {Provider as CreditDetailsProvider} from './context/CreditDetails/CreditDetailsContext';
import {Provider as InterestsProvider} from './context/Interests/InterestsContext';
import {Provider as TransactionsProvider} from './context/Transactions/TransactionsContext';
import Executive from './pages/Executive';

function App() {
  return (
    <ExecutiveProvider>
      <PositionAreaProvider>
        <DenominationProvider>
          <CommissionProvider>
            <ClientsProvider>
              <CreditDetailsProvider>
                <InterestsProvider>
                  <ConceptProvider>
                    <TransactionsProvider>
                      <CutsProvider>
                        <Router>
                          <Routes>
                            <Route exact path='/' element={<Login />} />
                            <Route exact path='/manager/*' element={<Manager />} />
                            <Route exact path='/cashier/*' element={<Cashier />} />
                            <Route exact path='/executive/*' element={<Executive/>}/> 
                          </Routes>
                        </Router>
                      </CutsProvider>
                    </TransactionsProvider>
                  </ConceptProvider>
                </InterestsProvider>
              </CreditDetailsProvider>
            </ClientsProvider>
          </CommissionProvider>
        </DenominationProvider>
      </PositionAreaProvider>
    </ExecutiveProvider>
  );
}
export default App;
