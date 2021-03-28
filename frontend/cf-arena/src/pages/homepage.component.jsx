import { React, useState } from "react";
import './homepage.css';
import { connect } from 'react-redux';
import { setCurrentUser }from '../redux/user/action';
import axios from 'axios';

const Homepage = (props) => {

  const [ handle, setHandle ] = useState('');
  let [ roomId, setroomId ] = useState('');

  const goToRoom = () => {
    const fetchRoom = async () => {
      const url = `http://127.0.0.1:8000/arena/verify_user?cf_handle=${handle}`;
      const user = await axios.get(url);
      const status = user["data"]["status"];
      if(status === 'OK'){
        // roomId = await axios.get(`http://127.0.0.1:8000/arena/get_room?cf_handle=${handle}`);
        roomId = 'abcd';
        let payload = {};
        payload['handle']=handle;
        payload['profile_pic_url'] = user["data"]['profile_pic_url']
        payload['rating'] = user["data"]['rating']
        props.setCurrentUser(payload);
        setroomId(roomId);
        props.history.push(`room/${roomId}`)
      }
      const data = user["data"];
      console.log(data);
      }
      fetchRoom();
    };

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
          <button onClick={goToRoom} class="button button-dark">Create</button> 
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
