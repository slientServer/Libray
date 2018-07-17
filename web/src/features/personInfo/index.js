import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestInitAction, udpatePersonalAction } from './action';

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
              label="User Name">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
                initialValue: this.props.userInfo.username
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="username" disabled/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout}
              label="Email">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!', type: 'email' }],
                initialValue: this.props.userInfo.email
              })(
                <Input placeholder="email" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout}
              label="Employee Id">
              {getFieldDecorator('employeeid', {
                rules: [{ required: true, message: 'Please input your employee id!' }],
                initialValue: this.props.userInfo.employeeid
              })(
                <Input placeholder="employee id" disabled/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout}
              label="Phone">
              {getFieldDecorator('phone', {
                rules: [{ message: 'Please input your phone!' }],
                initialValue: this.props.userInfo.phone
              })(
                <Input placeholder="phone" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12} >
            <FormItem
                {...formItemLayout}
                label="Location"
              >
                {getFieldDecorator('location', {
                  initialValue: this.props.userInfo && this.props.userInfo.location && this.props.userInfo.location.split('|'),
                  rules: [{ type: 'array', required: true, message: 'Please select your location!' }],
                })(
                  <Cascader options={residences} />
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout}
              label="Team">
              {getFieldDecorator('team', {
                rules: [{ message: 'Please input your team!' }],
                initialValue: this.props.userInfo.team
              })(
                <Input placeholder="team" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout}
              label="Wechat">
              {getFieldDecorator('wechat', {
                rules: [{ message: 'Please input your wechat!' }],
                initialValue: this.props.userInfo.wechat
              })(
                <Input placeholder="wechat" />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout}
              label="Nick Name">
              {getFieldDecorator('nickname', {
                rules: [{ message: 'Please input your nickname!' }],
                initialValue: this.props.userInfo.nickname
              })(
                <Input placeholder="nickname" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={8}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Col>
          <Col span={4}>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>          
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.commonReducer.userInfo || ''
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PersonalInfo));