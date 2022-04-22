import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './pages/Login';
import Manager from './pages/Manager';
import Cashier from './pages/Cashier';

import {Provider as ExecutiveProvider} from './context/Executives/ExecutivesContext';
import {Provider as CommissionProvider} from './context/Comissions/ComissionsController';

function App() {
  return (
    <ExecutiveProvider>
      <CommissionProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/manager/*' element={<Manager/>}/>
          <Route exact path='/cashier/*' element={<Cashier/>}/>
        </Routes>
      </Router>
      </CommissionProvider>
    </ExecutiveProvider>

  );
}

export default App;
