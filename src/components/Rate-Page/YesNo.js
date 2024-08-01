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
            <label className={`yes-no ${selectedOption === 'Yes' ? 'selected' : ''}`}>
                <input
                    type="radio"
                    name={name}
                    value="Yes"
                    checked={selectedOption === 'Yes'}
                    onChange={handleOptionChange}
                />
                <span className="yes-no-circle"></span>
                Yes
            </label>
            <label className={`yes-no ${selectedOption === 'No ' ? 'selected' : ''}`}>
                <input
                    type="radio"
                    name={name}
                    value="No "
                    checked={selectedOption === 'No '}
                    onChange={handleOptionChange}
                />
                <span className="yes-no-circle"></span>
                No
            </label>
        </div>
    );
}

export default YesNo;