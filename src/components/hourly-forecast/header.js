function Header(props){
    const {hour: {
            dt,
            temp,
            weather: [desc]
        },
        degUnit
    } = props;

    const {description, icon} = desc;
    const dateObj = new Date(dt * 1000);
    const hour  = dateObj.getHours()

    return (<>
                 <div className="day">
                     {hour > 12 ? `${hour - 12}pm` : `${hour}am`}
                 </div>
                 <div>{Math.round(temp)}&deg;{degUnit}</div>                  
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