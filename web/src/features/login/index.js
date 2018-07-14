import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import './index.css';
import { title } from '../../constants/config';
import { connect } from 'react-redux';
import { loginAction } from './action';
import Captcha from '../../components/captcha';
import sha256 from 'sha256';

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
        <Col span={10} offset={6}>
          <span className="titleRow">
            <Icon type="book" style={{ fontSize: 25, color: '#08c' }}/> Welcome to <span className="title">{title}</span>
          </span>
          <Form onSubmit={this.handleSubmit} className="borderShadow">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('captcha', {
                rules: [{ message: 'Please input your Password!' }],
              })(
               <Captcha/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.isFetching} disabled = {!this.props.isVerified}>
                Log in
              </Button>
              Or <a href="/register">Register now!</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));