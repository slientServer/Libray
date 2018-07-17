import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestInitAction } from './action';

class PersonalInfo extends Component {

  componentDidMount () {
    if (!this.props.userInfo) {
      this.props.requestInitData();
    }
  }

  render () {
    return <div>test</div>;
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);