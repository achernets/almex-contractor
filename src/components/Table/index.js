import React, { useRef, useEffect } from 'react';
import { Table as ATable } from 'antd';
import { PAGE_SIZE } from 'constants/table';
import * as styles from './table.module.scss';
import Scrollbar from 'components/Scrollbar';
const Table = ({
  size = 'middle',
  tableLayout = 'fixed',
  bordered = false,
  columns = [],
  dataSource = [],
  rowKey = 'id',
  locale = {},
  ...props
}) => {
  let tableRef = useRef(null);
  useEffect(() => {
    tableRef.current
      .closest('.ant-table-scroll')
      .getElementsByClassName('ant-table-body')[0].style.overflow = 'hidden';
  }, []);
  const { emptyText } = locale;
  return <div className={styles.table}>
    <ATable
      tableLayout={tableLayout}
      bordered={bordered}
      size={size}
      locale={{
        emptyText: emptyText
      }}
      pagination={{
        simple: true,
        defaultPageSize: PAGE_SIZE
      }}
      components={{
        table: ({ children, ...props }) => {
          return (
            <Scrollbar
            >
              <table {...props} ref={tableRef}>
                {children}
              </table>
            </Scrollbar>
          );
        }
      }}
      scroll={{ y: '100%' }}
      columns={columns}
      rowKey={rowKey}
      hasData={dataSource.length === 0}
      dataSource={dataSource}
      {...props}
    />
  </div>;
};

export default Table;