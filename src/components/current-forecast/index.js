import './current-forecast.scss';

import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";

const CurrentForecast = (props) => {
    const list = props.currentForecast.list.splice(0, 10);
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
                                <img alt="Weather icon" 
                                        src={`icons/${icon}.png`} 
                                        width='30'
                                />
                                {description}
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