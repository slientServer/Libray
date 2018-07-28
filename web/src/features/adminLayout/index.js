import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import './index.css';
import { push } from 'connected-react-router';
import { logout } from './action';
//https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
import {withRouter} from 'react-router';
import CustomAvatar from '../../components/avatar';
import { injectIntl } from 'react-intl';

import { Layout, Menu, Icon, Row, Col, Button, Spin, Select } from 'antd';

const { Header, Sider, Content } = Layout;

class AdminLayout extends React.Component {
  constructor (props) {
    super(props);
    this.defaultSelectedKeys = [this.props.siderbarList[0].key];
    this.props.updateRoute(this.props.siderbarList[0].key);
    this.logout = this.logout.bind(this);
    this.state = {
      defaultLang: window.localStorage.getItem('locale') || 'en'
    };
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
    this.props.logout({
      failMsg: this.props.intl.formatMessage({id: 'error.logout'})
    });
  }

  langChange = (data) => {
    window.localStorage.setItem('locale', data);
    window.location.reload();
  }

  render() {
    return (
      <Spin tip={this.props.intl.formatMessage({id:'common.Loading'})} spinning={this.props.isFetching}>
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
              <Row justify="center">
                <Col span={2}>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                  />
                </Col>
                <Col offset={17} span={3} >
                  <Select defaultValue={ this.state.defaultLang } onChange={this.langChange}>
                    <Select.Option value="en">{this.props.intl.formatMessage({id: 'common.lang.en'})}</Select.Option>
                    <Select.Option value="zh">{this.props.intl.formatMessage({id: 'common.lang.zh'})}</Select.Option>
                  </Select>
                </Col>
                <Col span={1}>
                  <span style={{ marginRight: 24 }}>
                    <CustomAvatar username = {this.props.userInfo.username || window.localStorage.getItem('username') } count = {1}/>
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
    logout: ({failMsg}) => {
      dispatch(logout({failMsg}));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(AdminLayout)));