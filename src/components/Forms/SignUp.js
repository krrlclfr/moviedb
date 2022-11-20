import React, { useEffect, useState } from 'react'
import {LINK, API_KEY} from '../URL/Settings';

import Footer from '../Footer';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";


import { Pagination, Navigation, Autoplay} from "swiper";
function SignUp() {

    const [getMovies, setGetMovies] = useState()
    const [err, setErr] = useState('')
    const GetMovies = async() => {
        const temp = await fetch(LINK + '/trending/all/day?api_key=' + API_KEY)
        const data = await temp.json()
        console.log(data)
        setGetMovies(data.results.slice(0, 5))

    }

    const handleLogin = () => {
        window.location.href = ('/login')
    }

    useEffect(() => {
        GetMovies()

    }, []);
  return (
    <>
    
    <div className="container-100 h-full bg-black">

        <div className = "flex items-center justify-center h-full w-full pt-28">
            <div className='grid grid-cols-1 w-11/12 md:w-3/4 md:grid-cols-2 lg:w-1/2'>
                <form className='py-10 px-3 bg-white border border-slate-700 md:border-l md:border-t md:border-b'>
                    <div className='grid'>
                        <div className='mx-2 my-3'>
                            <h1 className='font-bold text-xl text-slate-800'> Create your account </h1>
                            <p className='text-xs text-slate-400'> Enter the fields below to get started.</p>
                        </div>

                        <div className='mx-2 my-2'>
                            <button className='border border-rose-800 rounded-md w-full text-sm flex justify-center items-center'><img src = "./logo/google.png" className='h-5 w-5 mx-2' /> Sign in with Google </button>
                        </div>

                        <div className='mx-2 my-2 flex justify-center items-center'>
                            <hr className='w-full'/>
                            <span className='text-xs px-2 pb-1'> or </span>
                            <hr className='w-full'/>
                            
                        </div>

                        <div className='mx-2 my-2'>
                            <input  className='w-full text-sm bg-white bg-black border border-slate-800 px-2 py-2 rounded-md' placeholder='Enter username'/>
                        </div>

                        <div className='mx-2 my-2'>
                            <input  className='w-full text-sm bg-white bg-black border border-slate-800 px-2 py-2 rounded-md' placeholder='Enter email'/>
                        </div>

                        <div className='mx-2 my-2'>
                            <input className='w-full text-sm bg-white bg-black border border-slate-800 px-2 py-2 rounded-md' placeholder='Create a password'/>
                        </div>

                        {/* <div className='mx-2 my-2 flex justify-between'>
                            <div className='flex items-center'>
                                <input type = "checkbox"/>
                                <p className='text-sm'> Remember Me </p>
                            </div> 
                            <p className='underline text-sm'> Forget Password? </p>
                        </div> */}

                        <div className='mx-2 my-2'>
                            <button className='bg-rose-600 hover:bg-rose-900 text-white rounded-md w-full font-bold'> Create account </button>
                        </div>
                        
                        <div className='mx-2 my-2 text-center h-5'>
                            <span className=' w-full text-rose-900 text-xs '> {err} </span>
                        </div>


                        <div className='mx-2 my-1 text-center'>
                            <p className='text-xs'> Already have an account? <span className='font-bold cursor-pointer' onClick={handleLogin}> Login </span>  </p>
                        </div>


                    </div>
                </form>
                <div className = "hidden md:flex bg-white ">
                    <div className='h-full grid grid-cols-1 place-items-center '>
                                
                    <Swiper
                        spaceBetween={30}
                        pagination={{
                        clickable: true,
                        }}
                        
                        modules={[Pagination, Autoplay, Navigation]}
                        autoplay = {{
                            delay: 1000,
                            disableOnInteraction: false,
                           
                          }}
                        className="mySwiper bg-slate-800/20"
                    >
                        {
                        getMovies? getMovies.map(data => (
                            <SwiperSlide>
                                <img src = {`https://image.tmdb.org/t/p/original/${data.poster_path}`} className = "h-full w-full object-cover mix-blend-overlay"/>
                            </SwiperSlide>
                        ))
                        :
                        ""
                    }

                    </Swiper>

                    {/* <div className='grid grid-cols-1 place-items-center text-black bg-white blur-lg absolute bottom-0 z-50 h-10 w-full'>

                      <img src = "./logo/cher-logo.png" className='h-10 py-1'/>
                        <p className='text-sm text-center'> Watch your favorite movies or series on only one platform. You can watch it anytimes and anywhere.</p>
                     
                    </div>  */}

                        {/* <div>

                        </div>
                        <div className='grid grid-cols-1 place-items-center'>

                            <img src = "./logo/cher-logo.png" className='h-10 py-1'/>
                            <p className='text-sm text-center'> Watch your favorite movies or series on only one platform. You can watch it anytimes and anywhere.</p>
                        </div> */}
                    </div>
                </div>
                
            </div>

        </div>
        <Footer />
    </div>
    </>
  )
}

export default SignUp