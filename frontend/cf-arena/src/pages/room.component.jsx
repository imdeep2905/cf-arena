import React from 'react';
import './room.css';
import handle1 from '../deepraval.png';
import handle2 from '../iamprayush.jpeg';

const room = () => {

  const user = [
    {
      "username": "iamprayush",
      "userpic": handle1,
      "rating": 1100,
      "score": 0
    },
    {
      "username": "deep",
      "userpic": handle2,
      "rating": 1200,
      "score": 0
    }
  ]

  const problems = [100, 200, 300, 400, 500];

  return (
    <div className='room'>
      <div className='timer'>
        <h1>45:60</h1>
      </div>
        <div className="user">
            <img src={user[0].userpic} alt="user_one_image" height="150" width="150" />
            <h2>{user.username}</h2>
            <h2>Rating: {user.rating}</h2>
            <h2>score: {user.score}</h2>
            <button>Ready</button>
          </div>

          <div className="user">
            <img src={user[1].userpic} alt="user_one_image" height="150" width="150" />
            <h2>{user.username}</h2>
            <h2>Rating: {user.rating}</h2>
            <h2>score: {user.score}</h2>
            <button>Ready</button>
          </div>

      <div className="problems">
        {
          problems.map(prob => (
            <div className="problem">
              <div className="circle">Hello</div>
              <a href="a" >{prob}</a>
            </div>
          ))}</div>

    </div>
  )
}

export default room;
