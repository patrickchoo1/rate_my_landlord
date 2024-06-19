import React, { useState } from 'react';
import './YesNo.css';

function YesNo() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="yes-no-options">
            <label className={`yes-no ${selectedOption === 'yes' ? 'selected' : ''}`}>
                <input
                    type="radio"
                    name="yes-no"
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
                    name="yes-no"
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

