import React from 'react';
import { Form, Input, Icon, Cascader, Row, Col, Button } from 'antd';
import './index.css';
import { connect } from 'react-redux';
import { registerAction } from './action';
import Captcha from '../../components/captcha';
import sha256 from 'sha256';

const FormItem = Form.Item;

class Register extends React.Component {
  constructor () {
    super();
    this.state = {
      confirmDirty: false
    };
    this.residences = [];
    const areaList = ['A', 'B', 'C', 'D'];
    for (let idx = 1; idx <= 12; idx++) {
      let area = [];
      for (let num = 1; num <= 5; num++) {
        for (let idy = 0; idy < areaList.length; idy++) {
          area.push({
            value: areaList[idy] + num,
            label: areaList[idy] + num
          });
        }        
      }
      this.residences.push({
        value: 'PVG' + idx,
        label: 'PVG' + idx,
        children: area
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let finalData = Object.assign({}, values, {'password': sha256(values.password), 'confirm': sha256(values.confirm)}, this.props.captchaObj);
        this.props.dispatchRegister(finalData);
      }
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Row style={{height: "100%"}} type="flex" align="middle">
        <Col span={10} offset={6}>
          <span className="titleRow">
            <Icon type="book" style={{ fontSize: 25, color: '#08c' }}/> Welcome to <span className="title">Register</span>
          </span>
          <Form onSubmit={this.handleSubmit} className="borderShadow">
            <FormItem {...formItemLayout}
              label="User Name">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="username" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" placeholder="password"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Confirm Password"
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} placeholder="comfirm password"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout}
              label="Email">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!', type: 'email' }]
              })(
                <Input placeholder="email" />
              )}
            </FormItem>
            <FormItem {...formItemLayout}
              label="Employee Id">
              {getFieldDecorator('employeeid', {
                rules: [{ required: true, message: 'Please input your employee id!' }],
              })(
                <Input placeholder="employee id" />
              )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Location"
              >
                {getFieldDecorator('location', {
                  initialValue: ['PVG3', 'A3'],
                  rules: [{ type: 'array', required: true, message: 'Please select your location!' }],
                })(
                  <Cascader options={this.residences} />
                )}
            </FormItem>
            <FormItem {...formItemLayout}
              label="Team">
              {getFieldDecorator('team', {
                rules: [{ message: 'Please input your team!' }],
              })(
                <Input placeholder="team" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('captcha', {
                rules: [{ message: 'Please input your Password!' }],
              })(
               <Captcha/>
              )}
              <Button type="primary" htmlType="submit" className="register-form-button" loading={this.props.isFetching} disabled = {!this.props.isVerified}>
                Register
              </Button>
              Or <a href="/login">Login!</a>
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
    dispatchRegister: (value, history) => {
      dispatch(registerAction(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Register));