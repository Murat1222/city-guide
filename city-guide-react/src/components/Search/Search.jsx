import React from 'react';
import { debounce } from '../Utils/Utils';
import './Search.scss';

function SearchComponent({ onSearch }) {
  const handleInput = debounce((event) => {
    const inputValue = event.target.value;
    onSearch(inputValue);
  }, 300);

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        placeholder="Поиск достопримечательностей"
        onInput={handleInput}
      />
    </div>
  );
}

export default SearchComponent;