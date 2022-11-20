import React, { useState, useEffect, useCallback } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import SegmentIcon from '@mui/icons-material/Segment';
import {LINK, API_KEY} from '../URL/Settings';
import {useNavigate} from 'react-router-dom'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function PopularMovies() {
    const navigate = useNavigate()
    const [getMoviesPopular, setGetMoviesPopular] = useState()
    const [currentPage] = useState(1)
    const type = "movie"
    const navigateToMovie = useCallback(
        (movieId) => () => {
            console.log(movieId)
            navigate(`/movie/${movieId}`)
        }
    )
    const GetPopular = async() => {
        const temp = await fetch(LINK + '/movie/popular?api_key=' + API_KEY)
        const data = await temp.json()
        setGetMoviesPopular(data.results.slice(0, 5))
    }

    const navigateToPopular = useCallback(
        (id) => () => {
            navigate(`/${type}/${id}/page=${currentPage}`)
        }
    )

    useEffect(() => {
        GetPopular()
    }, [])

  return (
    <>
         {getMoviesPopular? 
            <>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold py-5'> Popular Movies </h1> <button className='text-sm border-rose-800 border rounded-lg hover:bg-rose-900' onClick={navigateToPopular("popular")}> View All </button>
                </div>
                
                <div className='grid grid-cols-2 place-content-center gap-3 md:grid-cols-3 lg:grid-cols-5'>
                    {getMoviesPopular.map(data => (
                        
                            <div className = "w-full h-full relative py-3 cursor-pointer  " onClick = {navigateToMovie(data.id)}>
                                <LazyLoadImage 
                                    alt = {data.original_title}
                                    src = {`https://image.tmdb.org/t/p/original${data.poster_path}`}
                                    key = {data.id}
                                    effect = "blur"
                                    className = "rounded-lg"
                                />

                                <LazyLoadComponent> 
                                    <div className = "backdrop-blur-md flex absolute bottom-3 hover:bg-slate-900/50 bg-slate-700/50 w-full justify-between items-center rounded-lg py-2 px-2">
                                        <div className = "flex items-center">
                                            <span className='px-2'> <PlayArrowIcon className='bg-slate-50/50 text-white h-5 w-5 px-1 py-1 rounded-full'/> </span> 
                                            <p className='font-bold text-xs lg:text-[10px]'> {data.original_title} </p>
                                        </div>
                                        <div className='flex items-center  h-14'>
                                        <span> <StarIcon className='border-l mb-1 text-white' fontSize = {'sm'}/></span>
                                            <p className='font-bold text-xs lg:text-[10px]'> {data.vote_average}</p>
                                        </div>
                                    </div>
                                </LazyLoadComponent>
                                
                            </div>   
                        
                    ))}
                </div>  
            </>
        :
            <>
                <div className='flex justify-between items-center'>
                    <div className='h-6 w-36 bg-zinc-800 rounded-full my-6'> </div>  <div className='h-6 w-24 bg-zinc-800 rounded-full my-6'> </div>
                </div>

                

                <div className='grid grid-cols-2 place-content-center gap-3 md:grid-cols-3 lg:grid-cols-5'>
                    <div className='h-64 bg-zinc-800 rounded-md '> </div>
                    <div className='h-64 bg-zinc-800 rounded-md '> </div>
                    <div className='h-64 bg-zinc-800 rounded-md '> </div>
                    <div className='h-64 bg-zinc-800 rounded-md '> </div>
                    <div className='h-64 bg-zinc-800 rounded-md '> </div>
                </div> 

            </>
        }
    </>
  )
}

export default PopularMovies