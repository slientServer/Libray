import { LOGIN_SUCCESSFULLY } from '../../constants/actionTypes';

function reducer(state = [], action) {
  switch (action.type) {
    case LOGIN_SUCCESSFULLY:
      return Object.assign({}, state, {
        userInfo: action.data
      });  
    default:
      return state;
  }
}

export default reducer;