import React from 'react';
import CurdComp from '../../components/curdComp';
import { injectIntl } from 'react-intl';

function Companies(props){
  const columns = [
    { title: props.intl.formatMessage({id: 'common.Id'}), dataIndex: 'id', key: 'id' },
    { title: props.intl.formatMessage({id: 'common.Name'}), dataIndex: 'name', key: 'name' },
    { title: props.intl.formatMessage({id: 'common.Displayname'}), dataIndex: 'displayname', key: 'displayname', editable: true },
    { title: props.intl.formatMessage({id: 'common.Status'}), dataIndex: 'status', sorter: true, editable: true,
      compType: 'selection', optionList: [{value: 'draft', label: props.intl.formatMessage({id: 'common.Pending'})}, 
      {value: 'active', label: props.intl.formatMessage({id: 'common.Active'})}, 
      {value: 'inactive', label: props.intl.formatMessage({id: 'common.Inactive'})}]
    }
  ];
  const configuration={
    searchKey: 'email',
    tooltip: props.intl.formatMessage({id: 'curd.search.hint'}),
    actions: ['add', 'delete'],
    url: '/api/super/company',
    addConfig: [
      {
        type: 'Input',
        label: props.intl.formatMessage({id: 'common.Name'}),
        key: 'name',
        required: true
      }, {
        type: 'Input',
        label: props.intl.formatMessage({id: 'common.Displayname'}),
        key: 'displayname',
        required: true
      }, {
        type: 'Select',
        key: 'status',
        label: props.intl.formatMessage({id: 'common.Status'}),
        options: [{key: 'draft', label: props.intl.formatMessage({id: 'common.Pending'})}, {key: 'inactive', label: props.intl.formatMessage({id: 'common.Inactive'})}, {key: 'active', label: props.intl.formatMessage({id: 'common.Active'})}],
        defaultValue: 'active',
        required: true
      }
    ]
  };
  return <CurdComp columns={columns} configuration={configuration} />;
}

export default injectIntl(Companies);