/*
* @author Brian
*/
import axios from 'axios';
import { message } from 'antd';
import { push } from 'connected-react-router';

export const getService = ({url, failMsg, handler, errHandler, dispatch}) => {
  axios.get(url)
  .then((response) => {
    if (response.data.errno === 401) {
      dispatch(push('/login'));
      return false;
    }
    handler(response.data);
  })
  .catch((error) => {
    if (errHandler) {
      errHandler(error);
    } else {
      message.error(failMsg);     
    }
  })
}

export const postService = ({url, failMsg, handler, data, errHandler, dispatch}) => {
  axios.post(url, data)
  .then((response) => {
    if (response.data.errno === 401) {
      dispatch(push('/login'));
      return false;
    }
    handler(response.data);
  })
  .catch((error) => {
    if (errHandler) {
      errHandler(error);
    } else {
      message.error(failMsg);     
    }
  })
}

export const putService = ({url, failMsg, handler, data, errHandler, dispatch}) => {
  axios.put(url, data)
  .then((response) => {
    if (response.data.errno === 401) {
      dispatch(push('/login'));
      return false;
    }
    handler(response.data);
  })
  .catch((error) => {
    if (errHandler) {
      errHandler(error);
    } else {
      message.error(failMsg);     
    }
  })
}

export const deleteService = ({url, failMsg, handler, errHandler, dispatch}) => {
  axios.delete(url)
  .then((response) => {
    if (response.data.errno === 401) {
      dispatch(push('/login'));
      return false;
    }
    handler(response.data);
  })
  .catch((error) => {
    if (errHandler) {
      errHandler(error);
    } else {
      message.error(failMsg);     
    }
  })
}