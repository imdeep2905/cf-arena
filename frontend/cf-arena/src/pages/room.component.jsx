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
    <div className="room">
      <div className="timer">
        <h1>45:60</h1>
      </div>

      <div className="user">
        <img
          src={user[0].userpic}
          alt="user_one_image"
          height="150"
          width="150"
        />
        <h2>{user.username}</h2>
        <h2>Rating: {user.rating}</h2>
        <h2>score: {user.score}</h2>
        <button>Ready</button>
      </div>

      <div className="user">
        <img
          src={user[1].userpic}
          alt="user_one_image"
          height="150"
          width="150"
        />
        <h2>{user.username}</h2>
        <h2>Rating: {user.rating}</h2>
        <h2>score: {user.score}</h2>
        <button>Ready</button>
      </div>

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
