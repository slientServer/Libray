/*
* @author Brian
*/
import React, { Component } from 'react';
import initGeetestReact from './gt';
import { getService } from '../../utils/requestService';
import './index.css';
import { connect } from 'react-redux';
import { verifiedAction } from './action';

class Captcha extends Component {

  constructor () {
    super();
    this.state = {'toggleClass': 'display'};
  }

  componentDidMount () {

    initGeetestReact();
    getService({
      url: 'api/captcha?t=' + (new Date()).getTime(),
      handler: (data) => {
        // 调用 initGeetest 进行初始化
        // 参数1：配置参数
        // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
        window.initGeetest({
          // 以下 4 个配置参数为必须，不能缺少
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success, // 表示用户后台检测极验服务器是否宕机
          new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机

          product: "popup", // 产品形式，包括：float，popup
          width: "100%"
        }, (captchaObj) => {this.addCaptchaToDom(captchaObj)});        
      }
    });
  }

  addCaptchaToDom (captchaObj) {
    captchaObj.appendTo('#captcha');
    captchaObj.onReady(() => {
      this.setState({toggleClass: 'hidden'});
    });
    captchaObj.onSuccess(() => {
      this.props.dispatchVeriyfySuccess(captchaObj.getValidate());
    });
  }

  render () {
    return (
      <div id="captcha">
        <p className={this.state.toggleClass}>Captcha Loading...</p>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchVeriyfySuccess: (data) => {
      dispatch(verifiedAction(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Captcha);