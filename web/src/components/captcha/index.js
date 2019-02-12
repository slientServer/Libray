/*
* @author Brian
*/
import React, { Component } from 'react';
import initGeetestReact from './gt';
import './style.css';
import { connect } from 'react-redux';
import { verifiedAction, requestCaptchaAction, resetRefreshCaptachaAction } from './action';
import { FormattedMessage } from 'react-intl';

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
    if (nextProps.refreshCaptacha && this.captchaObj) {
      this.captchaObj.reset();
      this.props.dispatchResetRefreshCaptachaAction();
    }
  }

  addCaptchaToDom = (captchaObj) => {
    if (captchaObj) {
      this.captchaObj = captchaObj;
      captchaObj.appendTo('#captcha');
      captchaObj.onReady(() => {
        this.setState({toggleClass: 'hidden'});
      });
      captchaObj.onSuccess(() => {
        this.props.dispatchVeriyfySuccess(captchaObj.getValidate());
      });
    } else {
      this.setState({toggleClass: 'hidden'});
    }
  }

  render () {
    return (
      <div id="captcha">
        <p className={this.state.toggleClass}><FormattedMessage id="captcha.loading"/></p>
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