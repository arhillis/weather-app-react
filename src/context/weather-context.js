import {createContext, useState, useContext} from 'react';

const WeatherContext = createContext();

const WeatherProvider = ({children}) =>{
    const [unit, setUnit] = useState('imperial');

    const handleUnitChange = () =>{
        setUnit(unit === 'imperial' ? 'metric' : 'imperial');
    }

    return <WeatherContext.Provider
        value = {{
            unit,
            handleUnitChange
        }}
    >
        {children}
    </WeatherContext.Provider>
}

export {WeatherProvider}

export const useWeatherContext = () =>{
    return useContext(WeatherContext);
}