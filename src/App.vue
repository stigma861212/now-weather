<template>
  <h1>台灣天氣</h1>
  <div id="citys-area">
    <div v-for="city in cityList">
      <div :class='[city.weather, "city"]'>
        <City :city="city" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import City from './components/City.vue';
  import { onMounted, reactive } from 'vue';

  const appid: string = import.meta.env.VITE_APP_APPID;

  const cityList = reactive<Array<ICityInfo>>([]);

  onMounted(async () => {
    await readJsonFile('/now-weather/assets/city.json');

    cityList.forEach(async element => {
      const cityWeatherData = await getCityWeatherData(element.Englishname);
      const cityAirPollutionData = await getCityAirPollutionData(cityWeatherData.coord.lat, cityWeatherData.coord.lon);

      element.feelTemperature = cityWeatherData.main.feels_like + "°C";
      element.weatherDescription = cityWeatherData.weather[0].description;

      element.windSpeed = cityWeatherData.wind.speed + "m/s";
      element.clouds = cityWeatherData.clouds.all + "%";
      element.sunrise = new Date(cityWeatherData.sys.sunrise * 1000).toLocaleTimeString();
      element.sunset = new Date(cityWeatherData.sys.sunset * 1000).toLocaleTimeString();
      element.coord.lat = cityWeatherData.coord.lat;
      element.coord.lon = cityWeatherData.coord.lon;


      element.airPollution.aqi = cityAirPollutionData.list[0].main.aqi;
      element.airPollution.co = cityAirPollutionData.list[0].components.co + " μg/m3";
      element.airPollution.nh3 = cityAirPollutionData.list[0].components.nh3 + " μg/m3";
      element.airPollution.no = cityAirPollutionData.list[0].components.no + " μg/m3";
      element.airPollution.no2 = cityAirPollutionData.list[0].components.no2 + " μg/m3";
      element.airPollution.o3 = cityAirPollutionData.list[0].components.o3 + " μg/m3";
      element.airPollution.pm2_5 = cityAirPollutionData.list[0].components.pm2_5 + " μg/m3";
      element.airPollution.pm10 = cityAirPollutionData.list[0].components.pm10 + " μg/m3";
      element.airPollution.so2 = cityAirPollutionData.list[0].components.so2 + " μg/m3";

      if (cityWeatherData.rain) {
        element.weather = "rain";
        if (cityWeatherData.rain["1h"]) {
          element.rain.oneHour = cityWeatherData.rain["1h"] + " mm/h";
        }

        if (cityWeatherData.rain["3h"]) {
          element.rain.threeHours = cityWeatherData.rain["3h"] + " mm/h";
        }
      }
      else {
        element.weather = "sun";
      }
    });
  });

  /**讀取城市資料 */
  async function readJsonFile(url: string) {
    try {
      const response = await axios.get(url);
      const data = response.data;
      // console.log("data:", data);
      data.city.forEach((element: any) => {
        let cityData: ICityInfo = {
          ChineseName: element.chineseName,
          Englishname: element.englishName,
          feelTemperature: '',
          weatherDescription: '',
          rain: {
            oneHour: '',
            threeHours: '',
          },
          windSpeed: '',
          clouds: '',
          sunrise: '',
          sunset: '',
          coord: {
            lat: '',
            lon: ''
          },
          airPollution: {
            aqi: '',
            co: "",
            nh3: "",
            no: "",
            no2: "",
            o3: "",
            pm2_5: "",
            pm10: "",
            so2: ""
          },
          weather: ''
        }
        cityList.push(cityData);  // 更新响应式数据
      });
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }
  }
  /**取得城市天氣資料 */
  async function getCityWeatherData(cityName: string) {
    if (!appid) {
      const response = await axios.get(`https://now-weather-backend.onrender.com/api/weather?city=${cityName}`)
      return response.data;
    }
    else {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appid}&units=metric&lang=zh_tw`)
      return response.data;
    }
  }
  /**取得城市空汙資料 */
  async function getCityAirPollutionData(lat: string, lon: string) {
    if (!appid) {
      const response = await axios.get(`https://now-weather-backend.onrender.com/api/air-pollution?lat=${lat}&lon=${lon}`)
      return response.data;
    }
    else {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${appid}`)
      return response.data;
    }
  }

</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
  }

  h1 {
    background-color: bisque;
    min-width: 300px;
    text-align: center;
  }

  #citys-area {
    background-color: bisque;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    /* 自動調整列數 */
    width: 100%;
    height: 100%;
    gap: 10px;
    padding: 10px;
  }

  .city {
    border-radius: 10px;
    padding: 10px;
  }

  .rain {
    background-color: lightblue;

  }

  .sun {
    background-color: white;
  }
</style>