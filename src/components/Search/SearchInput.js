import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

function SearchInput() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [skeleton, setSkeleton] = useState(false)
    const [currentPage] = useState(1)
    const type = "search"
    const handleSearch = (e) => {
        setSearch(e.target.value)
        
    }

    const handleKey = (e) => {
        if(e.key === 'Enter'){
            window.location.href = (`/${type}/${search}/page=${currentPage}`)
        }
    }

    useEffect(() => {
        setSkeleton(true)

        setTimeout(() => {
            setSkeleton(false)
        }, 300)
    },[])

  return (
    <>

        {skeleton == false? 
            <div className='flex justify-start items-center mx-2 my-3 py-3 border rounded-full'>
                <MagnifyingGlassIcon className='h-5 w-5 ml-2'/>
                <input className="w-full border-gray-600 px-1 bg-black focus:outline-none rounded-full" placeholder='Search for movie...' onChange = {handleSearch} onKeyDown = {handleKey}/>

            </div>
            :
            <div className='mx-2 my-2 h-14 py-3 flex items-center bg-zinc-800 rounded-full'> </div>
        }
    </>
      
  )
}

export default SearchInput