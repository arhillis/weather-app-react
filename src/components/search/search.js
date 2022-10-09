import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({onSearchChange}) =>{

    const [search, setSearch] = useState(null);

    const loadOptions = (searchValue, loadedOptions) =>{
        return fetch(`${GEO_API_URL}?namePrefix=${searchValue}`, geoApiOptions)
            .then(response => response.json())
            .then((response) => {
                return {
                options: response.data.map((city) => {
                    return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
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