import { START_REQUEST, LOGIN_SUCCESSFULLY, REFRESH_CAPTACHA } from '../../constants/actionTypes';
import { postService } from '../../utils/requestService';
import { push } from 'connected-react-router';
import { message } from 'antd';

export const loginAction = (data) => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    postService({
      url: 'auth/login',
      data: data,
      dispatch: dispatch,
      handler: (res) => {
        if (res.errno === 0) {
          dispatch({
            type: LOGIN_SUCCESSFULLY,
            data: res.data.userInfo
          });
          window.localStorage.setItem('username', res.data.userInfo.username);
          window.localStorage.setItem('role', res.data.userInfo.role);
          dispatch(push('/admin'));
        } else {
          message.error(res.errmsg);
          dispatch({
            type: REFRESH_CAPTACHA,
            data: true
          });
        }
      }
    });
  }
}