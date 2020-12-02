import React from "react";
import { determineIcon } from "../Utils";

interface FormProps {
  stateOfWeather: string;
  idOfWeather: number;
  day: boolean;
}

function LeftComponent(props: FormProps) {
  return (
    <div className="flex flex-col text-center">
      {determineIcon(props.idOfWeather, props.day, "h-16 w-16")}
      <div>{props.stateOfWeather}</div>
    </div>
  );
}

export default LeftComponent;
