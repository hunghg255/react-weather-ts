import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { determineIcon } from "../Utils";

interface FormProps {
  idOfWeather: number;
  day: boolean;
  list: [];
}

function Tomorrow(props: FormProps) {
  const determineNextDayAbb = (): string => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let date = new Date();
    let index: number;

    if (date.getDay() === 6) {
      index = 0;
    } else {
      index = date.getDay() + 1;
    }

    return weekdays[index];
  };

  const crawlNextDayTemps = (list: any[]): [number, number] | void => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // tomorrow

    const tomorrow = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();

    let min: number[] = [],
      max: number[] = [];

    list.forEach((e) => {
      if (`${e["dt_txt"][8]}${e["dt_txt"][9]}` === tomorrow.toString()) {
        min.push(e.main.temp_min);
        max.push(e.main.temp_max);
      }
    });

    return [
      Math.round(Math.min(...min) - 273.15),
      Math.round(Math.max(...max) - 273.15),
    ];
  };

  const nextDayTemps = crawlNextDayTemps(props.list);

  return (
    <div className="w-3/12">
      <div className="flex justify-between p-2">
        <div className="text-xs">{determineNextDayAbb()}</div>
        <div className="text-xs flex items-center">
          <div>More</div>
          <RiArrowRightSLine />
        </div>
      </div>
      <div className="flex flex-col text-center">
        <div className="w-full">
          {determineIcon(props.idOfWeather, props.day, "h-16 w-16 mx-auto")}
        </div>
        <div className="text-lg">
          {Array.isArray(nextDayTemps) ? nextDayTemps[0] : "?"}/
          {Array.isArray(nextDayTemps) ? nextDayTemps[1] : "?"}°
        </div>
      </div>
    </div>
  );
}

export default Tomorrow;
