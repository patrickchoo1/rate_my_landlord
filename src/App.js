import logo from './logo.svg';
import React from 'react';
import useState from 'react';
import './App.css';


function App() {
  return (

    <div class="image-wrapper">
      <div
          class = "image"
          style = {{
              filter: "blur(2px)", 
              backgroundImage:
              'url("https://eship.cornell.edu/wp-content/uploads/eHub-Collegetown.jpg")',
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
          }}>
        </div>
      </div>

  );
}

export default App;
