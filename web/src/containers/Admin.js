import React, { Component } from 'react';
import AdminLayout from '../features/adminLayout';
import { connect } from 'react-redux';
import ResetPassword from '../features/resetPassword';
import PersonalInfo from '../features/personInfo';
import AdminUsers from '../features/adminUsers';
import AdminCompanies from '../features/adminCompanies';
import { injectIntl } from 'react-intl';


class Admin extends Component {
  constructor (props) {
    super(props);
    this.permissionMap = {
      'super': [
        {
          label: props.intl.formatMessage({id: 'admin.user.management'}),
          key: '/admin/usermgt',
          icon: 'team',
          path: '/admin/usermgt',
          component: AdminUsers
        },
        {
          label: props.intl.formatMessage({id: 'admin.company.management'}),
          key: '/admin/companymgt',
          icon: 'api',
          path: '/admin/companymgt',
          component: AdminCompanies
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
      'user': [
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
      ]
    };
  }

  getSiderbar () {
    let list = this.permissionMap[window.localStorage.getItem('role') || 'user'];
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