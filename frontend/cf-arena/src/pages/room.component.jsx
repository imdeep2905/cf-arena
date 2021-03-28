import { React, useState, useEffect } from "react";
import "./room.css";
import { connect } from "react-redux";

const Room = ({
  handle1,
  handle2,
  score1,
  score2,
  profile_pic_url1,
  profile_pic_url2,
  rating1,
  rating2,
  waiting,
  roomId,
  problemsList,
}) => {
  const user = [
    {
      username: handle1,
      userpic: "https:" + profile_pic_url1,
      rating: rating1,
      score: score1,
    },
    {
      username: handle2,
      userpic: "https:" + profile_pic_url2,
      rating: rating2,
      score: score2,
    },
  ];
  const [room, setRoom] = useState(true);
  const [displayScore1, setDisplayScore1] = useState(0);
  const [displayScore2, setDisplayScore2] = useState(0);

  let currentUrl = window.location.href.split('/');
  roomId = currentUrl[currentUrl.length - 1];

  useEffect(() => {
    let myFunc = async function () {
      let socket = await new WebSocket("ws://localhost:8000/ws/test/");
      socket.onmessage = function (e) {
        if (e.data === "Connection established.") {
          let data = {
            roomId,
            problemsList,
          };
          socket.send(JSON.stringify(data));
        } else {
          let values = Object.values(JSON.parse(e.data));
          let newScore1 = 0, newScore2 = 0;
          for (let i = 0; i < 5; i++) {
            if (values[i] === handle1) {
              document.getElementById(`${i}`).style.background = "#33C854";              
              newScore1 += (i + 1) * 100;
            } else if (values[i] === handle2) {
              document.getElementById(`${i}`).style.background = "#fb6d6d";
              newScore2 += (i + 1) * 100;
            }
          }
          if(newScore1 > 750){
            alert(`Hurray!! The winner is ${handle1}`);
          }
          if(newScore2 > 750){
            alert(`Hurray!! The winner is ${handle2}`);
          }
          setDisplayScore1(newScore1);
          setDisplayScore2(newScore2);
        }
      };
    };
    myFunc();
  }, [room]);

  console.log(user);
  const problems = [100, 200, 300, 400, 500];
  const problemType = ["A", "B", "C", "D", "E"];
  let user2 = !waiting ? (
    <div className="user">
      <img
        src={user[1].userpic}
        alt="user_one_image"
        height="150"
        width="150"
      />
      <h2 className="user2">{user[1].username}</h2>
      <h3 className="whiteText">({user[1].rating})</h3>
      <h1 className="user2">{displayScore2}</h1>
      <button class="button button-dark">Ready</button>
    </div>
  ) : (
    <div className="user">
      <img
        src={
          "https://thumbs.dreamstime.com/b/blank-man-profile-head-icon-avatar-blank-man-profile-head-icon-avatar-social-media-websites-208480728.jpg"
        }
        alt="user_one_image"
        height="150"
        width="150"
      />
      <h2 className="user2">waiting for opponent</h2>
      <h3 className="whiteText"> ? </h3>
      <h1 className="user2">0</h1>
      <button class="button button-dark">Ready</button>
    </div>
  );
  return (
    <div className="room">
      <div className="user">
        <img
          src={user[0].userpic}
          alt="user_one_image"
          height="150"
          width="150"
        />
        <h2 className="user1">{user[0].username}</h2>
        <h3 className="whiteText">({user[0].rating})</h3>
        <h1 className="user1">{displayScore1}</h1>
        <button class="button button-dark">Ready</button>
      </div>
      <div className="centerDiv">
        <div className="arenaMode">Codeforces (1v1)</div>
        <br />
        <h5 className="whiteText">Room Code</h5>
        <div className="roomCode">{roomId}</div>
        <br />
        <div className="timer">
          <h1></h1>
        </div>
      </div>
      {user2}

      <div className="problems">
        {problems.map((value, index) => (
          <div className="problem" key={value}>
            <div id={index} className="circle">
              <p>{problemType[index]}</p>
            </div>
            {/* Add text color to be green and red to show winner of the question */}
            <h3 className="problemPointsWidth whiteText">
              <a href={problemsList[index]}>{value}</a>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    handle1: user.handle1,
    profile_pic_url1: user.userpic1,
    rating1: user.rating1,
    handle2: user.handle2,
    profile_pic_url2: user.userpic2,
    rating2: user.rating2,
    waiting: user.Waiting,
    score1: user.score1,
    score2: user.score2,
    roomId: user.roomId,
    problemsList: user.problems,
  };
};

export default connect(mapStateToProps, null)(Room);
