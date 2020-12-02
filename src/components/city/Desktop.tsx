import React, { useState } from "react";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

import { GiCrossedAirFlows } from "react-icons/gi";
import { MdVisibility } from "react-icons/md";
import { determineIcon } from "../Utils";

interface FormProps {
  city: string;
  info: any;
}

function Desktop(props: FormProps) {
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);

  const blurredChip = {
    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(2px)",
  };

  const determineNext5Days = (): string[] => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let next5Days = [];

    for (let i = 0; i < 4; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);

      next5Days.push(days[d.getDay()]);
    }

    return next5Days;
  };

  interface Simplified {
    time: string;
    temp: number;
    feelsLike: number;
    weatherID: number;
    weatherState: string;
    day: boolean;
    humidity: number;
    pressure: number;
    windSpeed: number;
    visibility: number;
  }

  // pluck relevant info of todays timestamps
  const determineTimestamps = (day: number, list: any[]): any[] => {
    const d = new Date();
    d.setDate(d.getDate() + day);

    const timestamps: Simplified[] = [];

    for (const e of list) {
      if (parseInt(`${e["dt_txt"][8]}${e["dt_txt"][9]}`) === d.getDate()) {
        timestamps.push({
          time: e.dt_txt.slice(11, 16),
          temp: Math.round(e.main.temp - 273.15),
          feelsLike: Math.round(e.main.feels_like - 273.15),
          weatherID: e.weather[0].id,
          weatherState: e.weather[0].main,
          day: e.sys.pod === "d",
          humidity: e.main.humidity,
          pressure: e.main.pressure,
          windSpeed: Math.round(e.wind.speed * 3.6),
          visibility: Math.round(e.visibility / 100),
        });
      }
    }

    return timestamps;
  };

  // rather return the last timestamps than earlier ones (e.g. 21:00 > 03:00)
  const checkTerrain = (squares: number, tss: Simplified[]) => {
    let cut: any[] = [];

    const numberOfNeededRemoval = tss.length - squares;

    if (numberOfNeededRemoval < 0) return tss;

    for (let i = numberOfNeededRemoval; i < tss.length; i++) {
      cut.push(tss[i]);
    }

    return cut;
  };

  const adaptToWidth = (tss: Simplified[]) => {
    // show minimum four squares of timestamps to max 8
    if (tss.length < 5) return tss;

    if (window.innerWidth < 950) {
      return checkTerrain(4, tss);
    } else if (window.innerWidth < 1150) {
      return checkTerrain(5, tss);
    } else if (window.innerWidth < 1250) {
      return checkTerrain(6, tss);
    } else if (window.innerWidth < 1350) {
      return checkTerrain(7, tss);
    }

    return checkTerrain(8, tss);
  };

  // until info from api is fetched
  const timestamps = props.info?.list
    ? adaptToWidth(determineTimestamps(day, props.info?.list))
    : [];

  if (!timestamps.length) {
    return <></>;
  }

  // after fetch
  return (
    <>
      <div className="w-screen flex justify-between" style={{ height: "65%" }}>
        <div className="text-white pt-8 pl-8">
          <div className="text-6xl">
            {determineIcon(timestamps[hour].weatherID, timestamps[hour].day)}
          </div>
          <div className="text-4xl my-1 sm:my-0">
            {timestamps[hour].weatherState}
          </div>
          <div className="text-xl my-1 sm:my-0">{props.city}</div>
          <div className="text-5xl font-bold">{timestamps[hour].temp}°C</div>
        </div>
        <div className="mt-20 mr-4 md:mr-20">
          <div className="flex">
            <div className="text-gray-200 pr-1">
              <WiHumidity className="text-3xl" />
            </div>
            <div>
              <div className="text-gray-200 text-sm sm:base">Humidity</div>
              <div className="text-white text-2xl sm:text-3xl font-bold">
                {timestamps[hour].humidity}%
              </div>
            </div>
          </div>

          <div className="flex my-4">
            <div className="text-gray-200 pr-1">
              <GiCrossedAirFlows className="text-2xl" />
            </div>
            <div>
              <div className="text-gray-200 text-sm sm:base">Air Pressure</div>
              <div className="text-white text-2xl sm:text-3xl font-bold">
                {timestamps[hour].pressure} hPa
              </div>
            </div>
          </div>

          <div className="flex my-4">
            <div className="text-gray-200 pr-1">
              <WiStrongWind className="text-2xl" />
            </div>
            <div>
              <div className="text-gray-200 text-sm sm:base">Wind speed</div>
              <div className="text-white text-2xl sm:text-3xl font-bold">
                {timestamps[hour].windSpeed} km/h
              </div>
            </div>
          </div>

          <div className="flex my-4">
            <div className="text-gray-200 pr-1">
              <MdVisibility className="text-2xl" />
            </div>
            <div>
              <div className="text-gray-200 text-sm sm:base">Visibility</div>
              <div className="text-white text-2xl sm:text-3xl font-bold">
                {timestamps[hour].visibility}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-screen text-white" style={{ height: "35%" }}>
        <div className="flex items-center pl-2 sm:pl-8">
          {determineNext5Days().map((e, i) => {
            return (
              <div
                className="px-2 py-1 mx-2 lg:mb-2 rounded-lg cursor-pointer"
                style={day === i ? blurredChip : {}}
                onClick={() => {
                  setHour(0);
                  setDay(i);
                }}
                key={i}
              >
                {e}
              </div>
            );
          })}
        </div>

        <div className="flex justify-around px-8 pt-6 sm:pt-5">
          {timestamps.map((e: any, index: number) => {
            return (
              <div
                key={index}
                className="h-40 w-40 flex flex-col cursor-pointer"
                style={{
                  boxShadow: "0 0 15px 1px rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(2px)",
                  transform: hour === index ? "scale(1.1)" : "",
                  zIndex: hour === index ? 2 : 1,
                }}
                onClick={() => setHour(index)}
              >
                <div className="pt-2 pl-2">{e.time}</div>
                <div className="flex-grow"></div>
                <div className="pl-1 sm:pl-2 pb-1 sm:pb-2">
                  <div className="text-2xl font-bold">{e.temp}°C</div>
                  {hour === index ? (
                    <div className="text-xs sm:text-base">
                      Feels like {e.feelsLike}°
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Desktop;
