import { START_REQUEST, FINISH_REQUEST} from '../../constants/actionTypes';
import { postService } from '../../utils/requestService';

export const loginAction = (data) => {
  return dispatch => {
    dispatch({
      type: START_REQUEST
    });
    postService({
      url: 'auth/login',
      data: data,
      handler: () => {

      }
    });
  }
}