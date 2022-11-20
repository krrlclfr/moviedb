import React, {useState, useEffect, useCallback} from 'react'
import {LINK, API_KEY, IMAGE} from '../URL/Settings'
import StarIcon from '@mui/icons-material/Star';
function Reviews({id}) {
    const [reviews, setReviews] = useState('')
    const [showText, setShowText] = useState(true)
    const avatarPlaceHolder = process.env.PUBLIC_URL + '/user/user.png'
    const getMovieReviews = async() => {
        const temp = await fetch(LINK + '/movie/'+ id + '/reviews?api_key=' + API_KEY)
        const data = await temp.json()
        console.log("Reviews: ", data)
        setReviews(data)
    }

    const handleShowtext = useCallback(
        (id) => () => {
            setShowText(prev => !prev)
        }
    )
    
    useEffect(() => {
        getMovieReviews()
    }, [])
  return (
    <div className='container-full'>
        <h1 className='font-bold text-md px-2'> Reviews </h1>
        <div className='w-full my-3 px-2'>
            {reviews == null? reviews.results.map(data => (
                <>
                    
                    <div className="antialiased mx-auto max-w-screen-sm py-3">
                        <div className="space-y-4">
                            <div className="flex">
                                <div className="flex-shrink-0 mr-3">
                                    <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={data.author_details.avatar_path?  IMAGE + data.author_details.avatar_path : avatarPlaceHolder} alt="" />
                                </div>
                                <div className="flex-1 border rounded-lg px-4 sm:px-2 sm:py-2 leading-relaxed">
                                    <strong>{data.author_details.username}</strong> <span className="text-xs text-gray-400">{new Date(data.created_at).toLocaleString("lookup").slice(11,24)}</span>
                                    <p className="text-xs">
                                        {data.content}
                                    </p>
                                    <div className="mt-4 flex items-center">
                                    <div className="flex -space-x-2 mr-2">
                                        <StarIcon className='h-6 w-6 mx-2'/>
                                    </div>
                                    <div className="text-sm text-gray-500 font-semibold">
                                        {data.author_details.rating}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )): <div className='mx-2'> No Reviews </div>
        } 


          
        </div>
    </div>
  )
}

export default Reviews