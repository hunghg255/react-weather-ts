import React from "react";

interface FormProps {
  feelsLike: number;
  deg: number;
  speed: number;
}

function RightComponent(props: FormProps) {
  const determineLevel = (temp: number): string[] => {
    if (temp < 10 || temp > 29) {
      return ["Bad", "bg-red-600"];
    }

    if ((temp > 9 && temp < 18) || (temp > 22 && temp < 30)) {
      return ["ok", "bg-yellow-600"];
    }

    if (temp > 17 && temp < 23) {
      return ["Good", "bg-green-600"];
    }

    return [];
  };

  const determineSide = (deg: number): string | undefined => {
    if (deg < 30) return "N";

    if (deg < 60) return "NE";

    if (deg < 120) return "E";

    if (deg < 150) return "ES";

    if (deg < 210) return "S";

    if (deg < 240) return "SW";

    if (deg < 300) return "W";

    if (deg < 330) return "NW";

    if (deg < 360) return "N";
  };

  const feelsLikeProperties = determineLevel(props.feelsLike);

  return (
    <div className="self-end text-center">
      <div
        className={`${feelsLikeProperties[1]} rounded-lg text-xs sm:text-sm p-1`}
      >
        {props.feelsLike} {feelsLikeProperties[0]}
      </div>
      <div className="mt-1 text-xs md:text-sm">
        {determineSide(props.deg)} {Math.round(props.speed * 3.6)} km/h
      </div>
    </div>
  );
}

export default RightComponent;
