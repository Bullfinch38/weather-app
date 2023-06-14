import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { url, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${url}?minPopulation=10000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const result = await response.json();
      const cities = result.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name} ${city.countryCode}`,
      }));
      return { options: cities };
    } catch (error) {
      console.error(error);
      return { options: [] };
    }
  };
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate className="search-bar"
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
