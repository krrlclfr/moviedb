import React, { useEffect, useState, useCallback, useRef, Suspense} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import {LINK, API_KEY} from '../URL/Settings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import Pagination from '../Pagination/Pagination';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Footer from '../Footer';
const GenresList = React.lazy(() => import("../GenresList/GenresList.js"))
const Trending = React.lazy(() => import("../Trending/Trending.js"))
const SearchInput = React.lazy(() => import("../Search/SearchInput.js"))

function Popular() {
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
        console.log(params)
        if(params.name == 'search') {
            const temp = await fetch(LINK + '/'+ params.name +'/movie?api_key=' + API_KEY + '&query=' + params.id + '&page=' + params.page)
            const data = await temp.json()
            setGetMovies(data.results)
            setPage(data.page)
        }
        else{
            const temp = await fetch(LINK + '/'+ params.name +'/'+ params.id +'?api_key=' + API_KEY + "&language=en-US&page=" + '&page=' + params.page)
            const data = await temp.json()
            console.log('Tv: ',data)
            setGetMovies(data.results)
            setPage(data.page)
        }
    }


    const handleGenres = () =>{
        setGenreList(!genreList)

    }
    const navigateToMovie = useCallback(
        (movieId) => () => {
            if(params.name == 'tv'){
                window.location.href = (`/tv/${movieId}`)
            }else{
                window.location.href(`/movie/${movieId}`)
            }
            
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
                                    <h1 className='font-bold py-5'> {params.id.charAt(0).toUpperCase() + params.id.slice(1).replace('_',' ')} </h1> 
                                </div>

                                <div className='grid grid-cols-2 place-content-center gap-3 md:grid-cols-3 lg:grid-cols-5'>
                                    {getMovies.map(data => {
                                        return(
                                            <div className = "w-full h-full relative py-3 cursor-pointer" onClick = {navigateToMovie(data.id)}>
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
                                                            <p className='font-bold text-xs md:text-[10px] lg:text-[10px]'> {data.original_title} {data.original_name} </p>
                                                        </div>
                                                        <div className='flex items-center  h-14'>
                                                            <span> <StarIcon className='border-l mb-1 text-white' fontSize = {'sm'}/></span>
                                                            <p className='font-bold text-xs lg:text-[10px]'> {data.vote_average}</p>
                                                        </div>
                                                    </div>
                                                </LazyLoadComponent>
                                         
                                            </div>   
                                        )
                                        
                                    })}
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

                        <Pagination page = {page}/>

                        
                    </div>
                    <Footer />
                </div>
         
            </div>
                 
        </div>


        
    </>
  )
}

export default Popular