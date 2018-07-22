import { START_REQUEST, USERINFO_READY, FINISH_REQUEST} from '../../constants/actionTypes';
import { getService, putService } from '../../utils/requestService';
import { message } from 'antd';
import { push } from 'connected-react-router';

export const requestInitAction = () => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    getService({
      url: '/api/common/user/' + (new Date()).getTime(),
      handler: (res) => {
        if (res.errno === 0) {
          dispatch({
            type: USERINFO_READY,
            data: res.data
          });
          window.localStorage.setItem('username', res.data.username);
        } else {
          dispatch(push('/login'));
        }
      }
    });
  }
}

export const udpatePersonalAction = (data) => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    putService({
      url: '/api/common/user',
      data: data,
      handler: (res) => {
        if (res.errno === 0) {
          message.success(res.errmsg);
          dispatch({
            type: FINISH_REQUEST
          })
        } else {
          message.error('Data update failed!');
        }
      }
    });
  }
}