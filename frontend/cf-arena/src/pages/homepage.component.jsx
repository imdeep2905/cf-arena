import { Link } from 'react-router-dom';
import React from 'react';
import './homepage.css';
import { connect } from 'react-redux';

const Homepage = () => {

return (
  <div class="main">
      <h1>CP-Arena</h1>
      <div class="form">
        <input class="text_input" name="handle" placeholder="Codeforces handle" /> <br/>
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
