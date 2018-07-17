import { START_REQUEST } from '../../constants/actionTypes';
import { getService } from '../../utils/requestService';
import { message } from 'antd';
import { push } from 'connected-react-router';

export const logout = () => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    getService({
      url: '/auth/logout',
      handler: (data) => {
        message.success(data.msg);
        dispatch(push('/login'));
      }
    });
  }
}