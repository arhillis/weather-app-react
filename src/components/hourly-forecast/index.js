import {useWeatherContext} from '../../context/weather-context';
import Chart from "react-apexcharts";
//import { Accordion} from 'react-bootstrap';

import Header from './header';

function HourlyForecast(){
    const {hourlyForecast} = useWeatherContext();
    if(!hourlyForecast){
        return (<>No data to show at this time...</>)
    }

    const {currentCity, hourly} = hourlyForecast;

    console.log(hourly);

    const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
            labels: {
            datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yy',
                    day: 'dd MMM',
                    hour: 'HH:mm'
                }
            }
        }    
      }

    const series = [
        {
          
          data: hourly.slice(1, 12).map(hour =>{
            return {
                x: hour.dt,
                y: hour.temp
            }
          })
        }
      ]

    return (<>
        <h1 className='py-3'>{currentCity}</h1>
        <h2>Hourly Forecast</h2>
        <div>
            <div className="mixed-chart">
                <Chart
                options={options}
                series={series}
                type="line"
                width="500"
                />
            </div>
        </div>
    </>)
}

export default HourlyForecast