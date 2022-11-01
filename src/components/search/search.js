import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({onSearchChange}) =>{

    const [search, setSearch] = useState(null);

    const loadOptions = (searchValue, loadedOptions) =>{
        if(searchValue && searchValue !== ''){
            const url = `${GEO_API_URL}/cities?namePrefix=${searchValue}`;
            return fetch(url, geoApiOptions)
                .then(response => response.json())
                .then(res =>{
                    const {data} = res;
                    const options = data.map(option =>{
                        return {
                            value: `${option.latitude} ${option.longitude}`,
                            label: `${option.city}, ${option.regionCode}`
                        }
                    })
                    return {options: options.length > 0 ? options : []};
                })
                // .then(() => {return {options: []}})
                .catch(err => console.log(err));
        }

        return {options: []}
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