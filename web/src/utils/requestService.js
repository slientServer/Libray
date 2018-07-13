/*
* @author Brian
*/
import axios from 'axios';
import { message } from 'antd';
import { Request_Error } from '../constants/message';

export const getService = ({url, failMsg, handler}) => {
  axios.get(url)
  .then((response) => {
    if(response.data.errno === 0){
      handler(response.data.data);
    }else{
      message.error(failMsg || response.data.errmsg || Request_Error);
    }
  })
  .catch((error) => {
    message.error(Request_Error);
  })
}

export const postService = ({url, failMsg, handler, data}) => {
  axios.post(url, data)
  .then((response) => {
    if(response.data.errno === 0){
      handler(response.data.data);
    }else{
      message.error(failMsg || response.data.errmsg || Request_Error);
    }
  })
  .catch((error) => {
    message.error(Request_Error);
  })
}

export const putService = () => {

}

export const deleteService = () => {

}