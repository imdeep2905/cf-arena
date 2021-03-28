export const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  payload: user
});

export const setSecondUser = user => ({
  type: 'SET_SECOND_USER',
  payload: user
});

export const setWaiting = wait => ({
  type: 'SET_WAITING',
  payload: wait
});

export const setRoomId = roomId => ({
  type: 'SET_ROOM_ID',
  payload: roomId
});

export const setProblemList = problemList => ({
  type: 'SET_PROBLEM_LIST',
  payload: problemList
});
