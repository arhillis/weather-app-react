import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {useWeatherContext} from '../../context/weather-context';
import {MAPBOX_API_KEY, MAPBOX_API_URL } from "../../api";

const Search = () =>{
    const {handleSearchChange} = useWeatherContext();
    const [search, setSearch] = useState(null);

    const loadOptions = (searchValue, loadedOptions) =>{
        if(searchValue && searchValue !== ''){
            const mapboxURL = `${MAPBOX_API_URL}/mapbox.places/${searchValue}.json?access_token=${MAPBOX_API_KEY}`;

            return fetch(mapboxURL)
                    .then(response => response.json())
                    .then(data =>{
                        const options = data.features.map(option =>{
                            const {center: [lon, lat], place_name}= option;
                            const label = place_name.includes('United States') ? place_name.replace(', United States', '') : place_name
                            return {
                                value: `${lat} ${lon}`,
                                label
                            }
                        })

                        return {
                            options
                        }
                    })
                    .catch(err =>{
                        return {
                            options: []
                        }
                    });
            // const url = `${GEO_API_URL}/cities?namePrefix=${searchValue}`;
            // `${MAPBOX_API_URL}/`;
            // url, geoApiOptions
            //     
            //     
            //         const {data} = res;
            //         const options = data.map(option =>{
            //             return {
            //                 value: `${option.latitude} ${option.longitude}`,
            //                 label: `${option.city}, ${option.regionCode}`
            //             }
            //         
            //         return {options: options.length > 0 ? options : []};
            //     })
            //     // .then(() => {return {options: []}})
            //     
        }

        return {options: []}
    }

    const handleOnChange = (searchData) =>{
        setSearch(searchData);
        handleSearchChange(searchData);
    };

    return (<div>
        <AsyncPaginate 
            placeholder="Search for city..."
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
        
        </div>
    );
}

export default Search;