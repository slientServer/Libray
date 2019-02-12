import { CAPTCHA_VERIFIED, REFRESH_CAPTACHA } from '../../constants/actionTypes';
import { getService } from '../../utils/requestService';

export const verifiedAction = (data) => {
  return {
    type: CAPTCHA_VERIFIED,
    data: data
  };
}

export const requestCaptchaAction = (addCaptchaToDom) => {
  return dispatch => {
    getService({
      url: 'api/captcha?t=' + (new Date()).getTime(),
      dispatch: dispatch,
      handler: (data) => {
        if (data.data.isEnableCaptcha) {
          // 调用 initGeetest 进行初始化
          // 参数1：配置参数
          // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
          window.initGeetest({
            // 以下 4 个配置参数为必须，不能缺少
            gt: data.data.gt,
            challenge: data.data.challenge,
            offline: !data.data.success, // 表示用户后台检测极验服务器是否宕机
            new_captcha: data.data.new_captcha, // 用于宕机时表示是新验证码的宕机
            product: "popup", // 产品形式，包括：float，popup
            width: "100%"
          }, (captchaObj) => {addCaptchaToDom(captchaObj)}); 
        } else {
          addCaptchaToDom();
          dispatch({
            type: CAPTCHA_VERIFIED,
            data: {
              isEnableCaptcha: false
            }
          });
        }       
      }
    }); 
  } 
}

export const resetRefreshCaptachaAction = (data) => {
  return {
    type: REFRESH_CAPTACHA,
    data: false
  };
}
