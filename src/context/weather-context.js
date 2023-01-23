import {createContext, useState, useContext, useEffect} from 'react';
import { getWeatherData } from '../services/weather-service';
import {MAPBOX_API_KEY, MAPBOX_API_URL} from '../api';

const WeatherContext = createContext();

const WeatherProvider = ({children}) =>{
    const [currentWeather, setCurrentWeather] = useState(null);
    const [dailyForecast, setDailyForecast] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState(null);
    const [unit, setUnit] = useState('imperial');
    const [modalShown, toggleModal] = useState(false);

    const showModal = () => toggleModal(true);
    const hideModal = () => toggleModal(false);

    const handleUnitChange = (val) =>{
        setUnit(val);
    }

    const handleSearchChange = async (searchData) =>{
        if(modalShown) hideModal();
        const {label} = searchData;
        const [latitude, longitude] = searchData.value.split(' ');
        const degUnit = unit === 'imperial' ? 'F' : 'C';
        //const lastCall = JSON.parse(localStorage.getItem('lastCall'));
        // const {lastCallTime, currentCity} = lastCall;
        //const currentTime = Date.now();
        // const timeElapsed = currentTime - lastCallTime;
        
        const oneCall = await getWeatherData('onecall', unit, latitude, longitude); 
        
        /**         * 
         * if there is a last call, and if it has been less than five minutes since the last call, 
         * fetch data local storage if:
         *      - there is a last call
         *      - it has been less than five minutes since the last call
         *      - there is a currentCity
         *      - the current city and the label from searchData are the same
         * else fetch data from the api
         * 1000 ms in a sec, 60 secs in 1 min, 5 minutes = 60,000 * 3 = 180,000
         * 
         * label - from searchData
         * location - from useState
         * 
         */
        // if(lastCallTime && timeElapsed < 300000 && currentCity && currentCity === label){
        //     const {current, daily, hourly, currentCity} = lastCall;
        //     setCurrentWeather({currentCity, latitude, longitude, degUnit,...current});
        //     setDailyForecast({currentCity, daily, degUnit});
        //     setHourlyForecast({currentCity, hourly, degUnit});
        // }else{
            
            const {current, daily, hourly} = oneCall;
            setCurrentWeather({currentCity: label, latitude, longitude, degUnit,...current});
            setDailyForecast({currentCity: label, daily, degUnit});
            setHourlyForecast({currentCity: label, hourly, degUnit});
            //localStorage.setItem('lastCall', JSON.stringify({lastCallTime: currentTime, current, daily, hourly, unit, currentCity: label}))
        // }

    }

    const showPosition = (position) => {
        const {latitude, longitude} = position.coords;
            fetch(`${MAPBOX_API_URL}/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_API_KEY}`)
            .then(res => res.json())
            .then(data =>{ 
                const {context} =data.features[0];
                handleSearchChange({
                    label: `${context[1].text}, ${context[3].text}`, 
                    value: `${latitude} ${longitude}`
                });
            })
            .catch(err => console.log(err))
        }

    const getCurrentLocation = () =>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    useEffect(() => getCurrentLocation(), []);

    return <WeatherContext.Provider
        value = {{
            unit,
            showPosition,
            modalShown,
            showModal,
            hideModal,
            handleUnitChange,
            dailyForecast,
            setDailyForecast,
            hourlyForecast,
            setHourlyForecast,
            currentWeather,
            setCurrentWeather,
            handleSearchChange,
            getCurrentLocation
        }}
    >
        {children}
    </WeatherContext.Provider>
}

export {WeatherProvider}

export const useWeatherContext = () =>{
    return useContext(WeatherContext);
}