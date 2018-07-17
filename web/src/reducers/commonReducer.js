import { START_REQUEST, FINISH_REQUEST, LOGIN_SUCCESSFULLY, USERINFO_READY } from '../constants/actionTypes';

function reducer(state = [], action) {
  switch (action.type) {
    case START_REQUEST:
      return Object.assign({}, state, {
        fetching: true
      });
    case FINISH_REQUEST:
      return Object.assign({}, state, {
        fetching: false
      });
    case LOGIN_SUCCESSFULLY:
      return Object.assign({}, state, {
        userInfo: action.data
      });
    case USERINFO_READY:
      return Object.assign({}, state, {
        userInfo: action.data
      });    
    default:
      return state;
  }
}

export default reducer;