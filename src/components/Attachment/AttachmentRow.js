import React from 'react';
import { Typography, Icon } from 'antd';
import { DOCUMENT } from 'constants/img';
import * as styles from './attachment.module.scss';
import moment from 'moment';

const AttachmentRow = ({ attachment, removeAttachment = null, ...props }) => <div
  className={styles.attachment}
  {...props}
>
  <Icon component={() =>
    <img src={DOCUMENT} alt={'DOCUMENT'} />
  } className={styles.img} />
  <div className={styles.information}>
    <Typography.Text className={styles.name} ellipsis={true} >{attachment.fileName}</Typography.Text>
    <Typography.Text className={styles.date} ellipsis={true} >{`${moment(attachment.createDate).format('Загружен HH.mm / DD.MM.YYYY')}`}</Typography.Text>
    {removeAttachment !== null && <Icon type="close-circle" onClick={removeAttachment} className={styles.remove} />}
  </div>
</div>;

export default AttachmentRow;