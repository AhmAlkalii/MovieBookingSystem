import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'; 
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Login from './pages/LoginPage';
import Navbar from './components/Navbar';
import Movie from './pages/Movie';

function App() {
  return (
    <>
      <Router>
        <Navbar/>

        <Routes>          
          <Route path='/' element={<Home/>} />
          <Route path='/ticket' element={<Ticket/>}/>
          <Route path='/movies' element={<Movie/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
