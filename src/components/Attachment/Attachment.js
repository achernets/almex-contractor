import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Typography } from 'antd';
import * as styles from './attachment.module.scss';
import { getFio } from 'utils/helpers';
import moment from 'moment';

const Attachment = ({ attachment, removeAttachment = null }) => <div className={styles.wrapper}>
  <Icon type="file" theme="twoTone" />
  <div className={styles.info}>
    <Typography.Text ellipsis>{attachment.fileName}</Typography.Text>
    <Typography.Text ellipsis className={styles.desc}>{getFio(attachment.creator)}/{moment(attachment.createDate).format('DD.MM.YYYY HH:mm')}</Typography.Text>
    {removeAttachment !== null && <Icon type="close-circle" onClick={removeAttachment} className="remove" />}
  </div>
</div>;

Attachment.propTypes = {
  attachment: PropTypes.object.isRequired,
  removeAttachment: PropTypes.func
};

export default Attachment;