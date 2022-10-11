import './current-forecast.scss';

import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const CurrentForecast = (props) => {
    const list = props.currentForecast.list.splice(0, 7);
    const dayOfTheWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayOfTheWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayOfTheWeek));
    console.log(forecastDays);
    console.log(list);
    return (<div className="forecast">
        <label>Forecast</label>        
        <Accordion allowZeroExpanded>
            {list.map((item, index) =>{
                const {icon, description} = item.weather[0];
                return (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                {forecastDays[index]}
                                <div>
                                    <img alt="Weather icon" 
                                            src={`icons/${icon}.png`} 
                                            width='30'
                                    />
                                    {description}
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                In ad velit in ex nostrud dolore cupidatat consectetur
                                ea in ut nostrud velit in irure cillum tempor laboris
                                sed adipisicing eu esse duis nulla non.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                )
            })}
        </Accordion>
    </div>)
}

export default CurrentForecast;