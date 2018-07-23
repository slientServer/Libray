import { START_REQUEST, FINISH_REQUEST} from '../../constants/actionTypes';
import { putService } from '../../utils/requestService';
import { message } from 'antd';

export const udpatePasswordAction = (data) => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    putService({
      url: '/api/common/user',
      data: data,
      dispatch: dispatch,
      handler: (resData) => {
        message.success(resData);
        dispatch({
          type: FINISH_REQUEST
        })
      }
    });
  }
}