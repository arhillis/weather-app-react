import './current-forecast.scss';
import { Accordion} from 'react-bootstrap';//, ListGroup 

import Header from './header';
import Body from './body';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                                    

function CurrentForecast(props){
    const {daily} = props.currentForecast;//, hourly
    const dayOfTheWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayOfTheWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayOfTheWeek));

    return (<div className='forecast'>
                <label>Forecast</label>
                <Accordion>
                    {daily.slice(1).map((day, index) => (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>
                                <Header day={day} dayOfTheWeek={forecastDays[index]}/>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Body day={day} />
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}                  
                </Accordion>          
            </div>)
}

export default CurrentForecast;