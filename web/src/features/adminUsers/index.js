import React from 'react';
import CurdComp from '../../components/curdComp';
import { injectIntl } from 'react-intl';

function Users(props){
  const columns = [
    { title: props.intl.formatMessage({id: 'common.Username'}), width: 100, dataIndex: 'username', key: 'username', fixed: 'left', align: 'left' },
    { title: props.intl.formatMessage({id: 'common.EmployeeId'}), width: 100, dataIndex: 'employeeid', key: 'employeeid', align: 'left' },
    { title: props.intl.formatMessage({id: 'common.Email'}), width: 200, dataIndex: 'email', key: 'email', align: 'left', editable: true },
    { title: props.intl.formatMessage({id: 'common.Location'}), width: 150, dataIndex: 'location', key: 'location', align: 'left', editable: true },
    { title: props.intl.formatMessage({id: 'common.Team'}), width: 150, dataIndex: 'team', key: 'team', align: 'left', editable: true },
    { title: props.intl.formatMessage({id: 'common.Status'}), width: 150, dataIndex: 'status', align: 'left', sorter: true, editable: true,
      compType: 'selection', optionList: [{value: 'draft', label: props.intl.formatMessage({id: 'common.Pending'})}, 
      {value: 'active', label: props.intl.formatMessage({id: 'common.Active'})}, 
      {value: 'inactive', label: props.intl.formatMessage({id: 'common.Inactive'})}]
    },
    { title: props.intl.formatMessage({id: 'common.Role'}), width: 150, dataIndex: 'role', align: 'left', sorter: true, editable: true,
      compType: 'selection', optionList: [{value: 'user', label: props.intl.formatMessage({id: 'common.User'})}, {value: 'admin', label: props.intl.formatMessage({id: 'common.Admin'})}]
    },
    { title: props.intl.formatMessage({id: 'common.Wechat'}), width: 150, dataIndex: 'wechat', key: 'wechat', align: 'left', editable: true },
    { title: props.intl.formatMessage({id: 'common.Gender'}), width: 150, dataIndex: 'gender', key: 'gender', sorter: true, align: 'left',  
      editable: true, compType: 'selection', optionList: [{value: 'female', label: props.intl.formatMessage({id: 'common.Female'})}, 
      {value: 'male', label: props.intl.formatMessage({id: 'common.Male'})}]
    },
    { title: props.intl.formatMessage({id: 'common.Phone'}), width: 200, dataIndex: 'phone', align: 'left', sorter: true, editable: true},
    { title: props.intl.formatMessage({id: 'common.Password'}), width: 100, dataIndex: 'password', align: 'left', editable: true}
  ];
  const configuration={
    searchKey: 'email',
    tooltip: props.intl.formatMessage({id: 'curd.search.hint'}),
    actions: ['add', 'delete'],
    url: '/api/admin/user',
     xScroll: 1700,
    addConfig: [
      {
        type: 'Input',
        label: props.intl.formatMessage({id: 'common.Username'}),
        key: 'username',
        required: true
      }, {
        type: 'Input',
        label: props.intl.formatMessage({id: 'common.EmployeeId'}),
        key: 'employeeid',
        required: true
      }, {
        type: 'Input',
        label: props.intl.formatMessage({id: 'common.Email'}),
        key: 'email',
        required: true,
        validType: 'email'       
      }, {
        type: 'Input',
        label: props.intl.formatMessage({id: 'common.Password'}),
        key: 'password',
        required: true,     
      }, {
        type: 'Input',
        label: props.intl.formatMessage({id: 'common.Location'}),
        key: 'location'      
      }, {
        type: 'Select',
        key: 'status',
        label: props.intl.formatMessage({id: 'common.Status'}),
        options: [{key: 'draft', label: props.intl.formatMessage({id: 'common.Pending'})}, {key: 'inactive', label: props.intl.formatMessage({id: 'common.Inactive'})}, {key: 'active', label: props.intl.formatMessage({id: 'common.Active'})}],
        defaultValue: 'active',
        required: true
      }, {
        type: 'Select',
        key: 'role',
        label: props.intl.formatMessage({id: 'common.Role'}),
        options: [{key: 'admin', label: props.intl.formatMessage({id: 'common.Admin'})}, {key: 'user', label: props.intl.formatMessage({id: 'common.User'})}],
        defaultValue: 'user',
        required: true
      },  {
        type: 'Input',
        label: props.intl.formatMessage({id: 'common.Team'}),
        key: 'team'      
      }, {
        type: 'Select',
        key: 'gender',
        label: props.intl.formatMessage({id: 'common.Gender'}),
        options: [{key: 'male', label: props.intl.formatMessage({id: 'common.Male'})}, {key: 'female', label: props.intl.formatMessage({id: 'common.Female'})}],
        defaultValue: 'male'
      }, {
        type: 'Input',
        label: props.intl.formatMessage({id: 'common.Phone'}),
        key: 'phone'
      }, {
        type: 'Input',
        label: props.intl.formatMessage({id: 'common.Wechat'}),
        key: 'wechat'
      }
    ]
  };
  return <CurdComp columns={columns} configuration={configuration} />;
}

export default injectIntl(Users);