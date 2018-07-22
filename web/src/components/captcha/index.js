/*
* @author Brian
*/
import React, { Component } from 'react';
import initGeetestReact from './gt';
import './index.css';
import { connect } from 'react-redux';
import { verifiedAction, requestCaptchaAction, resetRefreshCaptachaAction } from './action';

class Captcha extends Component {

  constructor () {
    super();
    this.state = {'toggleClass': 'display'};
  }

  componentDidMount () {
    initGeetestReact();
    this.props.dispatchRequestCaptchaAction(this.addCaptchaToDom);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.refreshCaptacha) {
      this.captchaObj.reset();
      this.props.dispatchResetRefreshCaptachaAction();
    }
  }

  addCaptchaToDom = (captchaObj) => {
    this.captchaObj = captchaObj;
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
  return {
    refreshCaptacha: state.commonReducer.refreshCaptacha || false,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchVeriyfySuccess: (data) => {
      dispatch(verifiedAction(data));
    },
    dispatchRequestCaptchaAction: (addCaptchaToDom) => {
      dispatch(requestCaptchaAction(addCaptchaToDom));
    },
    dispatchResetRefreshCaptachaAction: () => {
      dispatch(resetRefreshCaptachaAction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Captcha);