import React, { Component } from 'react';
import AdminLayout from '../features/adminLayout';
import { permissionMap } from '../constants/config';
import { connect } from 'react-redux';

class Admin extends Component {

  getSiderbar () {
    let list = permissionMap['admin'];
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);