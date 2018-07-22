import { START_REQUEST } from '../../constants/actionTypes';
import { getService } from '../../utils/requestService';
import { push } from 'connected-react-router';

export const logout = () => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    getService({
      url: '/auth/logout',
      handler: (res) => {
        if (res.errno === 0) {
          dispatch(push('/login'));
        }        
      }
    });
  }
}