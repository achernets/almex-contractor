import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as styles from './languages.module.scss';
import LangItem from './item';
import { Row } from 'antd';
class Languages extends PureComponent {
  render() {
    const { list = [] } = this.props;
    return (
      <Row
        className={styles.list}
        type="flex"
        justify="center"
        align="middle"
        gutter={16}
      >
        {list.map(item => (
          <LangItem key={item.value} language={item} />
        ))}
      </Row>
    );
  }
}
const mapStateToProps = state => ({
  list: state.i18n.list
});

export default connect(mapStateToProps)(Languages);
