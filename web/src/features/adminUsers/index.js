import React from 'react';
import CurdComp from '../../components/curdComp';

function Users(){
  const columns = [
    { title: 'User Name', width: 100, dataIndex: 'username', key: 'username', fixed: 'left', align: 'left' },
    { title: 'Employee Id', width: 100, dataIndex: 'employeeid', key: 'employeeid', align: 'left' },
    { title: 'Email', width: 200, dataIndex: 'email', key: 'email', align: 'left', editable: true },
    { title: 'Location', width: 150, dataIndex: 'location', key: 'location', align: 'left', editable: true },
    { title: 'Team', width: 150, dataIndex: 'team', key: 'team', align: 'left', editable: true },
    { title: 'Status', width: 150, dataIndex: 'status', align: 'left', sorter: true, editable: true,
      compType: 'selection', optionList: [{value: 'draft', label: 'Pending'}, {value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}]
    },
    { title: 'Role', width: 150, dataIndex: 'role', align: 'left', sorter: true, editable: true,
      compType: 'selection', optionList: [{value: 'user', label: 'User'}, {value: 'admin', label: 'Admin'}]
    },
    { title: 'Wechat', width: 150, dataIndex: 'wechat', key: 'wechat', align: 'left', editable: true },
    { title: 'Gender', width: 150, dataIndex: 'gender', key: 'gender', sorter: true, align: 'left',  
      editable: true, compType: 'selection', optionList: [{value: 'female', label: 'Female'}, {value: 'male', label: 'Male'}]
    },
    { title: 'Phone', width: 200, dataIndex: 'phone', align: 'left', sorter: true, editable: true}
  ];
  const configuration={
    searchKey: 'email',
    tooltip: 'Please input email...', 
    actions: ['add', 'delete'],
    url: '/api/admin/user',
    addConfig: [
      {
        type: 'Input',
        label: 'Username',
        key: 'username',
        required: true
      }, {
        type: 'Input',
        label: 'Employee Id',
        key: 'employeeid',
        required: true
      }, {
        type: 'Input',
        label: 'Email',
        key: 'email',
        required: true,
        validType: 'email'       
      }, {
        type: 'Input',
        label: 'Location',
        key: 'location'      
      }, {
        type: 'Select',
        key: 'status',
        label: 'Status',
        options: [{key: 'draft', label: 'Pending'}, {key: 'inactive', label: 'Inactive'}, {key: 'active', label: 'Active'}],
        defaultValue: 'active',
        required: true
      }, {
        type: 'Select',
        key: 'role',
        label: 'Role',
        options: [{key: 'admin', label: 'Admin'}, {key: 'user', label: 'User'}],
        defaultValue: 'user',
        required: true
      },  {
        type: 'Input',
        label: 'Team',
        key: 'team'      
      }, {
        type: 'Select',
        key: 'gender',
        label: 'Gender',
        options: [{key: 'male', label: 'Male'}, {key: 'female', label: 'Female'}],
        defaultValue: 'male'
      }, {
        type: 'Input',
        label: 'Phone',
        key: 'phone'
      }, {
        type: 'Input',
        label: 'Wechat',
        key: 'wechat'
      }
    ]
  };
  return <CurdComp columns={columns} configuration={configuration} />;
}

export default Users;