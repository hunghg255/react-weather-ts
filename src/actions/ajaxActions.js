import { FETCH_WEATHER } from "./types";

export const fetchWeather = () => async (dispatch) => {
  const ids = {
    HaNoi: 1581130,
    HoChiMinh: 1566083,
    BacGiang: 1591527,
  };

  const fetches = await Promise.all(
    Object.values(ids).map((e) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?id=${e}&appid=0c7a18a8180f633ee8c938d39a3b3df7`
      ).then((e) => e.json())
    )
  );

  dispatch({
    type: FETCH_WEATHER,
    payload: {
      // iterating through object does not guarantee order, so I chose manually
      HaNoi: fetches[0],
      HoChiMinh: fetches[1],
      BacGiang: fetches[2],
    },
  });
};
