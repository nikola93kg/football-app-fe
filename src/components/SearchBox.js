import React, { useState } from 'react'
import { handleKeyPress } from "../utils/handleKeyPress";
import { CiSearch } from 'react-icons/ci';
import { GrPowerReset } from 'react-icons/gr';
import "../styles/SearchBox.css"

const SearchBox = ({ inputs, onSearch, onReset }) => {
  return (
    <div className="search-box">
      {inputs.map((input, index) => (
        <input key={index} value={input.value} onChange={input.onChange} onKeyDown={handleKeyPress(onSearch)} placeholder={input.placeholder} />
      ))}
      <button className="submit-btn" onClick={onSearch}>
        <CiSearch />
      </button>
      {onReset && (
        <button className="reset-btn" onClick={onReset}>
          <GrPowerReset />
        </button>
      )}
    </div>
  );
};

export default SearchBox;