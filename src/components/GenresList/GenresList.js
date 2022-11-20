import React, { useCallback, useEffect, useState } from 'react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {LINK, API_KEY} from '../URL/Settings'
import { useNavigate, useParams } from 'react-router-dom'
function GenresList(props) {
    const params = useParams()
    const navigate = useNavigate()
    const [getListGenre, setGetListGenre] = useState()
    const [currentPage] = useState(1)
    const GetListGenre = async() => {
        const temp = await fetch(LINK + '/genre/movie/list?api_key=' + API_KEY)
        const data = await temp.json()
        console.log(data)
        setGetListGenre(data)
    }
    
    const handleGenreMovie = useCallback(
        (id, name) => () => {
            window.location.href = (`/genre/${id}/name=${name}/page=${currentPage}`)
        }
    )

    const handleClose = () => {
        props.genreList(false)
    }
    const handleGenre = useCallback(
        (id) => () => {
            // const temp = await fetch(LINK + '/discover/movie?api_key=' + API_KEY + '&with_genres=' + id)
            // const data = await temp.json()
            window.location.href = `/movie/genre/${id}`
        }
    )
    useEffect(() => {
        GetListGenre()
    },[])
  return (

    <>
        {getListGenre? 
            <>
                <div className='grid grid-cols-1 mx-2'>
                    <h1 className='font-bold'>Genre's</h1>
                    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>

                        {getListGenre.genres.map(data => (
                            <span className='text-xs my-2 py-2 mx-1 text-center bg-black border border-slate-50  rounded-full hover:bg-white hover:text-black cursor-pointer' onClick={handleGenreMovie(data.id, data.name)}> {data.name} </span>
                        ))}
                    </div>
                </div>
            </>
            :
            <div className='grid grid-cols-1 mx-2'>
                <div className='h-5 bg-zinc-800 rounded-full my-3'> </div>
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>   
                    <div className='h-10 bg-zinc-800 rounded-full my-3 mx-1'> </div>             
                </div>
            </div>
        } 
    </>
        
    
  )
}

export default GenresList