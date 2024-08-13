import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PortraitIcon from '@mui/icons-material/Portrait';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext'
import Button from '@mui/material/Button';



const Navbar = () => {
  const {logout} = useLogout();
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  
  return (
    <div className='navbar'>
      <ul className='navlinks'>
        <li className='link'><Link to='/' title='Home'><HomeIcon/></Link></li>
      </ul>
      
      {user && (
        <ul className='navlinks'>
          
          <li>
            <Button variant="outlined" style={{color:"black"}}><span>{user.email}</span></Button>
          </li>
          <li><Link to='/schedule' title='Schedule'><ConfirmationNumberIcon/></Link></li>
          <li><Link to='/settings' title='Settings'><SettingsIcon/></Link></li>
          <li><Link onClick={handleClick} title='Logout'><LogoutIcon/></Link></li>
      </ul>
      )}
      
      {!user && (
      <ul className='navlinks'>
        <li><Button  variant="outlined"><Link to='/Sign-Up' title='SignUp'>Sign Up</Link></Button></li>
        <li><Link to='/Login' title='Login'><LoginIcon style={{fontSize:45}}/></Link></li>
      </ul>
      )}


    </div>
  );
};

export default Navbar;
