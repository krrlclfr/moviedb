import React, { useEffect, useState } from 'react'
import {LINK, API_KEY} from '../URL/Settings';
import { CircularProgress } from '@mui/material';
import Footer from '../Footer';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";


import { Pagination, Navigation, Autoplay} from "swiper";
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Login() {

    const [getMovies, setGetMovies] = useState()
    const [user, setUser] = useState({
        username:'',
        password: ''

    })
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)

    const GetMovies = async() => {
        const temp = await fetch(LINK + '/trending/all/day?api_key=' + API_KEY)
        const data = await temp.json()

        setGetMovies(data.results.slice(0, 5))

    }

    const handleSignUp = () => {
        window.location.href = ('/Signup')
    }

    const handleOnChange = (e) => {
        
        setUser(prev => ({...prev, [e.target.name]:e.target.value}))
    }

    const submit = async(e) => {
        e.preventDefault()
        setLoading(true)
        validateLogin()
    }


    const validateLogin = async() => {
        const rqstToken = await fetch(LINK + '/authentication/token/new?api_key=' + API_KEY)
        const token = await rqstToken.json()

        const forms = {
            'username': user.username,
            'password': user.password,
            'request_token': token.request_token
        }

        const requestData = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(forms)
            
        }

        const temp = await fetch(LINK + '/authentication/token/validate_with_login?api_key=' + API_KEY , requestData)
        const data = await temp.json()

        setTimeout(async() => {

            if(user.username == ''){
                setErr('Please type username')
            }
            else if(user.password == ''){
                setErr('Please type password')
            }
            else{
    
                if(data.success == true){
                   

                        const temp = await fetch(LINK + '/authentication/session/new?api_key=' + API_KEY, requestData)
                        const data = await temp.json()
                        
                        console.log(data)
                        window.location.href = ("/")
                        localStorage.setItem('session_id', JSON.stringify(data))
                }
                else{
                    setErr("Invalid username or password")
                    
                }
            }
            setLoading(false)
        }, 400)
    }

    useEffect(() => {
        GetMovies()

    }, []);
  return (
    <>
    
    <div className="container-100 h-full bg-black">

        <div className = "flex items-center justify-center h-full w-full pt-28">
            <div className='grid grid-cols-1 w-11/12 md:w-3/4 md:grid-cols-2 lg:w-1/2'>
                <form onSubmit={submit} className='py-10 px-3 text-white border bg-white border-slate-700 md:border-l md:border-t md:border-b'>
                    <div className='grid'>
                        <div className='mx-2 my-3'>
                            <h1 className='font-bold text-xl text-slate-800'> Welcome back </h1>
                            <p className='text-xs text-slate-600'> Welcome back! Please enter your details.</p>
                        </div>

                        <div className='mx-2 my-2'>
                            <button className='border border-slate-800 rounded-md w-full text-sm flex justify-center items-center text-slate-700'><img src = "./logo/google.png" className='h-5 w-5 mx-2 ' /> Login with Google </button>
                        </div>

                        <div className='mx-2 my-2 flex justify-center items-center'>
                            <hr className='w-full text-slate-900'/>
                            <span className='text-xs px-2 pb-1 text-slate-800'> or </span>
                            <hr className='w-full text-slate-900'/>
                            
                        </div>

                        <div className='mx-2 my-2'>
                            <input type = "text" className='w-full text-sm bg-white border rounded-md text-slate-800 border-slate-800 px-2 py-2 focus:outline-none focus:border-rose-800' placeholder='Username' name = "username" onChange={handleOnChange}/>
                        </div>

                        <div className='mx-2 my-2'>
                            <input type = "password"className='w-full text-sm bg-white border rounded-md text-slate-800 border-slate-800 px-2 py-2 focus:outline-none focus:border-rose-800' placeholder='Password' name = "password" onChange={handleOnChange}/>
                        </div>

                        <div className='mx-2 my-2 flex justify-between text-slate-700'>
                            <div className='flex items-center'>
                                <input type = "checkbox"/>
                                <p className='text-sm '> Remember Me </p>
                            </div> 
                            <p className='underline text-sm'> Forget Password? </p>
                        </div>

                        <div className='mx-2 my-2  h-10'>
                            {loading? 
                                <div className='flex justify-center items-center h-full'>
                                    <CircularProgress size='2rem' />
                                </div>
                                :
                                <button type = "submit" className='bg-rose-600 hover:bg-rose-900 rounded-md w-full font-bold'> Login </button>
                            }
                        </div>

                        <div className='mx-2 my-2 text-center h-5'>
                            <span className=' w-full text-rose-900 text-xs '> {err} </span>
                        </div>


                        <div className='mx-2 my-1 text-center'>
                            <p className='text-xs text-slate-700'> Don't have an account? <span className='font-bold cursor-pointer' onClick={handleSignUp}>Sign up for free </span>  </p>
                        </div>


                    </div>
                </form>
                <div className = "hidden md:flex bg-white ">
                    <div className='h-full grid grid-cols-1 place-items-center relative'>
                    
            
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
                        className="mySwiper"
                    >
                        {
                        getMovies? getMovies.map(data => (
                            <SwiperSlide className='bg-slate-900/30'>
                                
                                <img src = {`https://image.tmdb.org/t/p/original/${data.poster_path}`} className = "h-full w-full object-cover mix-blend-overlay"/>
                            </SwiperSlide>
                        ))
                        :
                        ""
                    }

                    </Swiper>

                    {/* <div className='grid grid-cols-1 place-items-center text-white px-5  absolute bottom-28 z-50 h-10 w-full'>

                      <img src = "./logo/cher-logo.png" className='h-10 py-1'/>
                        <p className='text-sm text-center'> Watch your favorite movies or series on only one platform. You can watch it anytimes and anywhere.</p>
                     
                    </div>   */}

                    </div>
                </div>
                
            </div>

        </div>
        <Footer />
    </div>
    </>
  )
}

export default Login