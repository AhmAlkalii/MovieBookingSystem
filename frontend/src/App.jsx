import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'; 
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Login from './pages/LoginPage';
import Navbar from './components/Navbar';
import Movie from './pages/Movie';
import MovieDetails from './pages/MovieDetails';
import Room from './components/Room';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

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
          <Route path='/movie/:id' element={<MovieDetails/>}/>
          <Route path='/room' element={<Room/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
