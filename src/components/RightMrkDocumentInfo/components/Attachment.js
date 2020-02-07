import React from 'react';
import { Typography, Row, Button, Col, Icon } from 'antd';
import { ECP } from 'constants/img';
import { AttachmentRow } from 'components/Attachment';
import InfoRow from './InfoRow';

const Attachment = ({ attachment, onClick, active }) => <>
  <Row onClick={() => onClick(attachment)} style={{ border: '1px solid #E8E8E8', /*border: '1px solid #1890FF', background: 'rgba(24, 144, 255, 0.05)',*/ borderRadius: 2, padding: 8 }} gutter={[0, 8]}>
    <Col span={19}>
      <AttachmentRow
        attachment={attachment}
      />
    </Col>
    <Col span={5} style={{ textAlign: 'right' }}>
      <Button type={'primary'} size={'small'}>Подписать</Button>
    </Col>
    <Col span={24}>
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Typography.Text style={{ color: '#262626', fontFamily: 'SFUIText Regular' }} >Подписи вашей компании</Typography.Text>
        </Col>
      </Row>
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <div style={{ display: 'flex' }}>
            <Icon component={() =>
              <img src={ECP} alt={'ECP'} />
            } style={{ width: 22, marginRight: 8 }} />
            <Row style={{ flex: 1 }} gutter={[0, 8]}>
              <InfoRow
                title={'Физ. лицо'}
                text={'Приходько Игорь Валерьевич'}
                leftColWidth={8}
              />
              <InfoRow
                title={'ИНН'}
                text={'403956572019'}
                leftColWidth={8}
              />
              <InfoRow
                title={'Email'}
                text={'prikhodko_igor@ukr.net'}
                leftColWidth={8}
              />
              <InfoRow
                title={'Подписано'}
                text={'12.23 / 12.03.2019'}
                leftColWidth={8}
              />
            </Row>
          </div>
        </Col>
      </Row>
    </Col>
  </Row>
</>;

export default Attachment;