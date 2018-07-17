import { START_REQUEST, USERINFO_READY, FINISH_REQUEST} from '../../constants/actionTypes';
import { getService, putService } from '../../utils/requestService';
import { message } from 'antd';

export const requestInitAction = () => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    getService({
      url: '/api/common/user/' + (new Date()).getTime(),
      handler: (data) => {
        dispatch({
          type: USERINFO_READY,
          data: data
        });
      },
      redirect: '/login',
      dispatch: dispatch
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
      handler: (resData) => {
        message.success(resData);
        dispatch({
          type: FINISH_REQUEST
        })
      }
    });
  }
}