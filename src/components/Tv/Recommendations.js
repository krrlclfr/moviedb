import React, {useState, useEffect, useCallback} from 'react'
import {LINK, API_KEY, IMAGE} from '../URL/Settings'
import {useNavigate} from 'react-router-dom'

function Recommendations({id}) {
    const navigate = useNavigate()
    const [recommendations, setRecommendations] = useState('')
    const [mouseEnter, setMouseEnter] = useState(false)
    const placeholderImage = process.env.PUBLIC_URL + '/image/no_image_portrait.png'
    const getMovieRecommendations = async() => {
        const temp = await fetch(LINK + '/tv/'+ id + '/recommendations?api_key=' + API_KEY)
        const data = await temp.json()
        setRecommendations(data.results.slice(0, 12))

       
    }
    
    const handleMovie = useCallback(
        (id) => () => {
            

            window.location.href = `/movie/${id}`
            
        }
    )

    const handleMouseEnter = () => {
        setMouseEnter(true)
    }
    

    const handleMouseOver = () => {
        setMouseEnter(false)
    }
            


    useEffect(() => {

        getMovieRecommendations()
    }, [])
  return (
    <div className='container-full'>
        <h1 className='font-bold text-md px-2 py-3'> Recommendations </h1>
        <div className='w-full grid grid-cols-6 my-3 '>

            {recommendations? recommendations.map(data => (
                <div className = "mx-1 my-2">
                    <img src = {data.poster_path? IMAGE + data.poster_path : placeholderImage} className = "w-full rounded-md cursor-pointer" onMouseOut={handleMouseEnter} onMouseOver={handleMouseOver}  onClick={handleMovie(data.id)}/>
                  
                        <p className='text-[10px] font-bold'> {data.original_title} </p>
                 
                    {/* {mouseEnter && 
                        <div className = "absolute w-full h-full rounded-md mx-auto bottom-0 bg-slate-50" key = {data.id}>
                            <p className=''> gg </p>
                        </div>
                      
                    
                    } */}
                    
                </div>
            )):<h1> No Reccommendations </h1>}
        </div>
    </div>
  )
}

export default Recommendations