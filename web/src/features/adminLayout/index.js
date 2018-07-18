import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import './index.css';
import { push } from 'connected-react-router';
import { logout } from './action';
//https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
import {withRouter} from 'react-router';
import CustomAvatar from '../../components/avatar';

import { Layout, Menu, Icon, Row, Col, Button, Spin } from 'antd';

const { Header, Sider, Content } = Layout;

class AdminLayout extends React.Component {
  constructor (props) {
    super(props);
    this.defaultSelectedKeys = [this.props.siderbarList[0].key];
    this.props.updateRoute(this.props.siderbarList[0].key);
    this.logout = this.logout.bind(this);
  }

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  triggerContent = (key) => {
    this.props.updateRoute(key);
  }

  logout = () => {
    this.props.logout();
  }

  render() {
    return (
      <Spin tip="Loading..." spinning={this.props.isFetching}>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={this.defaultSelectedKeys} onClick = {({item, key}) => {this.triggerContent(key)}}>
              {this.props.siderbarList.map((item, index, arr) => {
                return  (<Menu.Item key={item.key}>
                          <Icon type={item.icon} />
                          <span>{item.label}</span>
                        </Menu.Item>);
              })}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Row>
                <Col span={2}>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                  />
                </Col>
                <Col offset={20} span={1}>
                  <span style={{ marginRight: 24 }}>
                    <CustomAvatar username = {this.props.userInfo.username} count = {1}/>
                  </span>
                </Col>
                <Col span={1}>
                  <span style={{ marginRight: 24 }}>
                    <Button type="dashed" shape="circle" icon="logout" onClick={this.logout}/>
                  </span>
                </Col>
              </Row>
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              {this.props.siderbarList.map((item) => {
                return <Route path={ item.path } component={ item.component } key={ item.path }/>;
              })}
            </Content>
          </Layout>
        </Layout>
      </Spin>
    );
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
    updateRoute: (route) => {
      dispatch(push(route));
    },
    logout: () => {
      dispatch(logout());
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout));