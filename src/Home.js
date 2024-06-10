import logo from './logo.svg';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate('/landlord/${searchQuery}');
        }
    };
    return (
        <section className='hero'>
            <div className='content'>
                <h1>Rate My Landlord</h1>
                <p>
                    Review your landlords. Rate their properties.
                </p>
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for a landlord..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            </div>
        </section>
    );
}

export default Home;