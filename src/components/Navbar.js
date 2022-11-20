import React, { useCallback, useEffect, useState } from 'react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/solid'
import { LINK, API_KEY } from './URL/Settings'

function Navbar() {
    const user = localStorage.getItem('session_id')
    const [navbar, setNavbar] = useState(false)
    const [dropdown, setDropDown] = useState(false)
    const [userDropdown, setUserDropDown] = useState(false)
    const [currentPage] = useState(1)
    const [userData, setUserData] = useState()
    const [login, setLogin] = useState(false)
    const type = "tv" 
    const [links] = useState(
        {
            link: 
            [      
                {
                    name: "Top Rated",
                    title:"top_rated"
                },
                {
                    name: "Tv Popular",
                    title:"popular"
                },
                {

                    name: "Airing Today",
                    title:"airing_today"
                }
            ]
        }
    )

    const handleNavbar = () =>{
        setNavbar(!navbar)
    }

    const handleMouseEnter = () => {
        setDropDown(true)
    }
    const handleMouseLeave = () => {
        setDropDown(false)
    }

    const handleUserDropdown = () => {
        setUserDropDown(prev => !prev)
    }



    const handleLogin = () => {
        window.location.href = ('/login')
    }

    const handleSignup = () => {
        window.location.href = ('/signup')
    }

    const handleLogout = () => {
        setLogin(false)
        window.location.href = ('/login')
        localStorage.clear('session_id')
       
    }

    const accountDetails = async() => {

        const userSession = JSON.parse(user)
        if(userSession == null){
            setLogin(false)
        }
        else{
            const temp = await fetch(LINK + '/account?api_key=' + API_KEY + '&session_id=' + userSession.session_id)
            const data = await temp.json()
            console.log(user)
            setUserData(data)
            setLogin(true)
        }
        
        
        
    }

    useEffect(() => {
        accountDetails()

    }, [])

  return (
    <div className='container-100 bg-black text-white absolute z-50 w-full'>
        <nav className = "py-4 px-3 flex items-center justify-between mx-auto border-b border-slate-700 drop-shadow-md">
             <a href = "/"> <img src = {process.env.PUBLIC_URL + '/logo/cher-logo.png'} className = "w-10 md:w-20" /> </a>
            <div className = "hidden md:flex">
                <ul className= "flex">
                    <li className = "hover:text-rose-800 cursor-pointer">
                        <a href = "/"> Movies </a>
                    </li>
                    <li className = "hover:text-rose-800 cursor-pointer">
                         <a href = "/trending"> Trending  </a>
                    </li>
                    <li className = "cursor-pointer"  onMouseEnter={handleMouseEnter} onMouseLeave ={handleMouseLeave}>
                            TV 
                        {dropdown == true? 
                            <>
                                <div className='absolute top-16 left-0 right-8 mx-auto h-5 w-5 z-10' style = {{borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderBottom: '25px solid #F0F0F0'}}></div>
                                <ul className='bg-white w-[150px] top-20 left-0 right-0 mx-auto absolute z-50 rounded-sm'>
                                    
                                    {links && links.link.map(data => (
                                        <>
                                            <li className='text-black hover:text-rose-800'>
                                                <a href = {`/${type}/${data.title}/page=${currentPage}`}> {data.name} </a>
                                            </li>
                                        </>
                                    ))}
                                </ul>
                            </>

                            :
                            ""
                        }
                        
                    </li>
                    <li className = "hover:text-rose-800 cursor-pointer">
                        <a href = "/people/popular"> People </a>
                    </li>
                </ul>
            </div>
            <div className = "hidden md:flex">
                <ul className= "flex">
                     
                    {/* <div className={`${login == false? 'flex':'hidden'}`}>
                        <button className = "hover:text-rose-800 cursor-pointer mx-3 " onClick={handleLogin}> Login </button>
                        <button className = "border-rose-800 border rounded-full mx-3 px-5 hover:bg-rose-800" onClick={handleSignup}> Sign Up </button>
                    </div> */}


                        
                            {login == false? 
                                <div>
                                    <button className = "hover:text-rose-800 cursor-pointer mx-3 " onClick={handleLogin}> Login </button>
                                    <button className = "border-rose-800 border rounded-full mx-3 px-5 hover:bg-rose-800" onClick={handleSignup}> Sign Up </button>
                                </div>
                                :
                                <>
                                
                                    {userData? 
                                        <div className='relative mr-16'>
                                            <div className='flex cursor-pointer' onClick={handleUserDropdown}>
                                                <img src = {`https://secure.gravatar.com/avatar/${userData.avatar.gravatar.hash}.jpg?s=200`} className = "h-6 w-6 rounded-full"/>
                                                <span className='px-2'> {userData.username} </span>
                                            </div>
                                            {userDropdown == true?
                                                <div className = "h-full w-full">
                                                    <div className='absolute top-8 left-20 right-0 mx-auto h-5 w-5 z-10' style = {{borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderBottom: '25px solid #F0F0F0'}}></div>
                                                    <ul className='absolute top-12 left-0 right-0 bg-white  w-full rounded-md'>
                                                        <li className='text-slate-800'>
                                                            {userData.username}
                                                            <span className='text-xs text-slate-500'>  View Profile </span>
                                                        </li>
                
                                                        <li className='m-0 p-0 text-sm grid grid-cols-1 text-slate-800 border-t border-slate-400'>
                                                            <span className='my-1 py-1 px-3 hover:bg-slate-600 hover:text-slate-50 cursor-pointer'> Lists </span>
                                                            <span className='my-1 py-1 px-3 hover:bg-slate-600 hover:text-slate-50 cursor-pointer'> Ratings </span>
                                                            <span className='my-1 py-1 px-3 hover:bg-slate-600 hover:text-slate-50 cursor-pointer'> Watchlist </span>
                                                        </li>
                
                                                        <li className='m-0 p-0 text-sm grid grid-cols-1 text-slate-800 border-t border-slate-400'>
                                                            <span className = "my-1 py-1 px-3 hover:bg-slate-600 hover:text-slate-50 cursor-pointer"> Edit Profile </span>
                                                            <span className = "my-1 py-1 px-3 hover:bg-slate-600 hover:text-slate-50 cursor-pointer"> Settings </span>
                                                        </li>
                
                                                        <li className='m-0 p-0 text-sm grid grid-cols-1 text-slate-800 border-t border-slate-400'>
                                                            <span className = " my-3 w-full hover:bg-slate-600 hover:text-slate-50 px-3 py-1 cursor-pointer" onClick={handleLogout}> Logout </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                :
                                                ""
                                            }
                
                                        </div>
                                        :
                                        <div className='mr-16 flex justify-center items-center'>
                                            <div className='h-7 w-7 bg-zinc-800 rounded-full my-2 mx-2'> </div>
                                            <div className='h-7 w-24 bg-zinc-800 rounded-md my-3 lg:h-36'> </div> 
                                        </div>   
                                    }
                                </>
                                
                        
                            }
                 
                           
                    
                    
                </ul>
            </div>

            <div className = "flex cursor-pointer md:hidden" onClick={handleNavbar}>
                {navbar? < XMarkIcon className= "h-6 w-6"/>:<Bars3Icon  className= "h-6 w-6"/> }
            </div>
        </nav>
        {navbar && 
        <div className = {navbar == false? "flex":"md:hidden"}>
            <ul className= "block w-full px-3">
                <li className = "border-b border-gray-300 hover:text-emerald-800 cursor-pointer">
                    Discover
                </li>
                <li className = "border-b border-gray-300 hover:text-emerald-800 cursor-pointer">
                    Trending
                </li>
                <li className = "border-b border-gray-300 hover:text-emerald-800 cursor-pointer">
                    TV
                </li>
                <li className = "border-b border-gray-300 hover:text-emerald-800 cursor-pointer">
                    People
                </li>
                <div className = "border-b border-gray-300">
                    <button className = "border rounded-md border-emerald-600 w-full hover:text-emerald-600"> Login </button>
                    <button className = "rounded-md text-white bg-emerald-600 w-full hover:bg-emerald-800"> Sign Up </button>
                </div>
            </ul>
        </div>}
    </div>
  )
}

export default Navbar