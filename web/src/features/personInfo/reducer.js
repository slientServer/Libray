import { USERINFO_READY } from '../../constants/actionTypes';

function reducer(state = [], action) {
  switch (action.type) {
    case USERINFO_READY:
      return Object.assign({}, state, {
        userInfo: action.data
      }); 
    default:
      return state;
  }
}

export default reducer;