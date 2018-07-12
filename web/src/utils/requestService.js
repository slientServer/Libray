/*
* @author Brian
*/
import axios from 'axios';
import { Request_Error } from '../constants/message';

export async getService ({url, failMsg, handler}) {
  axios.get(url)
  .then((response) => {
    if(response){
      handler(response);
    }else{
      message.error(failMsg);
    }
  })
  .catch((error) => {
    message.error(Request_Error);
  })
}

export async postService () {

}

export async putService () {

}

export async deleteService () {

}