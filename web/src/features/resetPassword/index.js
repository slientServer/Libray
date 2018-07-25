import React, { Component } from 'react';
import { connect } from 'react-redux';
import { udpatePasswordAction } from './action';
import sha256 from 'sha256';
import { injectIntl } from 'react-intl';
import { Form, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

class RsetPassword extends Component {
  constructor () {
    super();
    this.state = {
      confirmDirty: false
    };
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let finalData = Object.assign({}, {'password': sha256(values.password), 'confirm': sha256(values.confirm)});
        this.props.updatePassword(finalData);
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

  render () {
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
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col span={12} >
            <FormItem
              {...formItemLayout}
              label={this.props.intl.formatMessage({id: 'common.Password'})}
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: this.props.intl.formatMessage({id: 'login.required.password'})
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" placeholder={this.props.intl.formatMessage({id: 'common.Password'})}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={this.props.intl.formatMessage({id: 'register.Confirm.password'})}
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: this.props.intl.formatMessage({id: 'register.required.confirm.password'})
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} placeholder={this.props.intl.formatMessage({id: 'register.Confirm.password'})}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={20}>
            <Button type="primary" htmlType="submit">
              {this.props.intl.formatMessage({id: 'common.Save'})}
            </Button>
          </Col>
        </Row>
      </Form>          
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePassword: (data) => {
      dispatch(udpatePasswordAction(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(RsetPassword)));