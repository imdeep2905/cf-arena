import React from 'react';
import './homepage.css';

const homepage = () => {

return (
  <div>
      <h1>Awesome CP</h1>

      <span>CF handle:</span> <input name="handle" placeholder="enter username" /> <br/>
      <div className="buttons">
        <button>Create</button>
        <button>Join</button>    
      </div>
  </div>
  )
}

export default homepage;
