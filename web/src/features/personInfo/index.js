import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestInitAction, udpatePersonalAction } from './action';
import { injectIntl } from 'react-intl';

import { Form, Input, Icon, Cascader, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

class PersonalInfo extends Component {

  componentDidMount () {
    if (!this.props.userInfo) {
      this.props.requestInitData();
    }
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updatePersonalData(values);
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const residences = [];
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
      residences.push({
        value: 'PVG' + idx,
        label: 'PVG' + idx,
        children: area
      });
    }
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
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col span={12} >
            <FormItem {...formItemLayout}
              label={this.props.intl.formatMessage({id: 'common.Username'})}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: this.props.intl.formatMessage({id: 'login.required.username'}) }],
                initialValue: this.props.userInfo.username
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({id: 'common.Username'})} disabled/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout}
              label={this.props.intl.formatMessage({id: 'common.Email'})}>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: this.props.intl.formatMessage({id: 'register.required.email'}), type: 'email' }],
                initialValue: this.props.userInfo.email
              })(
                <Input placeholder={this.props.intl.formatMessage({id: 'common.Email'})} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout}
              label={this.props.intl.formatMessage({id: 'common.EmployeeId'})}>
              {getFieldDecorator('employeeid', {
                rules: [{ required: true, message: this.props.intl.formatMessage({id: 'register.required.employeeid'}) }],
                initialValue: this.props.userInfo.employeeid
              })(
                <Input placeholder={this.props.intl.formatMessage({id: 'common.EmployeeId'})} disabled/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout}
              label={this.props.intl.formatMessage({id: 'common.Phone'})}>
              {getFieldDecorator('phone', {
                rules: [],
                initialValue: this.props.userInfo.phone
              })(
                <Input placeholder={this.props.intl.formatMessage({id: 'common.Phone'})} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12} >
            <FormItem
                {...formItemLayout}
                label={this.props.intl.formatMessage({id: 'common.Location'})}
              >
                {getFieldDecorator('location', {
                  initialValue: this.props.userInfo && this.props.userInfo.location && this.props.userInfo.location.split('|'),
                  rules: [{ type: 'array', required: true, message: this.props.intl.formatMessage({id: 'register.required.location'}) }],
                })(
                  <Cascader options={residences} />
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout}
              label={this.props.intl.formatMessage({id: 'common.Team'})}>
              {getFieldDecorator('team', {
                rules: [],
                initialValue: this.props.userInfo.team
              })(
                <Input placeholder={this.props.intl.formatMessage({id: 'common.Team'})} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout}
              label={this.props.intl.formatMessage({id: 'common.Wechat'})}>
              {getFieldDecorator('wechat', {
                rules: [],
                initialValue: this.props.userInfo.wechat
              })(
                <Input placeholder={this.props.intl.formatMessage({id: 'common.Wechat'})} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout}
              label={this.props.intl.formatMessage({id: 'common.Nickname'})}>
              {getFieldDecorator('nickname', {
                rules: [],
                initialValue: this.props.userInfo.nickname
              })(
                <Input placeholder={this.props.intl.formatMessage({id: 'common.Nickname'})} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={8}>
            <Button type="primary" htmlType="submit">
              {this.props.intl.formatMessage({id: 'common.Save'})}
            </Button>
          </Col>
          <Col span={4}>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              {this.props.intl.formatMessage({id: 'common.Cancel'})}
            </Button>
          </Col>
        </Row>
      </Form>          
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.personInfoReducer.userInfo || ''
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestInitData: () => {
      dispatch(requestInitAction());
    },
    updatePersonalData: (data) => {
      dispatch(udpatePersonalAction(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(PersonalInfo)));