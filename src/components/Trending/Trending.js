import React, { useEffect, useState, useCallback} from 'react'
import { LINK, API_KEY } from '../URL/Settings';
import { useNavigate } from 'react-router-dom'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
function Trending() {
    const navigate = useNavigate()
    const [trending, setTrending] = useState()

    const GetTrending = async() => {
        const temp = await fetch(LINK + '/trending/all/day?api_key=' + API_KEY)
        const data = await temp.json()
        console.log("Trending: ", data)
        setTrending(data)
    }
    const navigateToMovie = useCallback(
        (movieId) => () => {
            console.log(movieId)
            navigate(`/movie/${movieId}`)
        }
    )

    useEffect(() => {
        GetTrending()
        
    }, [])
  return (
    <div className='grid grid-cols-1 mx-2 lg:grid-cols-1'>
        
        {trending? 
            
            // trending.results[0].id
            <>
                <h1 className='font-bold'> Trending </h1>
                <div className = "w-full h-full relative py-3 cursor-pointer " onClick = {navigateToMovie(trending.results[1].id)}>
                
                    <LazyLoadImage 
                        alt = {trending.results[1].original_title}
                        src = {`https://image.tmdb.org/t/p/original${trending.results[1].backdrop_path}`}
                        key = {trending.results[1].id}
                        effect = "blur"
                        className = "rounded-lg"
                    />
                    <LazyLoadComponent>
                        <div className = "backdrop-blur-md flex absolute bottom-3 hover:bg-slate-50/20 bg-slate-900/50 w-full justify-between items-center rounded-lg  px-2">
                            <div className = "flex items-center">
                                <span className='px-2'> <PlayArrowIcon className='bg-slate-50/50 text-white h-5 w-5 px-1 py-1 rounded-full'/> </span> 
                                <p className='font-bold text-[8px] lg:text-[10px]'> {trending.results[1].original_title} {trending.results[1].original_name}</p>
                            </div>
                            <div className='flex items-center  h-14'>
                                <span> <StarIcon className='border-l mb-1 text-white' fontSize = {'sm'}/></span>
                                <p className='font-bold text-[8px] lg:text-[10px]'> {trending.results[1].vote_average.toFixed(2)}</p>
                            </div>
                        </div>
                    </LazyLoadComponent>

                </div> 

                <div className = "w-full h-full relative py-3 cursor-pointer " onClick = {navigateToMovie(trending.results[2].id)}>
                    <LazyLoadImage 
                        alt = {trending.results[2].original_title}
                        src = {`https://image.tmdb.org/t/p/original${trending.results[2].backdrop_path}`}
                        key = {trending.results[2].id}
                        effect = "blur"
                        className = "rounded-lg"
                    />
                    <LazyLoadComponent>
                        <div className = "backdrop-blur-md flex absolute bottom-3 hover:bg-slate-50/20 bg-slate-900/50 w-full justify-between items-center rounded-lg px-2">
                            <div className = "flex items-center">
                                <span className='px-2'> <PlayArrowIcon className='bg-slate-50/50 text-white h-5 w-5 px-1 py-1 rounded-full'/> </span> 
                                <p className='font-bold text-[8px] lg:text-[10px]'> {trending.results[2].original_title} {trending.results[2].original_name} </p>
                            </div>
                            <div className='flex items-center  h-14'>
                                <span> <StarIcon className='border-l mb-1 text-white' fontSize = {'sm'}/></span>
                                <p className='font-bold text-[8px] lg:text-[10px]'> {trending.results[2].vote_average.toFixed(2)}</p>
                            </div>
                        </div>
                    </LazyLoadComponent>
                   
                </div> 

            </>
        :

            <div className='grid grid-cols-1'>
                <div className='h-5 bg-zinc-800 rounded-full my-2'> </div>
                <div className='h-24 bg-zinc-800 rounded-md my-3 lg:h-36'> </div>
                <div className='h-24 bg-zinc-800 rounded-md my-3 lg:h-36'> </div>

            </div>

        }
    </div>
  )
}

export default Trending