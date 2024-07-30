import React from 'react';
import Button from '@mui/material/Button';
import movie from '../assets/movie2.svg';
import wave from '../assets/wave.svg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="Home">
      <div className="content">
        <img src={movie} className='mylogo' alt="Movie Logo" />
        <div className="homeitems">
          <h2 style={{ fontSize: 70 }}>Welcome to the Home of Movies</h2>
          <p>Explore our extensive collection and discover the perfect movie for your next viewing experience. Enjoy your stay!</p>
        </div>
        <div className='newbutton'> 
            <Button variant="outlined"><Link to='/schedule'>Check out Schedule</Link></Button>
        </div>
      </div>
      <footer className="footer">
        <img src={wave} className='wave' alt="Wave Decoration" />
      </footer>
    </div>
  );
};

export default Home;
