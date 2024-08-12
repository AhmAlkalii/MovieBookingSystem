import {BrowserRouter as Router, Routes ,Route, Navigate} from 'react-router-dom'; 
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Navbar from './components/Navbar';
import Movie from './pages/Movie';
import MovieDetails from './pages/MovieDetails';
import Room from './components/Room';
import { useAuthContext } from './hooks/useAuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Profile from './pages/Profile';

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Router>
        <Navbar/>

        <Routes>          
          <Route path='/' element={<Home/>}/>
          <Route path='/schedule' element={user ? <Schedule/> : <Navigate to='/Login'/>}/>
          <Route path='/movies' element={<Movie/>}/>
          <Route path='/movie/:id' element={user ? <MovieDetails/> : <Navigate to='/Login'/>}/>
          <Route path='/room' element={<Room/>}/>
          <Route path='/profile' element={user ? <Profile/> : <Navigate to='/Login'/>}/>
          <Route path='/Sign-Up' element={!user ? <Signup/> : <Navigate to='/'/> }/>
          <Route path='/Login' element={!user? <Login/> : <Navigate to='/'/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
