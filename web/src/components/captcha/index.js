/*
* @author Brian
*/
import React, { Component } from 'react';
import './index.css';
import initGeetest from './gt';
import getService from '../../utils/requestService'

class Captcha extends Component {

  componentDidMount () {
    initGeetest();
    getService({
      url: 'api/captcha?t=' + (new Date()).getTime(),
      handler: () => {
        
      }
    });
  }

  render () {
    return (
      <div id="captcha">
        <p id="wait" class="show">正在加载验证码......</p>
      </div>
    );
  }

}