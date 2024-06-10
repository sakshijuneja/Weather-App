import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../services/Api";

export default function Search({ onSearchChange, isDarkMode }) {
  const [searchInput, setSearchInput] = useState(null);

  const handleSearchInput = (searchData) => {
    setSearchInput(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );

      const result = await response.json();

      if (!result.data) {
        console.error("Invalid response format");
        return { options: [] };
      }

      const options = result.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      });

      return { options };
    } catch (error) {
      console.error(error);
      return { options: [] }; // Return an empty options array on error
    }
  };

  const customStyles = (isDarkMode) => ({
    control: (defaultStyles) => ({
      ...defaultStyles, // Retains all existing styles for control
      backgroundColor: isDarkMode ? "#333" : "#fff", // Sets background color based on dark mode
      color: isDarkMode ? "#fff" : "#000", // Sets text color based on dark mode
    }),
    menu: (defaultStyles) => ({
      ...defaultStyles, // Retains all existing styles for menu
      backgroundColor: isDarkMode ? "#333" : "#fff", // Sets background color for dropdown menu based on dark mode
    }),
    singleValue: (defaultStyles) => ({
      ...defaultStyles, // Retains all existing styles for single value
      color: isDarkMode ? "#fff" : "#000", // Sets text color for selected value based on dark mode
    }),
    input: (defaultStyles) => ({
      ...defaultStyles, // Retains all existing styles for input
      color: isDarkMode ? "#fff" : "#000", // Sets text color for input based on dark mode
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles, // Retains all existing styles for placeholder
      color: isDarkMode ? "#bbb" : "#888", // Sets placeholder text color based on dark mode
    }),
  });
  

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={searchInput}
      onChange={handleSearchInput}
      loadOptions={loadOptions}
      styles={customStyles(isDarkMode)}
    />
  );
}
