import {WEATHER_API_KEY, WEATHER_API_URL} from '../api';

export const getWeatherData = (dataType, unit, lat, lon) =>{
    return fetch(`${WEATHER_API_URL}${dataType}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${unit}`)
        .then(res => res.json())
        .then(data => data)
}