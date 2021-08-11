export const GET_FORECAST = "GET_FORECAST";

//allows to set selected plant
export const getForecast = (data) => {
  return async (dispatch) => {
    //gets info from api
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lng}&exclude=minutely,hourly&units=metric&appid=d10f124250640b979b8fe4a339c3e13c`
    );
    //parse response as json
    const resData = await response.json();

    try {
      // sets current weather
      const currentWeather = {
        icon: `http://openweathermap.org/img/wn/${resData.current.weather[0].icon}@4x.png`,
        temp: resData.current.temp.toString().split(".")[0],
        description: resData.current.weather[0].description,
      };
      // sets forecast for 3 days
      const forecast = resData.daily;
      const nextDaysForecast = forecast.slice(0, 3);
      dispatch({
        type: GET_FORECAST,
        current: currentWeather,
        forecastList: nextDaysForecast,
      });
    } catch (error) {
      throw error;
    }
  };
};
