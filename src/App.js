import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Manager from './pages/Manager';
import Cashier from './pages/Cashier';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/manager/*' element={<Manager/>}/>
        <Route exact path='/cashier/*' element={<Cashier/>}/>
      </Routes>
    </Router>
  );
}

export default App;
