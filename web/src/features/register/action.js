import { START_REQUEST, LOGIN_SUCCESSFULLY } from '../../constants/actionTypes';
import { postService } from '../../utils/requestService';
import { message } from 'antd';
import { push } from 'connected-react-router';

export const registerAction = (data) => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    postService({
      url: 'auth/register',
      data: data,
      handler: (data) => {
        message.success(data.msg);
        dispatch({
          type: LOGIN_SUCCESSFULLY,
          data: data.userInfo
        });
        dispatch(push('/' + data.userInfo.role));
      }
    });
  }
}