import {createContext, useState, useContext} from 'react';
import { getWeatherData } from '../services/weather-service';

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

    return <WeatherContext.Provider
        value = {{
            unit,
            modalShown,
            showModal,
            hideModal,
            handleUnitChange,
            currentForecast,
            setCurrentForecast,
            currentWeather,
            setCurrentWeather,
            handleSearchChange
        }}
    >
        {children}
    </WeatherContext.Provider>
}

export {WeatherProvider}

export const useWeatherContext = () =>{
    return useContext(WeatherContext);
}