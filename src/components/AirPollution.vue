<template>
    <hr>
    <div>空汙:</div>
    <div>AQI: {{ data.airPollution.aqi }}</div>
    <div class="airPollution-group">
        <div class="pollution">co: {{ data.airPollution.co }}</div>
        <div class="pollution">nh3: {{ data.airPollution.nh3 }}</div>
        <div class="pollution">no: {{ data.airPollution.no }}</div>
        <div class="pollution">no2: {{ data.airPollution.no2 }}</div>
        <div class="pollution">o3: {{ data.airPollution.o3 }}</div>
        <div class="pollution">pm10: {{ data.airPollution.pm10 }}</div>
        <div class="pollution">pm2.5: {{ data.airPollution.pm2_5 }}</div>
        <div class="pollution">so2: {{ data.airPollution.so2 }}</div>
    </div>
</template>

<script setup lang="ts">

const data = defineProps<{ airPollution: IAirPollution }>();

</script>

<style>
hr{
    border-top: 2px solid bisque;
    border-radius: 10px;
}

.airPollution-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.pollution {
    width: 50%;
    padding: 5px 0px 0px;
}
</style>