import {createContext, useState, useContext} from 'react';

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
            setCurrentWeather
        }}
    >
        {children}
    </WeatherContext.Provider>
}

export {WeatherProvider}

export const useWeatherContext = () =>{
    return useContext(WeatherContext);
}