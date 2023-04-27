import React from 'react'

const Progress = () => {
  return (
    <div className='mx-auto w-56'>
        <h1 htmlFor="progress" className='text-2xl text-center'>Converting</h1>
        <progress id='progress' className="mx-auto my-8 progress progress-secondary w-56 text-white bg-white"></progress>
    </div>
  )
}

export default Progress