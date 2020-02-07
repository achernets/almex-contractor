import React from 'react';
import { Typography, Col } from 'antd';
import Info from './Info';
import { map, size, get } from 'lodash';
import Attachment from './Attachment';
import TitleBlock from './TitleBlock';
const MrkDocumentView = ({ selectedAttachment, mrkDocumentData, mrkAttachment }) => <>
  <Col span={24}>
    <TitleBlock
      text={'Общая информация'}
    />
  </Col>
  <Col span={24}>
    <Info mrkDocumentData={mrkDocumentData} />
  </Col>
  {size(mrkDocumentData.atts) > 0 && <Col span={24}>
    <TitleBlock
      text={'Вложения и подписи'}
    >
      <Typography.Text style={{ color: '#595959', fontFamily: 'SFUIText Regular' }} >Ожидает подписания</Typography.Text>
    </TitleBlock>
  </Col>}
  {map(mrkDocumentData.atts, item => <Col span={24} key={item.id}>
    <Attachment
      attachment={item}
      onClick={() => selectedAttachment(item)}
      active={get(mrkAttachment, 'id', null) === item.id}
    />
  </Col>)}
</>;

export default MrkDocumentView;