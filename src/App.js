import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login';
import Manager from './pages/Manager';
import Cashier from './pages/Cashier';

import { Provider as ExecutiveProvider } from './context/Executives/ExecutivesContext'

import { Provider as DenominationProvider } from './context/Denominations/DenominationsContext'

function App() {
  return (
    <ExecutiveProvider>
      <DenominationProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/manager/*' element={<Manager />} />
            <Route exact path='/cashier/*' element={<Cashier />} />
          </Routes>
        </Router>
      </DenominationProvider>
    </ExecutiveProvider>
  );
}

export default App;
