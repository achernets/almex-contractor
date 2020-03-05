import React from 'react';
import { Typography, Icon } from 'antd';
import * as styles from './attachment.module.scss';
import { attachmentIcon } from 'utils//helpers';
import moment from 'moment';

const AttachmentRow = ({ attachment, removeAttachment = null, ...props }) => <div
  className={styles.attachment}
  {...props}
>
  <Icon component={() =>
    <img src={attachmentIcon(attachment.fileName)} alt={''} />
  } className={styles.img} />
  <div className={styles.information}>
    <Typography.Text className={styles.name} ellipsis={true} >{attachment.fileName}</Typography.Text>
    <Typography.Text className={styles.date} ellipsis={true} >{`${moment(attachment.createDate).format('Загружен DD.MM.YYYY HH:mm')}`}</Typography.Text>
    {removeAttachment !== null && <Icon type="close-circle" onClick={removeAttachment} className={styles.remove} />}
  </div>
</div>;

export default AttachmentRow;