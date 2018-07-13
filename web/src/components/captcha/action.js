import { CAPTCHA_VERIFIED } from '../../constants/actionTypes';

export const verifiedAction = (data) => {
  return {
    type: CAPTCHA_VERIFIED,
    data: data
  };
}
