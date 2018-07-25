import { START_REQUEST, FINISH_REQUEST, REFRESH_CAPTACHA } from '../constants/actionTypes';

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
    case REFRESH_CAPTACHA:
      return Object.assign({}, state, {
        refreshCaptacha: action.data
      }); 
    default:
      return state;
  }
}

export default reducer;