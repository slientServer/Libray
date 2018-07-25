import React from 'react';
import { Form, Input, Icon, Cascader, Row, Col, Button } from 'antd';
import './index.css';
import { connect } from 'react-redux';
import { registerAction } from './action';
import Captcha from '../../components/captcha';
import sha256 from 'sha256';
import { FormattedMessage, injectIntl } from 'react-intl';

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
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };
    return (
      <Row style={{height: "100%"}} type="flex" align="middle">
        <Col span={10} offset={7}>
          <span className="titleRow">
            <Icon type="book" style={{ fontSize: 25, color: '#08c' }}/> <span className="title"><FormattedMessage id="register.Register"/></span>
          </span>
          <Form onSubmit={this.handleSubmit} className="borderShadow">
            <FormItem {...formItemLayout} label={this.props.intl.formatMessage({id: 'common.Username'})}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: this.props.intl.formatMessage({id: 'login.required.username'}) }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({id: 'common.Username'})} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={this.props.intl.formatMessage({id: 'common.Password'})}
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: this.props.intl.formatMessage({id: 'login.required.password'}),
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" placeholder={this.props.intl.formatMessage({id: 'common.Password'})}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={this.props.intl.formatMessage({id: 'register.Confirm.password'})}
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: this.props.intl.formatMessage({id: 'register.required.confirm.password'}),
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} placeholder={this.props.intl.formatMessage({id: 'register.Confirm.password'})}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={this.props.intl.formatMessage({id: 'common.Email'})}>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: this.props.intl.formatMessage({id: 'register.required.email'}), type: 'email' }]
              })(
                <Input placeholder={this.props.intl.formatMessage({id: 'common.Email'})} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={this.props.intl.formatMessage({id: 'common.EmployeeId'})}>
              {getFieldDecorator('employeeid', {
                rules: [{ required: true, message: this.props.intl.formatMessage({id: 'register.required.employeeid'}) }],
              })(
                <Input placeholder={this.props.intl.formatMessage({id: 'common.EmployeeId'})} />
              )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={this.props.intl.formatMessage({id: 'common.Location'})}
              >
                {getFieldDecorator('location', {
                  initialValue: ['PVG3', 'A3'],
                  rules: [{ type: 'array', required: true, message: this.props.intl.formatMessage({id: 'register.required.location'}) }],
                })(
                  <Cascader options={this.residences} />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label={this.props.intl.formatMessage({id: 'common.Team'})}>
              {getFieldDecorator('team', {
                rules: [],
              })(
                <Input placeholder={this.props.intl.formatMessage({id: 'common.Team'})} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('captcha', {
                rules: [],
              })(
               <Captcha/>
              )}
              <Button type="primary" htmlType="submit" className="register-form-button" loading={this.props.isFetching} disabled = {!this.props.isVerified}>
                {this.props.intl.formatMessage({id: 'register.Register'})}
              </Button>
              {this.props.intl.formatMessage({id: 'common.Or'})} <a href="/login">{this.props.intl.formatMessage({id: 'login.Login'})}!</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(Register)));