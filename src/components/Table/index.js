import React, { useRef, useLayoutEffect, useState } from 'react';
import { Table as ATable } from 'antd';
import Empty from 'components/Empty';
import { PAGE_SIZE } from 'constants/table';
import { isEmpty } from 'lodash';
import * as styles from './table.module.scss';
const Table = ({
  size = 'middle',
  tableLayout = 'fixed',
  bordered = true,
  columns = [],
  dataSource = [],
  rowKey = 'id',
  locale = {},
  ...props
}) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const handleResize = () => {
      if (targetRef.current) setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const newHeight = dimensions.height === 0 ? 0 : (dimensions.height - 105);  //middle
  //const newHeight = dimensions.height === 0 ? 0 : (dimensions.height - 95);  //small
  const { emptyText } = locale;
  return <div ref={targetRef} className={styles.table}>
    <ATable
      tableLayout={tableLayout}
      bordered={bordered}
      size={size}
      locale={{
        emptyText: isEmpty(emptyText) ? <Empty style={{ height: newHeight + 25 }} /> : <div style={{ height: newHeight + 25 }}>
          {emptyText}
        </div>
      }}
      pagination={{
        simple: true,
        defaultPageSize: PAGE_SIZE
      }}
      scroll={{ y: newHeight }}
      columns={columns}
      rowKey={rowKey}
      hasData={dataSource.length === 0}
      dataSource={dataSource}
      {...props}
    />
  </div>;
};

export default Table;