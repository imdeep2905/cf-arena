import React from 'react';
import './homepage.css';

const homepage = () => {

return (
  <div class="main">
      <h1>CP-Arena</h1>
      <div class="form">
        <input class="text_input" name="handle" placeholder="Codeforces handle" /> <br/>
        <div className="buttons">
            <button class="button button-dark">Create</button>
            <button class="button button-dark">Join</button>    
        </div>
      </div>
  </div>
  )
}

export default homepage;