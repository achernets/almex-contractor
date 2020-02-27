import React, { useRef } from 'react';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { bindActionCreators } from 'redux';
import { Icon, Typography } from 'antd';
import { AutoSizer, List } from 'react-virtualized';
import Scrollbar from 'components/Scrollbar';
import * as styles from './listDocumentPatterns.module.scss';
import { setDocumentPattern } from 'redux/actions/Modal/createMrkDocument';
const ListDocumentPatterns = ({ documentPattern, documentPatterns, setDocumentPattern }) => {

  let listRef = useRef(null);
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

  const handleScroll = e => {
    const { scrollTop, scrollLeft } = e.target;
    const { Grid } = listRef.current;
    Grid.handleScrollEvent({ scrollTop, scrollLeft });
  };

  return (
    <div className={styles.wrapper}>
      <Typography.Text className={styles.title} strong>{I18n.t('CreateMrkDocument.allowedDocumentPatterns')}:</Typography.Text>
      <div className={styles.container}>
        <AutoSizer className={styles.list}>
          {({ height, width }) => (
            <Scrollbar style={{ height, width }} onScroll={handleScroll}>
              <List
                style={{ overflowX: false, overflowY: false }}
                width={width}
                height={height - 24}
                rowCount={documentPatterns.length}
                rowHeight={36}
                ref={listRef}
                rowRenderer={rowRenderer}
              />
            </Scrollbar>
          )}
        </AutoSizer>
      </div>
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
      setDocumentPattern
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ListDocumentPatterns);