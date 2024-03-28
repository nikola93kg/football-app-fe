import React, { useState } from 'react'
import { handleKeyPress } from "../utils/handleKeyPress";
import { CiSearch } from 'react-icons/ci';
import { GrPowerReset } from 'react-icons/gr';

function SearchBox({ onSearch, placeholders = { name: '', nationality: '' }, onReset }) {

    const [searchName, setSearchName] = useState('');
    const [searchNationality, setSearchNationality] = useState('');

    const handleSearch = () => onSearch(searchName, searchNationality);

    const handleReset = () => {
        setSearchName('');
        setSearchNationality('');
        onReset();
      };

      return (
        <div className="search-box">
          <input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={handleKeyPress(handleSearch)}
            placeholder={placeholders.name || "Search by name"}
          />
          <input
            value={searchNationality}
            onChange={(e) => setSearchNationality(e.target.value)}
            onKeyDown={handleKeyPress(handleSearch)}
            placeholder={placeholders.nationality || "Search by nationality"}
          />
          <button className="submit-btn" onClick={handleSearch}>
            <CiSearch />
          </button>
          <button className="reset-btn" onClick={handleReset}>
            <GrPowerReset />
          </button>
        </div>
      );
}

export default SearchBox