import React, { useEffect, useState, useCallback, useRef, Suspense} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import {ChevronRightIcon, ChevronLeftIcon, MagnifyingGlassIcon} from '@heroicons/react/24/outline'
import {LINK, API_KEY} from '../URL/Settings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Footer from '../Footer';

const GenresList = React.lazy(() => import("../GenresList/GenresList.js"))
const Trending = React.lazy(() => import("../Trending/Trending.js"))
const SearchInput = React.lazy(() => import("../Search/SearchInput.js"))

function Genres() {
    const params = useParams()
    const navigate = useNavigate()
    const [getMovies, setGetMovies] = useState()
    const [genreList, setGenreList] = useState(false)
    const [page, setPage] = useState(1)
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
        const temp = await fetch(LINK + '/discover/movie?api_key=' + API_KEY + "&with_genres=" + params.id + "&page=" + params.page)
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
           
             window.location.href = (`/genre/${params.id}/page=${parseInt(next + 1)}`)
        }
    )

    const handlePrevPage = useCallback(
        (prev) => async() => {
           
             window.location.href = (`/genre/${params.id}/page=${parseInt(prev - 1)}`)
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

                <div className='col-span-3 h-screen overflow-y-auto w-full mt-8'>
                    <div className='mx-2'>
                        

                        {getMovies? 
                            <> 
                                <div className='flex justify-between items-center'>
                                    <h1 className='font-bold py-5'> {params.name} </h1> 
                                </div>
                                <div className='grid grid-cols-2 place-content-center gap-3 md:grid-cols-3 lg:grid-cols-5'>
                                    {getMovies.map(data => (
                                        
                                            <div className = "w-full h-full relative py-3 cursor-pointer " onClick = {navigateToMovie(data.id)}>
                                               <LazyLoadImage 
                                                    alt = {data.original_title}
                                                    src = {`https://image.tmdb.org/t/p/original${data.poster_path}`}
                                                    key = {data.id}
                                                    effect = "blur"
                                                    className = "rounded-lg"
                                                />
                                                <LazyLoadComponent>


                                                    <div className = "backdrop-blur-md flex absolute bottom-3 hover:bg-slate-50/20 bg-slate-50/30 w-full justify-between items-center rounded-lg py-2 px-2">
                                                        <div className = "flex items-center">
                                                            <span className='px-2'> <PlayArrowIcon className='bg-slate-50/50 text-white h-5 w-5 px-1 py-1 rounded-full'/> </span> 
                                                            <p className='font-bold text-xs lg:text-[10px]'> {data.original_name} {data.original_title} </p>
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
                                    <div className='h-6 w-36 bg-zinc-800 rounded-full my-6'> </div>
                                </div>
                    

                                <div className='grid grid-cols-2 place-content-center gap-3 md:grid-cols-3 lg:grid-cols-5'>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>
                                    <div className='h-72 bg-zinc-800 rounded-md my-3'> </div>

                                </div> 

                            </>
                        }

                        <div className='border-t my-20 py-10 flex justify-center'>
                            <div className='flex justify-center items-center px-3'> 
                                <ChevronLeftIcon onClick = {handlePrevPage(page)} className='h-8 w-8 py-1 px-1 cursor-pointer rounded-full hover:bg-amber-800 hover:text-white'/> 
                                <span className='px-2'> Prev </span> 
                            </div> 
                            <span className='border w-10 h-10 justify-center flex items-center rounded-full'>{page? page : null } </span>
                            <div className='flex justify-center items-center px-3'>
                                <span className='px-2'> Next </span> 
                                <ChevronRightIcon onClick = {handleNextPage(page)} className='h-8 w-8 py-1 px-1 cursor-pointer rounded-full hover:bg-amber-800 hover:text-white'/>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
         
            </div>
                 
        </div>

        
    </>
  )
}

export default Genres