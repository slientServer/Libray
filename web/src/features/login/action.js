import { START_REQUEST, FINISH_REQUEST} from '../../constants/actionTypes';
import { postService } from '../../utils/requestService';

export const loginAction = (data) => {
  return dispatch => {
    postService({
      url: 'auth/login',
      data: data,
      handler: () => {

      }
    });
  }
}