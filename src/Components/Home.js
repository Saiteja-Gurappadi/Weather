import React, { useEffect, useState } from "react";
import mainbg from "../Images/BG1.jpg";
import { CiSearch } from "react-icons/ci";
import { WiCloud, WiHumidity } from "react-icons/wi";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { RiWindyFill } from "react-icons/ri";
import { FaTemperatureHigh } from "react-icons/fa";

const Home = () => {
  const api = {
    key: "59f86479b48512df06192c8043bba80e",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  const [search, setSearch] = useState("Puttaparthi");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(weather);
      });
  };

  // useEffect(() => {
  //   setSearch("Puttaparthi");
  //   setTimeout(() => searchPressed(), 0);
  // }, []);

  const sunriseTimestamp = weather?.sys?.sunrise;
  const sunsetTimestamp = weather?.sys?.sunset;
  const convertToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderCloudDescription = (clouds) => {
    if (clouds <= 10) return "Clear Sky";
    if (clouds <= 50) return "Partly Cloudy";
    if (clouds <= 90) return "Mostly Cloudy";
    return "Overcast";
  };
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
          <WiCloud className="text-white text-[170px]" />
          <div className="text-white font-semibold">
            <p className="text-[45px] flex items-center">
              {Math.ceil(weather?.main?.temp)}
              <TbTemperatureCelsius className="text-[40px]" />
            </p>

            {/* <p className="text-2xl">{weather.weather.id}</p> */}
          </div>
        </div>
        <h1 className="absolute bottom-[6px] right-[120px] text-[25px] text-white font-bold">
          {renderCloudDescription(weather?.clouds?.all)}
        </h1>
      </div>
      <div className="shadow-2xl h-[280px] w-[45%] absolute right-[20px] bg-transparent/5 top-[21%] rounded-lg flex flex-col p-[20px] justify-around ">
        <div className="flex items-center justify-around">
          <p>
            <span className="flex items-center"><WiHumidity /> Humidity 
              </span>{weather?.main?.humidity}
          </p>
          <p className="flex flex-col">
            <span className="flex items-center">
              Wind <RiWindyFill />
            </span>
            {weather?.wind?.speed}
          </p>
          
          <p>
            <FiSunrise />
            {convertToTime(sunriseTimestamp)}
          </p>
        </div>
        <div className="flex items-center justify-around">
          <p className="flex flex-col"><span className="flex items-center"><FaTemperatureHigh />Feels Like
          </span>{weather?.main?.feels_like}</p>
          <p className="flex flex-col"><span>Sea Level
            </span>{weather?.main?.sea_level}</p>
          <p>
            <FiSunset />
            {convertToTime(sunsetTimestamp)}
          </p>
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
