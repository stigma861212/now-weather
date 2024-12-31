# Weather

Get the cities weather. Using typescript and vue.

Api sources from openweathermap.

You can go to this github pages to see demo. (Backend create from render, it should wait minutes to let it operation)

https://stigma861212.github.io/now-weather/

## Project Setup

```
npm install
```

### Compile and Hot-Reload for Development

```
npm run dev
```

### Type-Check, Compile and Minify for Production

```
npm run build
```

## Preparation

Add the appid in ```.env``` file, appid can apply from the openweathermap website.

```.env``` file need to add ```VITE_APP_APPID=your openweathermap appid```.

you also can check ```.env.example```.

## City Data

Using ```city.json``` to set the cities i want to show and add their chinese name, also can add other cities you want in this file.