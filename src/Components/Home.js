import React from 'react'
import mainbg from '../Images/BG1.jpg'
import { CiSearch } from "react-icons/ci";
import Weather from './Weather';
const Home = () => {
  return (
    <div className='relative h-[100vh] w-[100%]'>
        <img src={mainbg} alt='' className='h-[100vh] w-[100%] blur-[0px] object-cover object-center'/>
        <div className=' flex absolute top-[10%] left-[30%]'>
        <input type='text' placeholder='Search City' className='p-[10px]  w-[700px] rounded-[15px] pl-[30px] text-black text-xl font-semibold placeholder:text-black placeholder:text-lg  '/>
        <CiSearch  className='text-black ml-[10px] font-bold text-5xl p-[5px] bg-white rounded-[15px]' />
        </div>
        <div className='absolute top-[25%] bg-red-500 rounded-lg '>
        <Weather/>
        
        </div>
        
    </div>
  )
}

export default Home