import React from 'react';
import {
    MenuIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from '@heroicons/react/24/outline';

const Search = () => {
  return (
    <div className='hidden sm:flex rounded-md flex-grow bg-[#FEBD69] hover:bg-[#EFA335] cursor-pointer items-center h-10'>
        <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4'/>
        <MagnifyingGlassIcon className="h-12 p-4"/>
    </div>
  )
}

export default Search;