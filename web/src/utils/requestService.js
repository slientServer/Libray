/*
* @author Brian
*/
import axios from 'axios';
import { message } from 'antd';
import { Request_Error } from '../constants/message';
import { push } from 'connected-react-router';

export const getService = ({url, failMsg, handler, redirect, dispatch}) => {
  axios.get(url)
  .then((response) => {
    if(response.data.errno === 0){
      handler(response.data.data);
    }else{
      message.error(failMsg || response.data.errmsg || Request_Error);
      if (redirect && dispatch) {
        dispatch(push(redirect));
      }
    }
  })
  .catch((error) => {
    message.error(Request_Error);
    if (redirect && dispatch) {
      dispatch(push(redirect));
    }
  })
}

export const postService = ({url, failMsg, handler, data, redirect, dispatch}) => {
  axios.post(url, data)
  .then((response) => {
    if(response.data.errno === 0){
      handler(response.data.data);
    }else{
      message.error(failMsg || response.data.errmsg || Request_Error);
      if (redirect && dispatch) {
        dispatch(push(redirect));
      }
    }
  })
  .catch((error) => {
    message.error(Request_Error);
    if (redirect && dispatch) {
      dispatch(push(redirect));
    }
  })
}

export const putService = ({url, failMsg, handler, data, redirect, dispatch}) => {
  axios.put(url, data)
  .then((response) => {
    if(response.data.errno === 0){
      handler(response.data.data);
    }else{
      message.error(failMsg || response.data.errmsg || Request_Error);
      if (redirect && dispatch) {
        dispatch(push(redirect));
      }
    }
  })
  .catch((error) => {
    message.error(Request_Error);
    if (redirect && dispatch) {
      dispatch(push(redirect));
    }
  })
}

export const deleteService = () => {

}