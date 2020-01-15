import React, { useState, useEffect } from 'react';
import Loader from 'components/Loader';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { bindActionCreators } from 'redux';
import { Icon, Typography } from 'antd';
import { MrkClientServiceClient } from 'api';
import { log } from 'utils/helpers';
import { AutoSizer, List } from 'react-virtualized';
import * as styles from './listDocumentPatterns.module.scss';
const ListDocumentPatterns = ({ token, documentPattern, setDocumentPattern }) => {
  const [documentPatterns, setDocumentPatterns] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let isCancelled = false;
    const getAllDocumentPatterns = async (data) => {
      if (!isCancelled) setLoading(true);
      try {
        const filter = new KazFilter({
          position: data.length,
          countFilter: 50,
          orders: [],
          items: []
        });
        const result = await MrkClientServiceClient.getAllDocumentPatterns(token, filter);
        if (result.length === 50) {
          getAllDocumentPatterns([...data, ...result]);
        } else {
          if (!isCancelled) {
            setLoading(false);
            setDocumentPatterns([...data, ...result]);
          }
        }
      } catch (error) {
        if (!isCancelled) setLoading(false);
        log(error);
      }

    };
    getAllDocumentPatterns([]);
    return () => {
      isCancelled = true;
    };
  }, []);
  const rowRenderer = ({
    key,
    index,
    style
  }) => {
    const item = documentPatterns[index];
    return (
      <div key={key} className={styles.item} style={style}>
        <Typography.Text ellipsis onClick={() => setDocumentPattern(item)}>
          {item.nameDocPattern}
        </Typography.Text>
        {get(documentPattern, 'id', null) === item.id && <Icon type="check" />}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <Typography.Text className={styles.title} strong>{I18n.t('CreateMrkDocument.allowedDocumentPatterns')}:</Typography.Text>
      <AutoSizer className={styles.list}>
        {({ height, width }) => (
          <List
            width={width}
            height={height - 24}
            rowCount={documentPatterns.length}
            rowHeight={36}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
      {loading && <Loader />}
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ListDocumentPatterns);