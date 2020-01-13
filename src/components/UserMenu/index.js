import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from 'redux/actions/auth';
import { Menu, Dropdown, Typography } from 'antd';
import { I18n } from 'react-redux-i18n';
//import * as styles from './header.module.scss';
import { Avatar } from 'antd';
import { userName } from 'utils/helpers';
import { actions } from 'react-redux-modals';

const UserMenu = ({ logout, client, showModal }) => {

  const menu = <Menu>
    <Menu.Item key="0">{I18n.t('UserMenu.edit')}</Menu.Item>
    <Menu.Item key="1" onClick={() => showModal('MODAL_CHANGE_PASSWORD')}>{I18n.t('UserMenu.change_password')}
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" onClick={() => logout()}>{I18n.t('UserMenu.logout')}</Menu.Item>
  </Menu>;

  return <Dropdown overlay={menu} trigger={['click']}>
    <div style={{ cursor: 'pointer' }}>
      <Avatar size={24} src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg" />
      <Typography.Text style={{ marginLeft: 8 }}>{userName(client)}</Typography.Text>
    </div>
  </Dropdown>;
};

const mapStateToProps = state => ({
  client: state.auth.client
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showModal: actions.showModal,
      logout
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);