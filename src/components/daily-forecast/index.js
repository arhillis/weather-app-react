import {useWeatherContext} from '../../context/weather-context';
import './daily-forecast.scss';
import { Accordion} from 'react-bootstrap';

import Body from './body';
import Header from './header';

function DailyForecast(){
    const {dailyForecast}= useWeatherContext();

    if(!dailyForecast){
        return (<>Loading data...</>)
    }

    const {daily, currentCity, degUnit} = dailyForecast;
    
    return (<>
        <h1 className='py-3'>{currentCity}</h1>
        <h2>Daily Forecast</h2>
        <Accordion>
            {daily.map((day, index )=> (
                <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>
                        <Header day={day} degUnit={degUnit}/>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Body day={day} degUnit={degUnit} />
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    </>)
}

export default DailyForecast;