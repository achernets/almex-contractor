import React, { useEffect } from 'react';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { bindActionCreators } from 'redux';
import { Icon, Typography } from 'antd';
import { AutoSizer, List } from 'react-virtualized';
import * as styles from './listDocumentPatterns.module.scss';
import { getAllDocumentPatterns, setDocumentPattern } from 'redux/actions/Modal/createMrkDocument';
const ListDocumentPatterns = ({ documentPattern, documentPatterns, getAllDocumentPatterns, setDocumentPattern }) => {
  useEffect(() => {
    getAllDocumentPatterns();
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
    </div>
  );
};

const mapStateToProps = state => ({
  documentPatterns: state.modal.createMrkDocument.documentPatterns,
  documentPattern: state.modal.createMrkDocument.documentPattern
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllDocumentPatterns,
      setDocumentPattern
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ListDocumentPatterns);