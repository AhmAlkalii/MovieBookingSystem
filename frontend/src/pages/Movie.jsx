import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Movies } from '../helper'



const Movie = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:3001/movies');
            setMovies(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    


  return (
    <div className='Movie'>
        <div className='heading'>
            <h2 >Upcoming</h2>
        </div>
        <div className='Movie-container'>
            {movies.map((movie) => (
                <div className='movie-box' key={movie._id}>
                    <img src={movie.poster} />
                    <div className='movie-layer'>
                        <p className='title'>{movie.name}</p>
                    </div>
                </div>
            ))}

        </div>

    </div>
  )
}

export default Movie