class Weather {
    constructor(id,maxTemp, MinTemp, description, icon) {
      this.id = id;
      this.maxTemp = maxTemp;
      this.minTemp = MinTemp;
      this.description = description;
      this.iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`
    }
  }
  
  export default Weather;