import React, { useState, useEffect } from "react";

const TimeFromLatLon = ({ latitude, longitude }) => {
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
          throw new Error(`Failed to fetch time: ${response.statusText}`);
        }

        const data = await response.json();

        // Format and set the time
        const formattedTime = `${data.date} ${data.time}`;
        setTime(data?.time);
        setDay(data?.dayOfWeek);
        setDate(data?.date);
        setTimeZone(data?.timeZone);
      } catch (err) {
        console.error("Error fetching time:", err);
        setError("Failed to fetch time. Please try again later.");
      }
    };

    if (latitude && longitude) {
      fetchTime();
    }
  }, [latitude, longitude]);

  return (
    <div>
      <p>Current Time :-{time}</p>
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
