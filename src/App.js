import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import Login from './pages/Login';
import Manager from './pages/Manager';
import Cashier from './pages/Cashier';


import { Provider as ConceptProvider } from './context/Concepts/ConceptsContext'
import { Provider as ExecutiveProvider } from './context/Executives/ExecutivesContext'
import { Provider as DenominationProvider } from './context/Denominations/DenominationsContext'
import { Provider as PositionAreaProvider } from './context/PositionArea/PositionAreaContext'
import { Provider as CutsProvider } from './context/Cuts/CutsContext'
import { Provider as CommissionProvider } from './context/Commissions/CommissionsController';
import { Provider as ClientsProvider } from './context/Clients/ClientsContext';
import { Provider as CreditDetailsProvider } from './context/CreditDetails/CreditDetailsContext';
import { Provider as InterestsProvider } from './context/Interests/InterestsContext';
import { Provider as TransactionsProvider } from './context/Transactions/TransactionsContext';
import { Provider as UserProvider } from './context/User/UserContext';
import { Provider as MortgagesProvider } from './context/Mortgages/MortgagesContext'
import Executive from './pages/Executive';
import NotFound from './pages/NotFound';

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
                        <UserProvider>
                          <MortgagesProvider>
                            <Router>
                              <Routes>
                                <Route exact path='/' element={<Login />} />
                                <Route exact path='/manager/*' element={<Manager />} />
                                <Route exact path='/cashier/*' element={<Cashier />} />
                                <Route exact path='/executive/*' element={<Executive />} />
                                <Route path='*' element={<NotFound/>}/>
                              </Routes>
                            </Router>
                          </MortgagesProvider>
                        </UserProvider>
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
