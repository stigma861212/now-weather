<template>
    <div id="city-name">{{ data.city.ChineseName }} {{ data.city.Englishname }}</div>
    <hr>
    <div>經度: {{ data.city.coord.lon }} 緯度: {{ data.city.coord.lat }}</div>
    <div>體感溫度: {{ data.city.feelTemperature }}</div>
    <div>天氣概況: {{ data.city.weatherDescription }}，雲比例: {{ data.city.clouds }}</div>
    <div v-if="data.city.rain.oneHour !== '' || data.city.rain.threeHours !== ''">累積雨量: 1hr:{{ data.city.rain.oneHour }}mm/h
        3hr:{{ data.city.rain.oneHour }}mm/h</div>
    <div v-else>
        <br>
    </div>
    <div>日出: {{ data.city.sunrise }} 日落: {{ data.city.sunset }}</div>
    <div>風速: {{ data.city.windSpeed }}</div>
    <AirPollution :airPollution="data.city.airPollution" />
</template>

<script setup lang="ts">
import AirPollution from '../components/AirPollution.vue';
const data = defineProps<{ city: ICityInfo }>();

</script>

<style>
#city-name {
    font-size: 24px;
    margin-bottom: 20px;
}
</style>