import React from 'react'

const Navbar = () => {
  return (
    <nav className='absolute top-0 left-0 right-0 px-8 py-4 flex justify-between items-center border-b-2'>
        <a href="/"><img src="/Logo.svg" alt="#" width={"70px"} /></a>
        <ul className='navlist text-white flex justify-evenly gap-12'>
            <li><a href="/">Home</a></li>
            <li><a href="/">About Us</a></li>
        </ul>
    </nav>
  )
}

export default Navbar