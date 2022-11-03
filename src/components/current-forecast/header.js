function Header(props){
    const {day: {
            dt,
            temp: {max, min},
            weather: [desc]
        },
        degUnit
    } = props;

    const {description, icon} = desc;
    const dateObj = new Date(dt * 1000);
    return (<>
                <div className="day">
                    {dateObj.toDateString().slice(0, 10)}
                </div>
                <div>{Math.round(max)}&deg;{degUnit} / {Math.round(min)}&deg;{degUnit}</div>  
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