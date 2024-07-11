import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log(`Navigating to /searchresults/${encodeURIComponent(searchQuery)}`);
            navigate(`/searchresults/${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <section className='hero'>
            <div className='content'>
                <h1>Rate My Landlords</h1>
                <p> Review your landlords. Rate their properties. </p>
                <form className='search-wrapper' onSubmit={handleSearch}>
                    <input className='search'
                        type='text'
                        placeholder="Enter Landlord's Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            </div>
        </section>
    );
}

export default HomePage;
