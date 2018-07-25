import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import './index.css';
import { connect } from 'react-redux';
import { loginAction } from './action';
import Captcha from '../../components/captcha';
import sha256 from 'sha256';
import { FormattedMessage, injectIntl } from 'react-intl';

const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let finalData = Object.assign({}, values, {'password': sha256(values.password)}, this.props.captchaObj);
        this.props.dispatchLogin(finalData);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row style={{height: "70%"}} type="flex" align="middle">
        <Col span={8} offset={8}>
          <span className="titleRow">
            <Icon type="book" style={{ fontSize: 25, color: '#08c' }}/> <FormattedMessage id="login.welcome"/> <span className="title"><FormattedMessage id="system.title"/></span>
          </span>
          <Form onSubmit={this.handleSubmit} className="borderShadow">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: this.props.intl.formatMessage({id: 'login.required.username'})}],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({id: 'common.Username'})} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: this.props.intl.formatMessage({id: 'login.required.password'})}],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={this.props.intl.formatMessage({id: 'common.Password'})} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('captcha', {
                rules: [],
              })(
               <Captcha/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>{this.props.intl.formatMessage({id: 'login.Remember'})}</Checkbox>
              )}
              <a className="login-form-forgot" href=""><FormattedMessage id="login.Forget.password"/></a>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.isFetching} disabled = {!this.props.isVerified}>
                <FormattedMessage id="login.Login"/>
              </Button>
              <FormattedMessage id="common.Or"/> <a href="/register"><FormattedMessage id="login.Register"/></a>
            </FormItem>
          </Form>          
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.commonReducer.isFetching || false,
    isVerified: state.captchaReducer.isVerified || false,
    captchaObj: state.captchaReducer.captchaObj || {}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchLogin: (value) => {
      dispatch(loginAction(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(Login)));