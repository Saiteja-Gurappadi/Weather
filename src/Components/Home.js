import React from 'react'
import mainbg from '../Images/BG1.jpg'
import { CiSearch } from "react-icons/ci";
import { WiCloud } from "react-icons/wi";

const Home = () => {
  return (
    <div className='relative h-[100vh] w-[100%]'>
        <img src={mainbg} alt='' className='h-[100vh] w-[100%] blur-[0px] object-cover object-center'/>
        <div className=' flex absolute top-[4%] left-[25%]'>
        <input type='text' placeholder='Search City' className='p-[10px]  w-[700px] rounded-[15px] pl-[30px] text-black text-xl font-semibold placeholder:text-black placeholder:text-lg  shadow-lg  '/>
        <CiSearch  className='text-black ml-[10px] font-bold text-5xl p-[5px] bg-white rounded-[15px] shadow-lg' />
        </div>
        <div className='absolute top-[15%] left-[7%] rounded-lg w-[40%] h-[450px] flex flex-col justify-evenly shadow-2xl'>
          <div className='ml-[10px]'>
            <h1 className='text-6xl text-white font-semibold font-sans'> Namste India</h1>
            <p className='text-2xl text-white font-semibold mt-[18px]'>Wednesday 1 November</p>
        </div>
        <div className='flex items-center ml-[350px]'>
        <WiCloud  className='text-white text-[200px] '/>
          <div className='text-white font-semibold'>
          <p className='text-7xl'>5 <span>o</span></p>
          <p className='text-2xl'>OverCast Clouds</p>
          </div>
        </div>
        </div>
        <div className='shadow-2xl h-[300px] w-[45%] absolute right-[20px] top-[30%] rounded-lg'>

        </div>
        <div className='flex flex-col absolute top-[70%] left-[7%] gap-[10px]'>
          <h1 className='text-white text-3xl'>ForeCast</h1>
          <div className='flex'>
          {
            <div className='text-black bg-zinc-200 h-[200px] w-[200px]'> 
              </div>
          }
          </div>
        </div>
    </div>
  )
}

export default Home