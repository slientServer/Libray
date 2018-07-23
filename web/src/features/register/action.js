import { START_REQUEST, LOGIN_SUCCESSFULLY, REFRESH_CAPTACHA } from '../../constants/actionTypes';
import { postService } from '../../utils/requestService';
import { push } from 'connected-react-router';
import { message } from 'antd';

export const registerAction = (data) => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    postService({
      url: 'auth/register',
      data: data,
      dispatch: dispatch,
      handler: (res) => {
        if (res.errno === 0) {
          dispatch({
            type: LOGIN_SUCCESSFULLY,
            data: res.data.userInfo
          });
          dispatch(push('/' + res.data.userInfo.role));
          window.localStorage.setItem('username', res.data.userInfo.username);         
        } else {
          message.error(res.errmsg || 'Register failed!');
          dispatch({
            type: REFRESH_CAPTACHA,
            data: true
          });
        }
      }
    });
  }
}