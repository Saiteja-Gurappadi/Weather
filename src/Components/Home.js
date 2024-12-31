import React, { useEffect, useState } from "react";
import dayBG from "../Images/BG1.jpg";
import eveningBG from '../Images/BG2.jpg';
import nightBG from '../Images/BG3.jpg'
import { CiSearch } from "react-icons/ci";
import { WiCloud, WiHumidity } from "react-icons/wi";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { RiWindyFill } from "react-icons/ri";
import { FaTemperatureHigh } from "react-icons/fa";
import TimeFromLatLon from "./Date&Time";

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
      });
  };

  useEffect(() => {
    searchPressed();
  }, []);

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
  const [bgChange,setBGChange] = useState(1);
  console.log(
    weather?.coord?.lat,
              weather?.coord?.lon

  )
  return (
    <div className="relative h-[100vh] w-[100%]">
      {bgChange == 1 && <img
        src={dayBG}
        alt=""
        className="h-[100vh] w-[100%] blur-[0px] object-cover object-center"
      />}
      {bgChange == 2 && <img
        src={eveningBG}
        alt=""
        className="h-[100vh] w-[100%] blur-[0px] object-cover object-center"
      />}
      {bgChange == 3 && <img
        src={nightBG}
        alt=""
        className="h-[100vh] w-[100%] blur-[0px] object-cover object-center"
      />}
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
        <div className="mx-[10px] flex justify-between items-center">
          <h1 className="text-5xl text-white font-semibold font-sans">
            {weather.name}
            <span className="text-3xl">,{weather?.sys?.country}</span>
          </h1>
          <div className="text-white text-xl font-normal flex items-center">
            <TimeFromLatLon
              latitude={weather?.coord?.lat}
              longitude={weather?.coord?.lon}
              BGChange = {setBGChange}
              setSearch = {setSearch}
            />
            
          </div>
        </div>
        <div className="flex items-center justify-center">
          <WiCloud className="text-white text-[170px]" />
          <div className="text-white font-semibold">
            <p className="text-[45px] flex items-center">
              {Math.ceil(weather?.main?.temp)}
              <TbTemperatureCelsius className="text-[40px]" />
            </p>

            {/* <p className="text-3xl font-bolder">{weather.weather.id}</p> */}
          </div>
        </div>
        <h1 className="absolute bottom-[6px] left-[180px] text-[25px] text-white font-bold">
          {renderCloudDescription(weather?.clouds?.all)}
        </h1>
      </div>
      <div className="shadow-2xl h-[280px] w-[45%] absolute right-[20px] bg-black/15 top-[21%] rounded-lg flex flex-col p-[20px] justify-around text-white text-[25px] font-thin">
        <div className="flex items-center justify-around">
          <p className="flex flex-col items-center">
            <span className="flex items-center">
              <WiHumidity className="text-3xl font-bolder" /> Humidity
            </span>
            {weather?.main?.humidity}
          </p>
          <p className="flex flex-col">
            <span className="flex items-center">
              Wind <RiWindyFill className="text-3xl font-bolder" />
            </span>
            {weather?.wind?.speed}
          </p>

          <p>
            <span className="flex items-center gap-[10px]">
              Sunrise
              <FiSunrise className="text-3xl font-bolder" />
            </span>

            {convertToTime(sunriseTimestamp)}
          </p>
        </div>
        <div className="flex items-center justify-around">
          <p className="flex flex-col items-center">
            <span className="flex items-center">
              <FaTemperatureHigh className="text-3xl font-bolder" />
              Feels Like
            </span>
            {weather?.main?.feels_like}
          </p>
          <p className="flex flex-col items-center">
            <span>Sea Level</span>
            {weather?.main?.sea_level}
          </p>
          <p className="">
            <span className="flex items-center gap-[10px]">
              Sunset
              <FiSunset className="text-3xl font-bolder" />
            </span>

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
