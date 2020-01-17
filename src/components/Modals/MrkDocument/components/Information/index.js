import React from 'react';
import { getContentItemValue } from 'utils/helpers';
import { Row, Col, Typography } from 'antd';
import { get, map } from 'lodash';
import Attachment from 'components/Attachment';
import { I18n } from 'react-redux-i18n';


const Information = ({ mrkDocumentData }) => <>
  {get(mrkDocumentData, 'items', []).map(item =>
    <Row key={item.id} type="flex" gutter={[24, 48]}>
      <Col span={8}>
        <Typography.Text ellipsis>{item.oName}:</Typography.Text>
      </Col>
      <Col span={16}>
        <Typography.Text>{getContentItemValue(item)}</Typography.Text>
      </Col>
    </Row>
  )}
  {get(mrkDocumentData, 'atts', []).length > 0 && <Row type="flex" gutter={[24, 48]}>
    <Col span={8}>
      <Typography.Text strong ellipsis>{I18n.t('common.attachments')}</Typography.Text>
    </Col>
    <Col span={16}>
      {map(mrkDocumentData.atts, item => <Attachment attachment={item} key={item.id} />)}
    </Col>
  </Row>}
</>;

export default Information;