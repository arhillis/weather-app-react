//Used in the search component
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_GEO_API_KEY,// enter your rapid api key here
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  }
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

//Used in App.js (showPosition)
export const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

export const MAPBOX_API_URL = "https://api.mapbox.com/geocoding/v5";

//Used to fetch weather data (weather-service)
export const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/";
