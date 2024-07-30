import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'; 
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Login from './pages/LoginPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar/>

        <Routes>          
          <Route path='/' element={<Home/>} />
          <Route path='/ticket' element={<Ticket/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
