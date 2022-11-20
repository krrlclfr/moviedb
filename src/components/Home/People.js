import React, { useState, useEffect, useCallback } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import SegmentIcon from '@mui/icons-material/Segment';
import {LINK, API_KEY} from '../URL/Settings';
import {useNavigate} from 'react-router-dom'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function People() {
    const navigate = useNavigate()
        
    const [getPeople, setPeople] = useState()
    const [currentPage] = useState(1)

    const navigateToMovie = useCallback(
        (movieId) => () => {
            console.log(movieId)
            navigate(`/movie/${movieId}`)
        }
    )


    const navigateToPopular = useCallback(
        (id) => () => {
            console.log(id)
            navigate(`/movies/${id}/page=${currentPage}`)
        }
    )

    const GetPeople = async() => {
        const temp = await fetch(LINK + '/person/popular?api_key=' + API_KEY)
        const data = await temp.json()

        setPeople(data.results.slice(0, 12))
    }


    useEffect(() => {
        GetPeople()
    }, [])

  return (
    <>
        {getPeople? 
            <> 
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold py-5'> Popular People </h1> <button className='text-sm border-rose-800 border rounded-lg hover:bg-rose-900' onClick={navigateToPopular("popular")}> View All </button>
                </div>
                <div className='grid grid-cols-2 place-content-center gap-3 md:grid-cols-2 lg:grid-cols-4'>
                    {getPeople.map(data => (
                        
                            <div className = "flex w-full relative h-full py-3 relative cursor-pointer  " onClick = {navigateToMovie(data.id)}>
                                
                                <div className='flex hover:bg-slate-400/50 bg-slate-500/20 justify-start items-center w-full rounded-full'>

                                    <LazyLoadImage 
                                            alt = {data.original_title}
                                            src = {`https://image.tmdb.org/t/p/original${data.profile_path}`}
                                            key = {data.id}
                                            effect = "blur"
                                            className = "rounded-full h-16 w-16 object-cover"
                                    />
                                    <LazyLoadComponent>

                                        <div className='mx-3'>
                                            <span className='font-bold text-xs text-[10px] lg:text-xs md:text-xs'> {data.name} </span>
                                            <span className='font-bold text-xs text-[10px] lg:text-xs md:text-xs flex items-center'>  <StarIcon className='text-white' /> {data.popularity} </span>
                                        </div>
                                    </LazyLoadComponent>
                                </div>
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

export default People