import logo from './logo.svg';
import React from 'react';
import useState from 'react';
import './Home.css';

function Home() {
    return (
        <section className='hero'>
            <div className='content'>
                <h1>Rate your landlords</h1>
                <p>
                    Review your landlords. Rate their properties.
                </p>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search..."
                    />
                </div>
            </div>
        </section>
    );
}

export default Home;