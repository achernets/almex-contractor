import React from 'react';
import { Typography, Icon } from 'antd';
import { DOCUMENT } from 'constants/img';
import moment from 'moment';

const AttachmentRow = ({ attachment }) => <div style={{ display: 'flex', alignItems: 'center' }}>
  <Icon component={() =>
    <img src={DOCUMENT} alt={'DOCUMENT'} />
  } style={{ marginLeft: -4, marginRight: 4 }} />
  <div style={{
    flex: 1,
    overflow: 'hidden',
    lineHeight: 'normal',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }}>
    <Typography.Text style={{
      color: '#595959',
      fontFamily: 'SFUIText Regular',
      textOverflow: 'ellipsis',
      width: '100%',
      wordBreak: 'break-word'
    }} ellipsis={true} >{attachment.fileName}</Typography.Text>
    <Typography.Text style={{
      color: '#8c8c8c',
      fontFamily: 'SFUIText Regular',
      textOverflow: 'ellipsis',
      width: '100%',
      wordBreak: 'break-word',
      fontSize: 12
    }} ellipsis={true} >{`${moment(attachment.createDate).format('Загружен HH.mm / DD.MM.YYYY')}`}</Typography.Text>
  </div>
</div>;

export default AttachmentRow;