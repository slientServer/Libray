import { START_REQUEST, REFRESH_CAPTACHA } from '../../constants/actionTypes';
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
          dispatch(push('/login'));
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