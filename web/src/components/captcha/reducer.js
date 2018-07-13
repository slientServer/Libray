import { CAPTCHA_VERIFIED } from '../../constants/actionTypes';

function reducer(state = [], action) {
  switch (action.type) {
    case CAPTCHA_VERIFIED:
      return Object.assign({}, state, {
        isVerified: true,
        captchaObj: action.data
      });
    default:
      return state;
  }
}

export default reducer;