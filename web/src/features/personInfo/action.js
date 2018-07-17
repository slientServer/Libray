import { START_REQUEST, USERINFO_READY} from '../../constants/actionTypes';
import { getService } from '../../utils/requestService';
import { message } from 'antd';

export const requestInitAction = () => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    getService({
      url: '/api/common/user/' + (new Date()).getTime(),
      handler: (data) => {
        message.success(data.msg);
        dispatch({
          type: USERINFO_READY,
          data: data.userInfo
        });
      },
      redirect: '/login',
      dispatch: dispatch
    });
  }
}