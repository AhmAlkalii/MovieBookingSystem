import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, getMoviesError, getMoviesStatus, selectAllMovies } from '../redux/movie'
import { useNavigate } from 'react-router-dom'



const Movie = () => {
    const dispatch = useDispatch()
    const movies = useSelector(selectAllMovies)
    const movieStatus = useSelector(getMoviesStatus)
    const error = useSelector(getMoviesError)
    const navigate = useNavigate()


    useEffect(() => {
        if( movieStatus === 'idle'){
            dispatch(fetchMovies())
        }
    }, [movieStatus,dispatch])    


    if (movieStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (movieStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

  return (
    <div className='Movie'>
        <div className='heading'>
            <h2 >Upcoming</h2>
        </div>
        <div className='Movie-container'>
            {movies.map((movie) => (
                <div className='movie-box' 
                key={movie._id} 
                onClick={() => navigate(`/movie/${movie._id}`,{
                    state:{movie}
                })}>
                    <img src={movie.poster} />
                    <div className='movie-layer'>
                        <h4 className='title'>{movie.name}</h4>
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default Movie