/*
* @author Brian
*/
import axios from 'axios';
import { message } from 'antd';
import { Request_Error } from '../constants/message';

export const getService = ({url, failMsg, handler, errHandler}) => {
  axios.get(url)
  .then((response) => {
    handler(response.data);
  })
  .catch((error) => {
    if (errHandler) {
      errHandler(error);
    } else {
      message.error(failMsg || Request_Error);     
    }
  })
}

export const postService = ({url, failMsg, handler, data, errHandler}) => {
  axios.post(url, data)
  .then((response) => {
    handler(response.data);
  })
  .catch((error) => {
    if (errHandler) {
      errHandler(error);
    } else {
      message.error(failMsg || Request_Error);     
    }
  })
}

export const putService = ({url, failMsg, handler, data, errHandler}) => {
  axios.put(url, data)
  .then((response) => {
    handler(response.data);
  })
  .catch((error) => {
    if (errHandler) {
      errHandler(error);
    } else {
      message.error(failMsg || Request_Error);     
    }
  })
}

export const deleteService = ({url, failMsg, handler, errHandler}) => {
  axios.delete(url)
  .then((response) => {
    handler(response.data);
  })
  .catch((error) => {
    if (errHandler) {
      errHandler(error);
    } else {
      message.error(failMsg || Request_Error);     
    }
  })
}