import React, { Component } from 'react';
import { Table, message, Row, Col, Input, Popconfirm, Button, Modal, Form, Select, InputNumber } from 'antd';
import EditableCell from './editableCell';
import { getService, postService, putService, deleteService } from '../../utils/requestService';
import './index.css';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class CurdComp extends Component {
  constructor (props) {
    super(props);
    const columns = [...this.props.columns];
    columns.map((item) => {
      if (item.editable) {
        item['render'] = (text, record) => (
          <EditableCell
            value={text}
            compType={item.compType}
            optionList={item.optionList}
            onChange={(newVal) => {this.onCellChange(record.id, item.dataIndex, newVal)}}
          />
        );
      }
      return item;
    });
    if (this.props.configuration.actions && this.props.configuration.actions.indexOf('delete') !== -1) {
      columns.push({
        title: props.intl.formatMessage({id: 'common.Actions'}),
        width: 150,
        fixed: 'right',
        key: 'action',
        align: 'left',
        render: (text, record) => (
          <span>
            <Popconfirm title={this.props.intl.formatMessage({id: 'curd.confirm.message'})} onConfirm={() => {this.deleteItem(record.id)}} okText={this.props.intl.formatMessage({id: 'common.Confirm'})} cancelText={this.props.intl.formatMessage({id: 'common.Cancel'})}>
              <a>{this.props.intl.formatMessage({id: 'common.Delete'})}</a>
            </Popconfirm>
          </span>
        ),
      });
    }
    this.state = {
      columns: columns || [],
      fetching: false,
      data: [],
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
        hideOnSinglePage: true,
        pageSize: 10
      },
      searchStr : '',
      visible: false,
      confirmLoading: false
    };
    this.onTableUpdate = this.onTableUpdate.bind(this);
    this.requestDataByParams = this.requestDataByParams.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onCellChange = this.onCellChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.addExec = this.addExec.bind(this);
  }

  deleteItem (id) {
    deleteService({
      'url': this.props.configuration.url + '/' + id, 
      'handler': (res) => {
        if (res.errno === 0) {
          this.setState({
            data: this.state.data.filter((item) => item.id !== id),
            fetching: false
          });
        } else {
          message.error(this.props.intl.formatMessage({id: 'error.delete'}));
        }
      },
      dispatch: this.props.dispatch,
      failMsg: this.props.intl.formatMessage({id: 'error.delete'})
    });    
  }

  onCellChange (id, key, value) {
    putService({
      'url': this.props.configuration.url, 
      data: {
        id: id,
        key: key,
        value: value
      },
      'handler': (res) => {
        if (res.errno === 0) {
          this.setState({
            fetching: false
          });
          message.success(this.props.intl.formatMessage({id: 'success.update'}));
        }  else {
          message.error(this.props.intl.formatMessage({id: 'error.update'}));
        }
      },
      dispatch: this.props.dispatch,
      failMsg: this.props.intl.formatMessage({id: 'error.update'})
    });
  }

  onAdd = () => {
    this.props.form.resetFields();
    this.setState({visible: true});
  }

  addExec = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if(!err){
        this.setState({
          confirmLoading: true
        });
        postService({
          'url': this.props.configuration.url, 
          data: {
            ...value
          },
          'handler': (res) => {
            if (res.errno === 0) {
              this.setState({
                data: [res.data, ...this.state.data],
                confirmLoading: false,
                visible: false
              });
              message.success(this.props.intl.formatMessage({id: 'success.add'}));              
            } else {
              message.error(this.props.intl.formatMessage({id: 'error.update'}));
            }
            this.setState({
              confirmLoading: false
            });
          },
          dispatch: this.props.dispatch,
          failMsg: this.props.intl.formatMessage({id: 'error.update'}),
          errHandler: () => {
            this.setState({
              confirmLoading: false
            });
            message.error(this.props.intl.formatMessage({id: 'error.update'}));
          }
        });
      }
    });
  }

  componentDidMount () {
    this.requestDataByParams({});
  }

  onSearch (value) {
    this.requestDataByParams({limit: 50, matchValue: value.trim()})
  }

  requestDataByParams ({limit = 10, current = 1 , sorter = 'id ASC', matchValue}) {
    this.setState({
      fetching: true
    });
    getService({
      'url': this.props.configuration.url + '/nan/' + limit + '/' + current + '/' + sorter + '/' + ((matchValue && matchValue.trim()) || ''), 
      'handler': (res) => {
        if (res.errno === 0 ) {
          this.setState({
            data: res.data.data,
            fetching: false,
            pagination: Object.assign({}, this.state.pagination, {total: res.data.count})
          });          
        }
      },
      'errHandler': (err) => {
        this.setState({
          fetching: false
        });
        message.error(this.props.intl.formatMessage({id: 'error.fetch'}));
      },
      dispatch: this.props.dispatch
    });    
  }

  onTableUpdate (pagination, filters, sorter) {
    this.requestDataByParams({
      limit: pagination.pageSize,
      current: pagination.current,
      sorter: sorter.field ? (sorter.field + ' ' + sorter.order.replace('end', '')) : ''
    });
  }

  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return <div>
    <Row gutter={16} type="flex" justify="end" style={{'margin': '0 0 10px 0'}}>
      <Col>
        <Search
          placeholder= {this.props.configuration.tooltip}
          onSearch= {this.onSearch}
          enterButton
          onChange= {this.onChange}
          defaultValue= {this.state.searchStr}
          style= {{ width: 200}}
          size= "small"
        />
        {this.props.configuration.actions.indexOf('add') !== -1 &&  <Button type="primary" icon="plus-square-o" size="small" style={{marginLeft: "20px"}} onClick={this.onAdd} ghost>{this.props.intl.formatMessage({id: 'common.Add'})}</Button>}
      </Col>
    </Row>
    <Table scroll={{x: this.props.configuration.xScroll}} size="small" rowKey={record => record.id} onChange={this.onTableUpdate} loading={this.state.fetching} columns={this.state.columns} dataSource={this.state.data} pagination={this.state.pagination} />
    <Modal title={this.props.intl.formatMessage({'id': 'common.Add'})}
      visible={this.state.visible}
      onOk={this.addExec}
      confirmLoading={this.state.confirmLoading}
      onCancel={() => {this.setState({visible: false});}}
    >
      <Form>
        {this.props.configuration.addConfig.map((item) => {
          switch(item.type){
            case 'Input': 
              return <FormItem {...formItemLayout} label={item.label} key={item.key}>
                {getFieldDecorator(item.key, {
                  rules: [
                    { required: item.required, message: this.props.intl.formatMessage({id: 'curd.required.field'}) },
                    { type: item.validType, message: this.props.intl.formatMessage({id: 'curd.right.type'})}
                  ],
                })(
                  <Input />
                )}
              </FormItem>;
            case 'InputNumber': 
              return <FormItem {...formItemLayout} label={item.label} key={item.key}>
                {getFieldDecorator(item.key, {
                  rules: [
                    { required: item.required, message: this.props.intl.formatMessage({id: 'curd.required.field'}) },
                  ],
                })(
                  <InputNumber />
                )}
              </FormItem>;
            case 'TextArea': 
              return <FormItem {...formItemLayout} label={item.label} key={item.key}>
                {getFieldDecorator(item.key, {
                  rules: [
                    { required: item.required, message: this.props.intl.formatMessage({id: 'curd.required.field'}) },
                    { type: item.validType, message: this.props.intl.formatMessage({id: 'curd.right.type'})}
                  ],
                })(
                  <TextArea />
                )}
              </FormItem>;
            case 'Select':
              return <FormItem {...formItemLayout} label={item.label} key={item.key}>
                {getFieldDecorator(item.key, {
                  initialValue: item.defaultValue,
                  rules: [
                    { required: item.required, message: this.props.intl.formatMessage({id: 'curd.required.field'}) },
                    { type: item.validType, message: this.props.intl.formatMessage({id: 'curd.right.type'})}
                  ],
                })(
                  <Select>
                    {item.options.map((option) => <Option key={option.key} value={option.key}>{option.label}</Option>)}
                  </Select>
                )}
              </FormItem>;            
            default: 
              return '';
          }
        })}
      </Form>
    </Modal>    
    </div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(CurdComp))));
