const INITIAL_STATE = {
  handle: 'lalal'
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER': {
      console.log('hello')
      return {
        ...state,
        handle: action.payload
      };
    }
    default:
      return state;
  }
};

export default userReducer;
