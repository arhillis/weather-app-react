import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { MAPBOX_API_KEY } from "../../api";

const Search = ({onSearchChange}) =>{

    const [search, setSearch] = useState(null);

    const loadOptions = (searchValue, loadedOptions) =>{
        //const mapquest_API_KEY = "oz9OL7hgFsSS19Ljsn3iL4PNMxGRT90E";
        return fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${MAPBOX_API_KEY}&location=${searchValue}`)
            .then(response => response.json())
            .then((response) => {
                return {
                options: response.results[0].locations
                .filter((city) => city.adminArea5.length > 0)
                .map((city) => {
                    const {adminArea1, adminArea3, adminArea5, displayLatLng} = city;
                    return {
                        value: `${displayLatLng.lat} ${displayLatLng.lng}`,
                        label: `${adminArea5}, ${adminArea1 === 'US' ? ` ${adminArea3} (US)` : adminArea1}`
                    };
                }),
                };
            });

    }

    const handleOnChange = (searchData) =>{
        setSearch(searchData);
        onSearchChange(searchData);
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