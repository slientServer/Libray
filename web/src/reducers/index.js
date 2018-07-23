import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import captchaReducer from '../components/captcha/reducer';
import loginReducer from '../features/login/reducer';
import registerReducer from '../features/register/reducer';
import personInfoReducer from '../features/personInfo/reducer';

export default combineReducers({
  commonReducer,
  captchaReducer,
  loginReducer,
  registerReducer,
  personInfoReducer
});