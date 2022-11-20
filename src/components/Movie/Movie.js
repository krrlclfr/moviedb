import React, { useEffect, useState, Suspense, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { StarIcon, HeartIcon } from '@heroicons/react/24/outline'
import {LINK, API_KEY, IMAGE} from '../URL/Settings'
import CircularProgress from '@mui/material/CircularProgress';
import Pictures from './Pictures'
import Trailer from './Trailer'
import Recommendations from './Recommendations'
import Reviews from './Reviews'
import Footer from '../Footer';
const GenresList = React.lazy(() => import("../GenresList/GenresList.js"))
const Trending = React.lazy(() => import("../Trending/Trending.js"))
const SearchInput = React.lazy(() => import("../Search/SearchInput.js"))

function Movie() {
    const params = useParams()
    const [currentPage] = useState(1)
    const [movie, setMovie] = useState('')
    const placeholderImage = process.env.PUBLIC_URL + '/image/no_image.png'

    const getMovie = async() => {
        const temp = await fetch(LINK + '/movie/' + params.id + '?api_key=' + API_KEY)
        const data = await temp.json()
        console.log(data)
        setMovie(data)
    }

    const handleGenreMovie = useCallback(
        (id, name) => () => {
            window.location.href = (`/genre/${id}/name=${name}/page=${currentPage}`)
        }
    )

    useEffect(() => {
        getMovie()

    }, [])

  return (
    <div className='container-full bg-black text-white'>

        <div className = "flex flex-col-reverse grid grid-cols-1 gap-1 md:grid-cols-4 pt-16">
            {movie? 
                <>    
                   
                    <div className='hidden md:grid border-r border-slate-800 h-screen overflow-y-auto mt-8'>
                        <Suspense fallback={
                                <div className='h-screen grid grid-cols-1 place-items-center'>
                                    <CircularProgress />
                                </div>
                            }>  
                            <SearchInput />
                            
                            <Trending />
                        
                            <GenresList />
                        </Suspense>

                    </div> 

                    <div className='col-span-3 h-screen w-full overflow-y-auto md:mt-8'>
                        <div className='md:mr-1'>
                            <div className=' md:h-1/2'>
                                    <div className='h-[50vh] bg-slate-50/10 md:h-1/2'>
                                            <img src = {movie.backdrop_path? IMAGE + movie.backdrop_path:placeholderImage} className = "h-full w-full mix-blend-overlay object-cover"/> 
                                    </div>
                                    <div className='mt-[-70px] flex justify-center items-center '>
                                        <div className = "grid grid-cols-1 md:grid-cols-2 place-items-center bg-slate-50 z-10 rounded-md">
                                            <img src = {IMAGE + movie.poster_path} className = "z-10 h-full w-60  object-cover md:rounded-l-md " />

                                            <div className='w-60 pb-5 h-full text-black  flex justify-center items-center'>
                                                <div className=''>

                                                    <div className='flex justify-center items-center text-center py-1'>
                                                        <h1 className='font-bold text-md'> {movie.title}</h1>
                                                    </div>

                                                    <div className='grid grid-cols-2 place-items-center my-2 '>
                                                        <div className='grid grid-cols-1 text-center py-2 hover:bg-rose-700 hover:text-white h-full w-full'>
                                                            <span><StarIcon className='h-5 w-5 mx-auto md:h-6 md:w-6' /> </span> 
                                                            <p className = "text-xs">{movie.vote_average}</p>
                                                        </div>
                                                        <div className='grid grid-cols-1 text-center py-2 hover:bg-rose-700 hover:text-white h-full w-full'>
                                                            <span><HeartIcon className='h-5 w-5 mx-auto md:h-6 md:w-6' /> </span> 
                                                            <p className = "text-xs"> + </p>
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                    <div className='hidden flex justify-center items-center text-center py-1'>
                                                        <h1 className = "text-xs"> {movie.tagline} </h1>
                                                    </div>
                                                    <div className='flex justify-center items-center'>
                                                        <h1 className = "text-xs"> {movie.h1oh1ularity} </h1>
                                                    </div>
                                                    <div className='flex justify-center items-center text-center py-1'>
                                                        <h1 className = "text-xs"> {movie.release_date} </h1>
                                                    </div>
                                                    <div className='flex justify-center items-center text-center py-1'>
                                                        <h1 className = "text-xs"> {movie.runtime}m </h1>
                                                    </div>
                                                    <div className='flex justify-center items-center text-center py-1'>
                                                        <h1 className = "text-xs"> {movie.status} </h1>
                                                    </div>
                                                    <div className='grid grid-cols-2  text-center py-1'>
                                                        {movie.genres.map(data => (
                                                            <>
                                                                <span className='text-[10px] text-white bg-rose-700 mx-2 rounded-md px-2 py-2 my-1 cursor-pointer' onClick={handleGenreMovie(data.id, data.name)}> {data.name} </span>
                                                            </>
                                                        ))}
                                                    </div>
                                                    <div className='flex justify-center items-center text-center py-1'>
                                                        <h1 className = "text-xs"> " {movie.tagline} " </h1>
                                                    </div>
                                                </div>

                                                
                                            </div>
                                        </div>
                                    </div> 
                            </div>

                            <Trailer id = {params.id} />
                            <div className='grid text-left py-3 px-2'>
                                    <h1 className='font-bold text-md'> Overview: </h1>
                                    <h1 className = "text-sm"> {movie.overview} </h1>
                            </div>  
                            <hr className = "my-3"/>
                            <Reviews id = {params.id}/>
                            <hr className = "my-3" />
                            <Pictures id = {params.id}/>
                            <hr className = "my-3"/>
                            <Recommendations id = {params.id} />
                        </div>
                        <Footer />  
                    </div>

                   
                </>
                
            :null
            }

        </div>
 
        

        
    </div>
  )
}

export default Movie