import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PortraitIcon from '@mui/icons-material/Portrait';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SettingsIcon from '@mui/icons-material/Settings';



const Navbar = () => {
  return (
    <div className='navbar'>
      <ul className='navlinks'>
        <li className='link'><Link to='/' title='Home'><HomeIcon/></Link></li>
      </ul>
      
      <ul className='navlinks'>
        <li><Link to='/ticket' title='Tickets'><ConfirmationNumberIcon/></Link></li>
        <li><Link to='/schedule' title='Schedule'><EventNoteIcon/></Link></li>
        <li><Link to='/profile' title='Profile'><PortraitIcon/></Link></li>
        <li><Link to='/settings' title='Settings'><SettingsIcon/></Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
