import React, { useEffect, useState } from "react";
import mainbg from "../Images/BG1.jpg";
import { CiSearch } from "react-icons/ci";
import { WiCloud } from "react-icons/wi";

const Home = () => {
  const api = {
    key: "59f86479b48512df06192c8043bba80e",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(weather);
      });
  };
  useEffect(() => {
    setSearch("New Delhi");
    setTimeout(() => searchPressed(), 0); // Ensure searchPressed runs after state update
  }, []);

    const sunriseTimestamp = weather?.sys?.sunrise;
    const sunsetTimestamp = weather?.sys?.sunset;
    const convertToTime = (timestamp) => {
      const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  return (
    <div className="relative h-[100vh] w-[100%]">
      <img
        src={mainbg}
        alt=""
        className="h-[100vh] w-[100%] blur-[0px] object-cover object-center"
      />
      <div className=" flex absolute top-[2%] left-[25%]">
        <input
          type="text"
          placeholder="Search City"
          className="p-[10px] w-[700px] rounded-[15px] pl-[30px] text-black text-xl font-semibold placeholder:text-black placeholder:text-lg  shadow-lg   "
          onChange={(e) => setSearch(e.target.value)}
        />
        <CiSearch
          className="text-black ml-[10px] font-bold text-5xl p-[5px] bg-white rounded-[15px] shadow-lg"
          onClick={searchPressed}
        />
      </div>
      <div className="absolute top-[13%] left-[7%] rounded-lg w-[40%] h-[350px] flex flex-col justify-between shadow-2xl bg-transparent/5">
        <div className="ml-[10px]">
          <h1 className="text-5xl text-white font-semibold font-sans">
            {weather.name}
            <span className="text-3xl">,{weather?.sys?.country}</span>
          </h1>
          <p className="text-2xl text-white font-semibold mt-[18px]">
            Wednesday 1 November
          </p>
        </div>
        <div className="flex items-center justify-end">
          <WiCloud className="text-white text-[170px] " />
          <div className="text-white font-semibold">
            <p className="text-5xl">
              5 o
            </p>

            {/* <p className="text-2xl">{weather.weather.id}</p> */}
          </div>
        </div>
      </div>
      <div className="shadow-2xl h-[300px] w-[45%] absolute right-[20px] bg-transparent/5 top-[21%] rounded-lg flex flex-col">
      <div>
      <p>{weather?.main?.temp}</p>
     <p>Wind<span className="">{weather?.wind?.speed}
      </span> </p> 
      <p>{weather?.main?.sea_level}</p>
      <p>{convertToTime(sunriseTimestamp)}</p>
      <p>{convertToTime(sunsetTimestamp)}</p>
      </div>
      <div>
        
      </div>
      </div>
      <div className="flex flex-col absolute top-[64%] left-[7%] gap-[10px]">
        <h1 className="text-white text-3xl">ForeCast</h1>
        <div className="flex gap-[10px]">
          {
            <div className="text-black bg-slate-200/25 h-[200px] w-[200px] rounded-lg"></div>
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
