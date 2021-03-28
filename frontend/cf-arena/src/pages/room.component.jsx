import { React } from "react";
import "./room.css";
import { connect } from 'react-redux';

const Room = ({handle1,handle2,score1,score2,profile_pic_url1,profile_pic_url2,rating1,rating2, waiting}) => {
  const user = [
    {
      username: handle1,
      userpic: 'https:'+profile_pic_url1,
      rating: rating1,
      score: score1,
    },
    {
      username: handle2,
      userpic: profile_pic_url2,
      rating: rating2,
      score: score2,
    },
  ];

  const problems = [100, 200, 300, 400, 500];

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
        <h2>{user[0].username}</h2>
        <h2>Rating: {user[0].rating}</h2>
        <h2>score: {user[0].score}</h2>
        <button>Ready</button>
      </div>

      <div className="user">
        <img
          src={user[1].userpic}
          alt="user_one_image"
          height="150"
          width="150"
        />
        <h2>{user[1].username}</h2>
        <h2>Rating: {user[1].rating}</h2>
        <h2>score: {user[1].score}</h2>
        <button>Ready</button>
      </div>

      <div className="problems">
        {problems.map((prob) => (
          <div className="problem" key={prob}>
            <div className="circle">Hello</div>
            <a href="a">{prob}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
  handle1: user.handle1,
  profile_pic_url1:user.userpic1,
  rating1: user.rating1,
  handle2: user.handle2,
  profile_pic_url2:user.userpic2,
  rating2: user.rating2,
  waiting: user.Waiting,
  score1: user.score1,
  score2: user.score2,
}};

export default connect(mapStateToProps, null)(Room);
