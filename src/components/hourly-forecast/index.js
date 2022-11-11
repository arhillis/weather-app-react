import {useWeatherContext} from '../../context/weather-context';
import { Accordion} from 'react-bootstrap';

import Header from './header';

function HourlyForecast(){
    const {hourlyForecast} = useWeatherContext();
    if(!hourlyForecast){
        return (<>No data to show at this time...</>)
    }

    const {currentCity, hourly} = hourlyForecast;

    console.log(hourly[0]);
    return (<>
        <h1 className='pt-3'>{currentCity}</h1>
        <h2>Hourly Forecast</h2>
        <Accordion>
            {hourly.slice(0, 12).map((hour, index)=> (
                <Accordion.Item  eventKey={index} key={index}>
                    <Accordion.Header>
                        <Header hour={hour}/>
                    </Accordion.Header>
                    <Accordion.Body>
                        Body goes here...
                    </Accordion.Body>
                </Accordion.Item>))}
        </Accordion>
    </>)
}

export default HourlyForecast