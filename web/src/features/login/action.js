import { START_REQUEST, LOGIN_SUCCESSFULLY } from '../../constants/actionTypes';
import { postService } from '../../utils/requestService';
import { push } from 'connected-react-router'

export const loginAction = (data) => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    postService({
      url: 'auth/login',
      data: data,
      handler: (data) => {
        dispatch({
          type: LOGIN_SUCCESSFULLY,
          data: data.userInfo
        });
        dispatch(push('/' + data.userInfo.role));
      }
    });
  }
}