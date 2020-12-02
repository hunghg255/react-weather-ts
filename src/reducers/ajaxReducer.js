import { FETCH_WEATHER } from "../actions/types";

const initialState = {
  weather: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        weather: action.payload,
      };
    default:
      return state;
  }
}
