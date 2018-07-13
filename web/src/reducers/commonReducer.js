import { START_REQUEST, FINISH_REQUEST, MESSAGE } from '../constants/actionTypes';

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
    default:
      return state;
  }
}

export default reducer;