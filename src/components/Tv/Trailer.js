import React, {useState, useEffect} from 'react'
import {LINK, API_KEY, IMAGE} from '../URL/Settings'
function Trailer({id}) {
    const [movieTrailer, setMovieTrailer] = useState('')
    const getMovieTrailer = async() => {
        const temp = await fetch(LINK + '/tv/'+ id + '/videos?api_key=' + API_KEY)
        const data = await temp.json()
        console.log("Trailer: ", data)
        setMovieTrailer(data)

    }
    
    useEffect(() => {
        getMovieTrailer()
    }, [])
  return (
    <div className='container-full'>
        <h1 className='font-bold text-md px-2 py-3'> Trailer </h1>
        <div className='w-full'>

            {/* {movieTrailer? movieTrailer.result.map(data => (
                <>
                    <img src = {IMAGE + data.file_path} className = "h-full w-full"/>
                </>
            )):null} */}
            
            {movieTrailer != null? 
            <iframe src = {`https://www.youtube.com/embed/${movieTrailer? movieTrailer.results.slice(-1)[0].key:null}`} className ="w-full h-96">

            </iframe> 

             : <div className = "mx-2"> No Trailer </div>}
          
            
        </div>
    </div>
  )
}

export default Trailer