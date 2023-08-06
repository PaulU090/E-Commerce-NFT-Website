import React, { useState } from "react";

import "../Styles/SortByDropdown.css";

const DropdownSelect = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    }

    return (
        <select value={selectedOption} onChange={handleChange}>
            <option value="">Sort By</option>
            <option value="option1">A-Z</option>
            <option value="option2">Price(Hi - Lo)</option>
            <option value="option3">Price(Lo - Hi)</option>
            <option value="option4">Most Popular</option>
        </select>
    );
}

export default DropdownSelect;
