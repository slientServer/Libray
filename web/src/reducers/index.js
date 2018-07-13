import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import captchaReducer from '../components/captcha/reducer';

export default combineReducers({
  commonReducer,
  captchaReducer
});