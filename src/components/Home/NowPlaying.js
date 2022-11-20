import React, { useState, useEffect, useCallback } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import SegmentIcon from '@mui/icons-material/Segment';
import {LINK, API_KEY} from '../URL/Settings';
import {useNavigate} from 'react-router-dom'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


function NowPlaying() {
    const navigate = useNavigate()
    const [getMoviesPlaying, setGetMoviesPlaying] = useState()
    const [showSidebar, setShowSidebar] = useState(false)
    const GetPlaying = async() => {
        const temp = await fetch(LINK + '/movie/now_playing?api_key=' + API_KEY)
        const data = await temp.json()

        setGetMoviesPlaying(data.results.slice(0, 1))
    }

    const toggleSidebar = () => {
        setShowSidebar(current => !current)
    }

    const navigateToMovie = useCallback(
        (movieId) => () => {
            console.log(movieId)
            navigate(`/movie/${movieId}`)
        }
    )

    useEffect(() => {
        GetPlaying()
    }, [])

  return (
    <>
        {getMoviesPlaying? 
                        
            <>
                <div className='flex justify-between items-center'>
                {/* {showSidebar == true? "Hello":"World"} */}
                    <h1 className='font-bold py-5'> Now Playing </h1> <div className='md:hidden cursor-pointer'><SegmentIcon className='text-sm' onClick={toggleSidebar} /> </div>
                </div>

                    <div className='grid grid-cols-1 place-content-center gap-3'>
                        {getMoviesPlaying.map(data => (
                            
                                <div className = "w-full lg:w-4/5 h-full relative py-3 cursor-pointer " onClick = {navigateToMovie(data.id)}>
                                    <LazyLoadImage 
                                        alt = {data.original_title}
                                        src = {`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
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
                    <div className='h-6 w-36 bg-zinc-800 rounded-full my-6'> </div>

                    <div className='grid grid-cols-1 place-content-center gap-3'>
                        <div className='h-80 bg-zinc-800 rounded-md my-1'> </div>
                    </div>  
                </>
            }
    </>
  )
}

export default NowPlaying