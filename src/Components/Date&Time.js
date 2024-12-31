import React, { useState, useEffect } from "react";

const TimeFromLatLon = ({ latitude, longitude, BGChange, setSearch }) => {
  const [time, setTime] = useState(null);
  const [error, setError] = useState(null);
  const [day, setDay] = useState(null);
  const [date, setDate] = useState(null);
  const [timeZone, setTimeZone] = useState(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(
          `https://timeapi.io/api/time/current/coordinate?latitude=${latitude}&longitude=${longitude}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTime(data?.time);
        setDay(data?.dayOfWeek);
        setDate(data?.date);
        setTimeZone(data?.timeZone);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching time data:", error);
      }
    };

    if (latitude && longitude) {
      fetchTime();
    }
  }, [latitude, longitude]);

  function handleTimeChange(timeString) {
    if (!timeString) return;
    const [hours, minutes] = timeString.split(":").map(Number); 
    const totalMinutes = hours * 60 + minutes; 

    if (totalMinutes >= 19 * 60) {
      BGChange(3); 
    } else if (totalMinutes >= 15 * 60) {
      BGChange(2); 
    } else {
      BGChange(1); 
    }
  }

  useEffect(() => {
    handleTimeChange(time);
  }, [time]);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <p>Current Time :- {time}</p>
          <div className="flex gap-[10px]">
            <p className="absolute top-[60px] left-[20px] text-2xl font-semibold flex flex-col">
              {day},{" "}
              <span className="text-xl font-thin">TimeZone :- {timeZone}</span>
            </p>
            <p>Date :- {date}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default TimeFromLatLon;
