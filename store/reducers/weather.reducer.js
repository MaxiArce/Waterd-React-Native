import {
    GET_FORECAST
  } from "../actions/weather.actions";
  import Weather from "../../models/Weather";
  
  const initialState = {
    current: null,
    forecastList: []
  };
  
  const WeatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_FORECAST:
        return {
          ...state,
          current: action.current,
          forecastList: action.forecastList.map(
            (item) =>
              new Weather(
                item.dt.toString(),
                item.temp.max.toString().split('.')[0],
                item.temp.min.toString().split('.')[0],
                item.weather[0].main,
                item.weather[0].description,
                item.weather[0].icon
              )
          )          
        };
      default:
        return state;
    }
  };
  
  export default WeatherReducer;
  