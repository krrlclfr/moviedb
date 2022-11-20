import React, { useState, useCallback } from 'react'
import {ChevronRightIcon, ChevronLeftIcon, MagnifyingGlassIcon} from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'
function Pagination({page}) {
    const params = useParams()
    const handleNextPage = useCallback(
        (next) => async() => {
           
             window.location.href = (`/${params.name}/${params.id}/page=${parseInt(next + 1)}`)
        }
    )

    const handlePrevPage = useCallback(
        (prev) => async() => {
           
             window.location.href = (`/${params.name}/${params.id}/page=${parseInt(prev - 1)}`)
        }
    )
  return (
    <div className='border-t my-20 py-10 flex justify-center'>
        <div className='flex justify-center items-center px-3'> 
            <ChevronLeftIcon onClick = {handlePrevPage(page)} className='h-8 w-8 py-1 px-1 cursor-pointer rounded-full hover:bg-rose-800 hover:text-white'/> 
            <span className='px-2'> Prev </span> 
        </div> 
        <span className='border w-10 h-10 justify-center flex items-center rounded-full'>{page? page : null } </span>
        <div className='flex justify-center items-center px-3'>
            <span className='px-2'> Next </span> 
            <ChevronRightIcon onClick = {handleNextPage(page)} className='h-8 w-8 py-1 px-1 cursor-pointer rounded-full hover:bg-rose-800 hover:text-white'/>
        </div>
    </div>
  )
}

export default Pagination