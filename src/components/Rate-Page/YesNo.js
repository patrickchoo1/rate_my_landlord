import React, { useState } from 'react';
import './YesNo.css';

function YesNo({ name, onChange }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onChange(name, value);
    };

    return (
        <div className="yes-no-options">
            <label className={`yes-no ${selectedOption === 'yes' ? 'selected' : ''}`}>
                <input
                    type="radio"
                    name={name}
                    value="yes"
                    checked={selectedOption === 'yes'}
                    onChange={handleOptionChange}
                />
                <span className="yes-no-circle"></span>
                Yes
            </label>
            <label className={`yes-no ${selectedOption === 'no' ? 'selected' : ''}`}>
                <input
                    type="radio"
                    name={name}
                    value="no"
                    checked={selectedOption === 'no'}
                    onChange={handleOptionChange}
                />
                <span className="yes-no-circle"></span>
                No
            </label>
        </div>
    );
}

export default YesNo;


