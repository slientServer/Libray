import React, { Component } from 'react';
import { Table, message, Row, Col, Input, Popconfirm, Button, Modal, Form, Select, InputNumber } from 'antd';
import EditableCell from './editableCell';
import { getService, postService, putService, deleteService } from '../../utils/requestService';
import './index.css';
import sha256 from 'sha256';

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
        title: 'Actions',
        width: 150,
        fixed: 'right',
        key: 'action',
        align: 'left',
        render: (text, record) => (
          <span>
            <Popconfirm title="Please double check if you want?" onConfirm={() => {this.deleteItem(record.id)}} okText="Conform" cancelText="Cancel">
              <a>Delete</a>
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
          message.error('Data delete failed!');
        }
      },
      failMsg: 'Data delete failed!'
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
          message.success('Data update successfully！');
        }  else {
          message.error('Data update failed!');
        }
      },
      failMsg: 'Data update failed!'
    });
  }

  onAdd = () => {
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
            ...value,
            password: sha256('123456')
          },
          'handler': (res) => {
            if (res.errno === 0) {
              this.setState({
                data: [res.data, ...this.state.data],
                confirmLoading: false,
                visible: false
              });
              message.success('Data add successfully！');              
            } else {
              message.error('Data add failed!');
            }
          },
          failMsg: 'Data add failed!'
        });
      }
    });
  }

  componentWillMount () {
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
        message.error('Data request failed!');
      }
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
        {this.props.configuration.actions.indexOf('add') !== -1 &&  <Button type="primary" icon="plus-square-o" size="small" style={{marginLeft: "20px"}} onClick={this.onAdd} ghost>Add</Button>}
      </Col>
    </Row>
    <Table scroll={{x: 1600}} size="small" rowKey={record => record.id} onChange={this.onTableUpdate} loading={this.state.fetching} columns={this.state.columns} dataSource={this.state.data} pagination={this.state.pagination} />
    <Modal title="Add"
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
                  initialValue: item.defaultValue,
                  rules: [
                    { required: item.required, message: 'Required field!' },
                    { type: item.validType, message: 'Please input right type!'}
                  ],
                })(
                  <Input />
                )}
              </FormItem>;
            case 'InputNumber': 
              return <FormItem {...formItemLayout} label={item.label} key={item.key}>
                {getFieldDecorator(item.key, {
                  initialValue: item.defaultValue,
                  rules: [
                    { required: item.required, message: 'Required field!' },
                  ],
                })(
                  <InputNumber />
                )}
              </FormItem>;
            case 'TextArea': 
              return <FormItem {...formItemLayout} label={item.label} key={item.key}>
                {getFieldDecorator(item.key, {
                  initialValue: item.defaultValue,
                  rules: [
                    { required: item.required, message: 'Required field!' },
                    { type: item.validType, message: 'Please input right type!'}
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
                    { required: item.required, message: 'Required field!' },
                    { type: item.validType, message: 'Please input right type!'}
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

export default Form.create()(CurdComp);