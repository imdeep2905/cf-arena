import { Link } from 'react-router-dom';
import { React, useState } from "react";
import './homepage.css';
import { connect } from 'react-redux';
import setCurrentUser from '../redux/user/action';

const Homepage = () => {

  const [ handle, setHandle ] = useState('');

  const goToRoom = () => {
    setCurrentUser(handle);
  }

  const handleChange = (event) => {
    setHandle(event.target.value);
  }

return (
  <div class="main">
      <h1>CP-Arena</h1>
      <div class="form">
        <input class="text_input" 
        name="handle" 
        placeholder="Codeforces handle" 
        onChange={handleChange} 
        value={handle} /> <br/>
        <div className="buttons">
            <Link to='/room'>
              <button onClick={goToRoom} class="button button-dark">Create</button> 
            </Link>
            <button class="button button-dark">Join</button>    
        </div>
      </div>
  </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(Homepage);
