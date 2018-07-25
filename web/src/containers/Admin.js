import React, { Component } from 'react';
import AdminLayout from '../features/adminLayout';
import { connect } from 'react-redux';
import ResetPassword from '../features/resetPassword';
import PersonalInfo from '../features/personInfo';
import AdminUsers from '../features/adminUsers';
import { injectIntl } from 'react-intl';


class Admin extends Component {
  constructor (props) {
    super(props);
    this.permissionMap = {
      'admin': [
        {
          label: props.intl.formatMessage({id: 'admin.user.management'}),
          key: '/admin/usermgt',
          icon: 'team',
          path: '/admin/usermgt',
          component: AdminUsers
        },
        {
          label: props.intl.formatMessage({id: 'admin.personal.information'}),
          key: '/admin/personalmgt',
          icon: 'user',
          path: '/admin/personalmgt',
          component: PersonalInfo
        },
        {
          label: props.intl.formatMessage({id: 'admin.reset.password'}),
          key: '/admin/resetpwd',
          icon: 'lock',
          path: '/admin/resetpwd',
          component: ResetPassword
        }
      ],
      'user': []
    };
  }

  getSiderbar () {
    let list = this.permissionMap['admin'];
    return list;
  }

  render () {
    return <AdminLayout siderbarList = {this.getSiderbar()}/>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.commonReducer.isFetching || false,
    userInfo: state.commonReducer.userInfo || ''
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Admin));