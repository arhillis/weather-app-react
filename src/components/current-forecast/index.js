import {useWeatherContext} from '../../context/weather-context';

import './current-forecast.scss';
import { Accordion} from 'react-bootstrap';//, ListGroup 

import Header from './header';
import Body from './body';                                   

function CurrentForecast(){
    const {currentForecast: {daily, degUnit}}= useWeatherContext();
    

    return (<div className='forecast'>
                <label>Forecast</label>
                <Accordion>
                    {daily.slice(1).map((day, index) => (
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
            </div>)
}

export default CurrentForecast;