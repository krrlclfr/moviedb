import React, { useEffect, useState, useCallback, useRef, Suspense} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import {ChevronRightIcon, ChevronLeftIcon, MagnifyingGlassIcon} from '@heroicons/react/24/outline'
import {LINK, API_KEY} from '../URL/Settings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
const GenresList = React.lazy(() => import("../GenresList/GenresList.js"))
const Trending = React.lazy(() => import("../Trending/Trending.js"))
const SearchInput = React.lazy(() => import("../Search/SearchInput.js"))

function PeoplePopular() {
    const params = useParams()
    const navigate = useNavigate()
    const [getMovies, setGetMovies] = useState()
    const [genreList, setGenreList] = useState(false)
    const [page, setPage] = useState()
    const ref = useRef(null)

    const [getListGenre, setGetListGenre] = useState()

    const GetListGenre = async() => {
        const temp = await fetch(LINK + '/genre/movie/list?api_key=' + API_KEY)
        const data = await temp.json()

        setGetListGenre(data)
    }

    const handleGenre = useCallback(
        (id) => () => {
            // const temp = await fetch(LINK + '/discover/movie?api_key=' + API_KEY + '&with_genres=' + id)
            // const data = await temp.json()
            window.location.href = `/movie/genre/${id}`
        }
    )
    
    const GetMovies = async() => {
        const temp = await fetch(LINK + '/person/popular?api_key=' + API_KEY)
        const data = await temp.json()
        console.log(data)
        setGetMovies(data.results)
        setPage(data.page)
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

    const handleNextPage = useCallback(
        (next) => async() => {
            navigate(`/movies/${params.id}/page=${next}`)
        }
    )


    const navigateToPopular = useCallback(
        () => () => {
            console.log("Popular")
        }
    )

    useEffect(() => {
        GetMovies()
        GetListGenre()
        

    }, []);

  return (
    <>
        {genreList && <GenresList genreList = {handleGenres}/> }
        <div className="container-100  bg-black text-white" ref = {ref}>
            {/* <div className='flex justify-between px-3'>
                <input className="w-1/2 border-b border-emerald-400 focus:outline-none md:w-1/4" placeholder='Search for movie...'/>
                <button className = "border border-emerald-400 text-emerald-400 px-4 rounded-sm" onClick={handleGenres}> Genres </button>
            </div> */}
            <div className = "flex flex-col-reverse grid grid-cols-1 gap-1 md:grid-cols-4 pt-16">
                
                <div className='hidden md:grid border-r border-slate-800 h-screen overflow-y-auto my-8'>
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
             

                <div className='col-span-3 h-screen overflow-y-auto w-full my-8'>
                    <div className='mx-2'>
                        

                        {getMovies? 
                        <>
                            <div className='flex justify-between items-center'>
                                <h1 className='font-bold py-5'> People </h1> 
                            </div>
                        
                            <div className='grid grid-cols-2 place-content-center gap-3 md:grid-cols-4 lg:grid-cols-5'>
                                {getMovies.map(data => (
                                    
                                        <div className = "w-full h-full relative py-3 cursor-pointer" onClick = {navigateToMovie(data.id)}>
                                            <img src = {`https://image.tmdb.org/t/p/original${data.profile_path}`} className = "rounded-lg" />
                                            <div className = "backdrop-blur-md flex absolute bottom-3 hover:bg-slate-900/50 bg-slate-700/50 w-full justify-between items-center rounded-lg py-2 px-2">
                                                <div className = "flex items-center">
                                                    
                                                    <p className='font-bold text-xs lg:text-md '> {data.name} </p>
                                                </div>
                                                <div className='flex items-center  h-14'>
                                                    <span> <StarIcon className='border-l mb-1 text-white' fontSize = {'sm'}/></span>
                                                    <p className='font-bold text-xs lg:text-[10px]'> {data.popularity.toFixed(1)}</p>
                                                </div>
                                            </div>
                                            {/* <p className = "text-left font-bold py-2">{data.original_title}</p> */}
                                        </div>   
                                    
                                ))}
                            </div>  
                        </>
                        :
                            <>
                                <div className='flex justify-between items-center'>
                                    <div className='h-6 w-36 bg-zinc-800 rounded-full my-6'> </div>
                                </div>
                    

                                <div className='grid grid-cols-2 place-content-center gap-3 md:grid-cols-4 lg:grid-cols-5'>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-56 bg-zinc-800 rounded-md my-3'> </div>

                                </div> 

                            </>
                        }

                    

                        <div className='border-t my-20 py-10 flex justify-center'>
                            <div className='flex justify-center items-center px-3'> 
                                <ChevronLeftIcon className='h-8 w-8 py-1 px-1 cursor-pointer rounded-full hover:bg-amber-800 hover:text-white'/> 
                                <span className='px-2'> Prev </span> 
                            </div> 
                            <span className='border w-10 h-10 justify-center flex items-center rounded-full'>{page? page : null } </span>
                            <div className='flex justify-center items-center px-3'>
                                <span className='px-2'> Next </span> 
                                <ChevronRightIcon onClick = {handleNextPage(page)} className='h-8 w-8 py-1 px-1 cursor-pointer rounded-full hover:bg-amber-800 hover:text-white'/>
                            </div>
                        </div>
                    </div>
                </div>
         
            </div>
                 
        </div>


        
    </>
  )
}

export default PeoplePopular