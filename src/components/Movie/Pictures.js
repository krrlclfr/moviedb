import React, {useState, useEffect} from 'react'
import {LINK, API_KEY, IMAGE} from '../URL/Settings'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination } from "swiper";

function Pictures({id}) {
    const [movieImage, setMovieImage] = useState('')
    const getMovieImage = async() => {
        const temp = await fetch(LINK + '/movie/'+ id + '/images?api_key=' + API_KEY)
        const data = await temp.json()
        setMovieImage(data)
    }
    
    useEffect(() => {
        getMovieImage()
    }, [])
  return (
    <div className='container-full'>
        <h1 className='font-bold text-md px-2'> Backdrops </h1>
        <div className='w-full flex overflow-x-auto my-3'>
            <Swiper
                pagination={{
                dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {movieImage? movieImage.backdrops.map(data => (
                    <>   
                      <SwiperSlide> <img src = {IMAGE + data.file_path} className = "h-full w-full"/> </SwiperSlide>
                    </>
                )):null}
            </Swiper>
        </div>
    </div>
  )
}

export default Pictures