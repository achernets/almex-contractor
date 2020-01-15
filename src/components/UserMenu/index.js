import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from 'redux/actions/auth';
import { Menu, Dropdown, Typography } from 'antd';
import { I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { userName } from 'utils/helpers';
import { actions } from 'react-redux-modals';
import * as styles from './usermenu.module.scss';
const UserMenu = ({ logout, client, showModal }) => {

  const menu = <Menu>
    <Menu.Item key="0">
      <Link to="/profile">{I18n.t('UserMenu.edit')}</Link>
    </Menu.Item>
    <Menu.Item key="1" onClick={() => showModal('MODAL_CHANGE_PASSWORD')}>{I18n.t('UserMenu.change_password')}
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" onClick={() => logout()}>{I18n.t('UserMenu.logout')}</Menu.Item>
  </Menu>;

  return <Dropdown overlay={menu} trigger={['click']}>
    <div className={styles.line}>
      <Avatar size={24} className={styles.avatar}>{client.firstName[0]}{client.lastName[0]}</Avatar>
      <Typography.Text className={styles.text}>{userName(client)}</Typography.Text>
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