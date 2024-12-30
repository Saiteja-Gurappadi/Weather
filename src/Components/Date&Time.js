import React, { useState, useEffect } from "react";

const TimeFromLatLon = ({ latitude, longitude,BGChange }) => {
  const [time, setTime] = useState(null);
  const [error, setError] = useState(null);
  const [day, setDay] = useState(null);
  const [date, setDate] = useState(null);
  const [timeZone, setTimeZone] = useState(null);
  useEffect(() => {
    const fetchTime = async () => {
      
        const response = await fetch(
          `https://timeapi.io/api/time/current/coordinate?latitude=${latitude}&longitude=${longitude}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setTime(data?.time);
        setDay(data?.dayOfWeek);
        setDate(data?.date);
        setTimeZone(data?.timeZone);
    };

    if (latitude && longitude) {
      fetchTime();
    }
  }, [latitude, longitude]);
  function handleTimeChange(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number); // Split "HH:MM" and convert to numbers
    const totalMinutes = hours * 60 + minutes; // Convert time to total minutes since midnight
  
    if (totalMinutes >= 19 * 60) {
      BGChange(3); // After 19:00
    } else if (totalMinutes >= 15 * 60) {
      BGChange(2); // Between 15:00 and 19:00
    } else {
      BGChange(1); // Before 15:00
    }
  }
  useEffect(()=>{
    handleTimeChange(time)
  })
  return (
    <div>
      <p>Current Time :-{time}</p>
      {
        
      }
      <div className="flex gap-[10px]">
        <p className="absolute top-[60px] left-[20px] text-2xl font-semibold flex flex-col ">
          {day},{" "}
          <span className="text-xl font-thin">TimeZone :- {timeZone}</span>
        </p>
        <p>Date :- {date}</p>
      </div>
    </div>
  );
};

export default TimeFromLatLon;
