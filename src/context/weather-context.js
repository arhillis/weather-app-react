import {createContext, useState, useContext, useEffect} from 'react';
import { getWeatherData } from '../services/weather-service';
import {MAPBOX_API_KEY, MAPBOX_API_URL} from '../api';

const WeatherContext = createContext();

const WeatherProvider = ({children}) =>{
    const [currentForecast, setCurrentForecast] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [unit, setUnit] = useState('imperial');
    const [modalShown, toggleModal] = useState(false);

    const showModal = () => toggleModal(true);
    const hideModal = () => toggleModal(false);

    const handleUnitChange = (val) =>{
        setUnit(val);
    }

    const handleSearchChange = async (searchData) =>{
        if(modalShown) hideModal();
        const [latitude, longitude] = searchData.value.split(' ');
        const oneCall = await getWeatherData('onecall', unit, latitude, longitude); 
        const {current, daily, hourly} = oneCall;
        const degUnit = unit === 'imperial' ? 'F' : 'C';
        setCurrentWeather({currentCity: searchData.label, latitude, longitude, degUnit,...current});
        setCurrentForecast({daily, hourly, degUnit});
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
            currentForecast,
            setCurrentForecast,
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