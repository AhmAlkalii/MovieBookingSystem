import './App.css' ; 
import {BrowserRouter as Provider, Routes ,Route} from 'react-router-dom'; 
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Login from './pages/LoginPage';

function App() {
  return (
    <>
      <Provider>         
        <Routes>          
          <Route path='/ticket' element={<Ticket/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>} />
        </Routes>
      </Provider>
       
    </>
  )
}

export default App
