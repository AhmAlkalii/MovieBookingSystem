import React, { useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Room from '../components/Room';

const customSashRender = (index, active) => (
    <div
      style={{
        background: '#021526',
        width: '2.4px', 
        height: '100%', 
        cursor: 'col-resize',
      }}
    />
  );
  

const MovieDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie } = location.state;
  const [sizes, setSizes] = useState(['42%', 'auto']);

  const layoutCSS = {
    height: '160%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  };

  const secondlayoutCSS = {
    height: '160%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  };


  const handleClick = () => {
    window.open(movie.trailer, '_blank');
  };
  

  return (
    <div style={{ height: '160vh', width: '100%' }}>
      <SplitPane
        split='vertical'
        sizes={sizes}
        onChange={setSizes}
        allowResize={false}
        sashRender={customSashRender}
      >
        <Pane minSize={50} maxSize='50%'>
          <div style={{ ...layoutCSS, background: '#F8EDED' }}>
            <div className='arrow' onClick={() => navigate('/movies') }>
                <ArrowBackIcon style={{fontSize:20}}/>  
            </div>
            
            <div className='movie-container'>
              <div className='movie-secbox'>
                <img src={movie.poster} />
              </div>

              <div className='details'>
                <h1>{movie.name}</h1>
                <p>{movie.description}</p>
              </div>

              <div className='actions'>
                <div className='action-item' onClick={handleClick}>
                  <PlayCircleIcon style={{ fontSize: 130 }} />
                  <span className='action-text'>Play</span>
                </div>
                <div className='action-item'>
                  <BookmarkBorderIcon style={{ fontSize: 130 }} />
                  <span className='action-text'>Save</span>
                </div>
              </div>

            </div>

          </div>




        </Pane>
        <div style={{ ...secondlayoutCSS, background: '#a1a5a9' }}>
          <Room movie={movie}/>
        </div>
      </SplitPane>
    </div>
  );
};

export default MovieDetails;
