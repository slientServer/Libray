import { START_REQUEST } from '../../constants/actionTypes';
import { getService } from '../../utils/requestService';
import { push } from 'connected-react-router';

export const logout = ({failMsg}) => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    getService({
      url: '/auth/logout',
      dispatch: dispatch,
      failMsg: failMsg,
      handler: (res) => {
        if (res.errno === 0) {
          dispatch(push('/login'));
        }        
      }
    });
  }
}