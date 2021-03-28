import { React, useState } from "react";
import './homepage.css';
import { connect } from 'react-redux';
import { setCurrentUser, setSecondUser, setRoomId }from '../redux/user/action';
import axios from 'axios';

const Homepage = (props) => {

  const [ handle, setHandle ] = useState('');
  let [ roomId, setroomId ] = useState(0);
  const [joinInput, setJoinInput] = useState('');

  const goToRoom = () => {
    const fetchRoom = async () => {
      const url = `http://127.0.0.1:8000/arena/verify_user?cf_handle=${handle}`;
      const user = await axios.get(url);
      const status = user["data"]["status"];
      if(status === 'OK'){
        let x = await axios.post(`http://127.0.0.1:8000/arena/create_room/`,{
          cf_handle: handle,
        })
        roomId = x["data"]["room_id"];
        setroomId(roomId);
        let payload = {};
        payload['handle']=handle;
        payload['profile_pic_url'] = user["data"]['profile_pic_url']
        payload['rating'] = user["data"]['rating']
        props.setCurrentUser(payload);
        props.history.push(`room/${roomId}`)
      }
      }
      fetchRoom();
    };
    const joinRoom = () => {
      const fetchRoom = async () => {
        const url = `http://127.0.0.1:8000/arena/verify_user?cf_handle=${handle}`;
        const user = await axios.get(url);
        const status = user["data"]["status"];
        if(status === 'OK'){
          let x = await axios.put(`http://127.0.0.1:8000/arena/join_room/`,{
            cf_handle: handle,
            room_id: parseInt(joinInput),
          })
          if(x["data"]["status"]==='OK'){
            roomId = parseInt(joinInput)
            setroomId(roomId);
            props.setRoomId(roomId);
            let user2=x["data"]["user1"]
            const firstUser = `http://127.0.0.1:8000/arena/verify_user?cf_handle=${user2}`;
            const firstUserDetail = await axios.get(firstUser);
            props.setCurrentUser({
              'handle': x["data"]["user1"],
              'profile_pic_url': firstUserDetail["data"]['profile_pic_url'],
              'rating': firstUserDetail["data"]["rating"]
            })
          }
          
          let payload = {};
          payload['handle']=handle;
          payload['profile_pic_url'] = user["data"]['profile_pic_url']
          payload['rating'] = user["data"]['rating']
          props.setSecondUser(payload);
          props.history.push(`room/${roomId}`)
        }
        const data = user["data"];
        console.log(data);
        }
        fetchRoom();
      };

  const handleChange = (event) => {
    setHandle(event.target.value);
  };
  const handleChangeJoin = (event) => {
    setJoinInput(event.target.value);
  };

return (
 <div>
    <div class="main">
      <h1>CP-Arena</h1>
      <div class="form">
        <input
          class="text_input"
          name="handle"
          placeholder="Codeforces handle"
          onChange={handleChange}
          value={handle}
        />{" "}
        <input
          class="text_input"
          name="roomCode"
          placeholder="Enter room Code"
          onChange={handleChangeJoin}
          value={joinInput}/>
        <div className="buttons">
          <button onClick={goToRoom} class="button button-dark">Create</button> 
          <button onClick={joinRoom} class="button button-dark">Join</button>    
        </div>
      </div>
    </div>
    <div class="rules">
        <h2>Rules</h2>
        <h3>1. For healthy competition you can turn off "Show tags for unsolved problems" in your codeforces settings.</h3>
        <h3>2. There will be five problem which is not been attempted by either of the participants.</h3>
        <h3>3. Each problem carries points associated with it (for e.x. 100, 200, etc..). First person to submit any problem gets the points.</h3>
        <h3>4. Once the points are claimed those problem's points can't be claimed by another particiapnt. So, you better hurry up.</h3>
        <p>There are 1500 points total, so the first person to get 800 or more points will be the winner. What strategies would you try? Start with A and B, then jump to E if you get them both? Or start with E, and try to win outright with either C or D afterwards? Read all the problems first and then choose a strategy based on what your opponent solves first? </p>
    </div>
  </div>
  )
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setSecondUser: (user) => dispatch(setSecondUser(user)),
  setRoomId: (roomId) => dispatch(setRoomId(roomId)),
});

export default connect(null, mapDispatchToProps)(Homepage);
