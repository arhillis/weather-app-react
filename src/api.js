export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_GEO_API_KEY,// enter your rapid api key here
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
  params: {countryIds: 'US'}
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const MAPBOX_API_KEY = "pk.eyJ1IjoiYXJoaWxsaXMiLCJhIjoiY2w5eTllbWxzMDJtbzN1cG0zOW1zbWsxeCJ9.ERr_X-vsKe_9t5NqbPYw6Q";

export const MAPBOX_API_URL = "https://api.mapbox.com/geocoding/v5";

export const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/";

export const IP_GEO_API_KEY = "48648a513e7542e2b5e6df76045ca32d";

export const IP_GEO_API_URL = "https://api.ipgeolocation.io/timezone"