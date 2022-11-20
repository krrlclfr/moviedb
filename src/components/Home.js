import React, { useEffect, useState, useCallback, useRef, Suspense} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import {LINK, API_KEY} from './URL/Settings';
import Footer from './Footer';
const GenresList = React.lazy(() => import("./GenresList/GenresList.js"))
const Trending = React.lazy(() => import("./Trending/Trending.js"))
const SearchInput = React.lazy(() => import("./Search/SearchInput.js"))
const NowPlaying = React.lazy(() => import("./Home/NowPlaying.js"))
const PopularMovies = React.lazy(() => import("./Home/PopularMovies.js"))
const TopMovies = React.lazy(() => import("./Home/TopMovies.js"))
const UpComing = React.lazy(() => import("./Home/UpComing.js"))
const People = React.lazy(() => import("./Home/People.js"))
function Home() {
    const params = useParams()
    const navigate = useNavigate()

    const [genreList, setGenreList] = useState(false)
    const [next, setNext] = useState(2)


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
    



    const handleGenreMovie = useCallback(
        (id) => () => {
            navigate(`/genre/${id}`)
        }
    )

    const handleGenres = () =>{
        setGenreList(!genreList)

    }
    const navigateToMovie = useCallback(
        (movieId) => () => {
            console.log(movieId)
            navigate(`/movie/${movieId}`)
        }
    )

    const handleNextPage = async() => {
        setNext(current => current + 1)
        console.log(next)
        const temp = await fetch(LINK + '/discover/movie?api_key=' + API_KEY + '&page=' + next)
        const data = await temp.json()
        
        // navigate(`/Anime/page=${next}`)
        ref.current?.scrollIntoView({behavior: 'smooth'});
    }




    useEffect(() => {
        GetListGenre()


    }, []);

  return (
    <>
        {genreList && <GenresList genreList = {handleGenres}/> }
        <div className="container-100  bg-black text-white" ref = {ref}>
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

                <div className='col-span-3 h-screen w-full overflow-y-auto  mt-8'>
                    <div className='mx-2'>
                        <Suspense fallback={
                            <div className='h-screen grid grid-cols-1 place-items-center'>
                                <CircularProgress />
                            </div>
                        }>  
                            <NowPlaying />
                    
                            <PopularMovies />

                            <TopMovies />

                            <UpComing />

                            <People />
                        </Suspense>
                    </div>
                    <Footer />   
                </div>
                

            </div>
                 
        </div>


        
    </>
  )
}

export default Home