import React, { useState } from "react";
import { useCombobox } from "downshift";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ placeholder, onSearch, fetchSuggestions }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { getInputProps, getMenuProps, getItemProps, highlightedIndex, isOpen } = useCombobox({
    items: suggestions,
    inputValue,
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || "");
      if (inputValue) {
        handleSearch(inputValue); // Llamar a fetchSuggestions solo si hay texto
      } else {
        setSuggestions([]); // Limpiar sugerencias si el input está vacío
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onSearch(selectedItem); // Enviar la sugerencia seleccionada
      }
    },
  });

  const handleSearch = async (value) => {
    const data = await fetchSuggestions(value);
    setSuggestions(data); // Actualizar las sugerencias con los resultados de la API
  };

  const handleClearInput = () => {
    setInputValue("");
    onSearch("");
    setSuggestions([]); // Limpiar sugerencias al borrar el input
  };

  return (
    <div className="relative flex items-center gap-2">
      <div className="relative flex-grow">
        <input
          {...getInputProps({
            placeholder: placeholder,
            className:
              "w-full bg-secondary-100 text-primary-100 placeholder-gray-500 rounded-lg px-3 py-2 focus:outline-none",
          })}
        />
        {inputValue && (
          <button
            onClick={handleClearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 hover:text-gray-500 transition-colors"
          >
            <FaTimes />
          </button>
        )}
      </div>
      <button
        onClick={() => onSearch(inputValue)}
        className="bg-secondary-900 text-secondary-100 p-3 rounded-lg hover:bg-secondary-700 flex items-center justify-center transition-colors"
      >
        <FaSearch />
      </button>

      {/* Menú de sugerencias */}
      <ul
        {...getMenuProps()}
        className={`absolute top-10 z-10 w-full mt-1 rounded-lg shadow-lg bg-secondary-100 ${
          isOpen && suggestions.length > 0 ? "block" : "hidden"
        }`}
      >
        {isOpen &&
          suggestions.map((item, index) => (
            <li
              key={item}
              {...getItemProps({ item, index })}
              className={`p-3 cursor-pointer transition-colors ${
                highlightedIndex === index ? "bg-secondary-500 text-primary-100" : "hover:bg-secondary-300"
              }`}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchBar;