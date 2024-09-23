// TODO: temp context
interface ICityInfo {
    /**城市中文名稱 */
    ChineseName: string;
    /**城市英文名稱 */
    Englishname: string;
    /**城市經緯度 */
    coord: ICoord
    /**體感溫度 */
    feelTemperature: string;
    /**天氣描述 */
    weatherDescription: string;
    /**降雨量 */
    rain: IRainVolume;
    /**風速 米/秒 */
    windSpeed: string;
    /**雲度，% */
    clouds: string
    /**日出時間，unix，UTC */
    sunrise: string;
    /**日落時間，unix，UTC */
    sunset: string;
    /**空汙 */
    airPollution: IAirPollution;
    /**是否下雨 */
    weather: string;
}

/**經緯度 */
interface ICoord {
    /**緯度 */
    lat: string;
    /**經度 */
    lon: string;
}

/**降雨量 */
interface IRainVolume {
    /**1小時降雨量mm/h */
    oneHour: string;
    /**3小時降雨量mm/h */
    threeHours: string;
}

/**空汙 */
interface IAirPollution {
    /**AQI */
    aqi: string;
    /**一氧化碳 */
    co: string;
    /**氨 */
    nh3: string;
    /**一氧化氮 */
    no: string;
    /**二氧化氮 */
    no2: string;
    /**臭氧 */
    o3: string;
    /**粒狀物 */
    pm2_5: string;
    /**粒狀物 */
    pm10: string;
    /**二氧化硫 */
    so2: string;
}