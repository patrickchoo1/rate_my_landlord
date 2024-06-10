import React, { useState } from 'react';
import './HomePage.css';


function HomePage () {

    return (
        <section className = 'hero'>
        <div className = 'content'>
            <h1>Rate your landlords</h1>
            <p> Review your landlords. Rate their properties. </p>
            <div className = 'search-wrapper'>
            <input class = 'search' input type = 'text' placeholder = "Enter Landlord's Name"></input>
            </div>
        </div>
        </section>
    );
}

export default HomePage
  
  