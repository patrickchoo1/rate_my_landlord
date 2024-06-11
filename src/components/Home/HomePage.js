import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';



function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate('/searchresults/${searchQuery}');
        }
    };

    return (
        <section className='hero'>
            <div className='content'>
                <h1>Rate My Landlords</h1>
                <p> Review your landlords. Rate their properties. </p>
                <form className='search-wrapper' onSubmit={handleSearch}>
                    <input class='search'
                        input type='text'
                        placeholder="Enter Landlord's Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}></input>
                </form>
            </div>
        </section >
    );
}

export default HomePage

