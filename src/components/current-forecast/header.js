function Header(props){
    const {day: {
            temp: {max, min},
            weather: [desc]
        }, 
        dayOfTheWeek
    } = props;
    const {description, icon} = desc;
    return (<>
                <div className="day">
                    {dayOfTheWeek}
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