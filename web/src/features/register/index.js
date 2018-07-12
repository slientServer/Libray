import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import './index.css';
import { title } from '../../constants/config';
import { connect } from 'react-redux';
import actions from './action';

const FormItem = Form.Item;

class Register extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row style={{height: "70%"}} type="flex" align="middle">
        <Col span={8} offset={8}>
          <span className="titleRow">
            <Icon type="book" style={{ fontSize: 25, color: '#08c' }}/> Welcome to <span className="title">{title}</span>
          </span>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
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
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.isFetching}>
                Log in
              </Button>
              Or <a href="">register now!</a>
            </FormItem>
          </Form>          
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.commonReducer.isFetching || false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchLogin: (value, history) => {
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Register));