const INITIAL_STATE = {
  handle1: '',
  userpic1: '',
  rating1: 0,
  score1: 0,
  handle2: '',
  Waiting: true,
  userpic2: '',
  rating2: 0,
  score2: 0,
  roomId: null,
  problems: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_CURRENT_USER': {
      console.log('hello')
      console.log(action.payload)
      return {
        ...state,
        handle1: action.payload.handle,
        userpic1: action.payload.profile_pic_url,
        rating1: action.payload.rating
      };
    }
    case 'SET_SECOND_USER': {
      return {
        ...state,
        Waiting: false,
        handle2: action.payload.handle,
        userpic2: action.payload.profile_pic_url,
        rating2: action.payload.rating
      }
    }
    case 'SET_ROOM_ID': {
      return {
        ...state,
        roomId: action.payload,
      }
    }
    case 'SET_PROBLEM_LIST': {
      return {
        ...state,
        problems: action.payload,
      }
    }
    default:
      return state;
  }
};

export default userReducer;
