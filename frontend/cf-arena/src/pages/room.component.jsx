import { React, useEffect } from "react";
import "./room.css";
import handle1 from "../deepraval.png";
import handle2 from "../iamprayush.jpeg";
import axios from 'axios';
import { connect } from 'react-redux';

const Room = ({currentUser}) => {
  const user = [
    {
      username: "iamprayush",
      userpic: handle1,
      rating: 1100,
      score: 0,
    },
    {
      username: "deep",
      userpic: handle2,
      rating: 1200,
      score: 0,
    },
  ];

  const problems = [100, 200, 300, 400, 500];
  const problemType = ['A', 'B', 'C', 'D', 'E'];

  useEffect(() => {
    const fetchUser = async () => {
      const config = {};
      const url = `http://127.0.0.1:8000/arena/verify_user?cf_handle=${currentUser}`;
      try {
        console.log(currentUser);
        const user = await axios.get(url, config);
        console.log(user);
        const data = await user.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='room'>
      <div className="user">
        <img src={user[0].userpic} alt="user_one_image" height="150" width="150" />
        <h2 className="user1">{user[0].username}</h2>
        <h3 className="whiteText">({user[0].rating})</h3>
        <h1 className="user1">{user[0].score}</h1>
        <button class="button button-dark">Ready</button>
      </div>
      <div className="centerDiv">
      <div className="arenaMode">Codeforces (1v1)</div><br/>
      <h5 className="whiteText">Room Code</h5>
      <div className="roomCode">4869</div><br/>
      <div className='timer'>
        <h1>45:60</h1>
      </div>
      </div>
      <div className="user">
        <img src={user[1].userpic} alt="user_one_image" height="150" width="150" />
        <h2 className="user2">{user[1].username}</h2>
        <h3 className="whiteText">({user[1].rating})</h3>
        <h1 className="user2">{user[1].score}</h1>
        <button class="button button-dark">Ready</button>
      </div>

      <div className="problems">
        {
          problems.map((value, index) => (
            <div className="problem">
              <div className="circle">{problemType[index]}</div>
               {/* Add text color to be green and red to show winner of the question */}
              <h3 className="problemPointsWidth whiteText">{value}</h3>
            </div>
          ))}</div>

      <div className="problems">
        {problems.map((prob) => (
          <div className="problem">
            <div className="circle">Hello</div>
            <a href="a">{prob}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.handle,
});

export default connect(mapStateToProps, null)(Room);
