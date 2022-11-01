function Header(props){
    const {day: {
            temp: {max, min},
            weather: [desc]
        }
    } = props;
    const {description, icon} = desc;



    const dateStr = new Date(props.day.dt * 1000);

    return (<>
                <div className="day">
                    {dateStr.toString().slice(0, 10)}
                </div>
                <div>{Math.round(max)}&deg;F / {Math.round(min)}&deg;F</div>  
                <div>
                    <img alt="Weather icon" 
                        src={`icons/${icon}.png`} 
                        width='30'
                    />
                        {description}
                    </div>
            </>)
}

export default Header;