import React, { useEffect, useState, useCallback, useRef} from 'react'
import GenresList from './GenresList'
import {useNavigate, useParams} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import {ChevronRightIcon, ChevronLeftIcon} from '@heroicons/react/24/outline'
import {LINK, API_KEY} from '../URL/Settings';
function Genre() {
    const params = useParams()
    const navigate = useNavigate()
    const [getMovies, setGetMovies] = useState()
    const [genreList, setGenreList] = useState(false)
    const [next, setNext] = useState(2)
    const ref = useRef(null)
    const getDiscovery = async() => {
        const temp = await fetch(LINK + '/discover/movie?api_key=' + API_KEY + "&with_genres=" + params.id)
        const data = await temp.json()
        setGetMovies(data)

    }
    const handleGenres = () =>{
        setGenreList(!genreList)

    }
    const navigateToMovie = useCallback(
        (movieId) => () => {
            console.log(movieId)
            navigate(`/movie/${movieId}`)
        }
    )

    // const handleNextPage = async() => {
    //     setNext(next + 1)
    //     console.log(next)
    //     const temp = await fetch(`https://api.jikan.moe/v4/top/anime?page=${next}`)
    //     const data = await temp.json()
    //     setGetAnime(data)
        
    //     navigate(`/Anime/page=${next}`)
    //     ref.current?.scrollIntoView({behavior: 'smooth'});
    // }
    useEffect(() => {
        getDiscovery()

    }, []);

  return (
    <>
        {genreList && <GenresList genreList = {handleGenres}/> }
        <div className="container-100 mx-3 my-3" ref = {ref}>
            <div className='flex justify-between px-3'>
                <input className="w-1/2 border-b border-emerald-400 focus:outline-none md:w-1/4" placeholder='Search for movie...'/>
                <button className = "border border-emerald-400 text-emerald-400 px-4 rounded-sm" onClick={handleGenres}> Genres </button>
            </div>
            <div className='grid grid-cols-2 place-content-center gap-4 md:grid-cols-4 lg:grid-cols-6'>
                {getMovies? 

                    getMovies.results.map(data => (
                        
                            <div className = "w-full h-full py-10 cursor-pointer hover:text-emerald-400 hover:drop-shadow-lg" onClick = {navigateToMovie(data.id)}>
                                <img src = {`https://image.tmdb.org/t/p/original${data.poster_path}`} className = "rounded-md" />
                                <p className = "text-left font-bold py-2">{data.original_title}</p>
                            </div>   
                        
                    ))
                :
                    <div className = "h-screen flex justify-center items-center">
                            <CircularProgress />
                    </div>
                }
                
            </div>       
        </div>

        {/* <div className='border-t my-20 py-10 flex justify-center'>
            <div className='flex justify-center items-center px-3'> 
                <ChevronLeftIcon className='h-8 w-8 py-1 px-1 cursor-pointer rounded-full hover:bg-emerald-400 hover:text-white'/> 
                <span className='px-2'> Prev </span> 
            </div> 
            <span className='bg-slate-300 w-10 h-10 justify-center flex items-center rounded-full'>{params.id == undefined? '1':params.id } </span>
            <div className='flex justify-center items-center px-3'>
                <span className='px-2'> Next </span> 
                <ChevronRightIcon onClick = {handleNextPage} className='h-8 w-8 py-1 px-1 cursor-pointer rounded-full hover:bg-emerald-400 hover:text-white'/>
            </div>
        </div> */}
        
    </>
  )
}

export default Genre