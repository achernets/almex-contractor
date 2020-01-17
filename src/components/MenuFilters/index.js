import React from 'react';
import { Row, Col, Typography } from 'antd';
import { I18n } from 'react-redux-i18n';
import { isEmpty } from 'lodash';
import classnames from 'classnames';
import * as styles from './menufilters.module.scss';

const MenuFilters = ({
  data = [],
  active = null,
  prefix = '',
  onClick = () => { }
}) => <Row className={styles.menu} type="flex" justify="start" align="middle" gutter={[24, 1]}>
    {data.map(item => <Col key={item}>
      <Typography.Text className={classnames({ 'active': active === item })} onClick={() => onClick(item)} strong>
        {isEmpty(prefix) ? I18n.t(item) : I18n.t(`${prefix}.${item}`)}
      </Typography.Text>
    </Col>)}
  </Row>;

export default MenuFilters;