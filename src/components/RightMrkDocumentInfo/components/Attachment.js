import React from 'react';
import { Typography, Row, Button, Col } from 'antd';
import { Ecp } from 'components/Icons';
import { AttachmentRow } from 'components/Attachment';
import classnames from 'classnames';
import InfoRow from './InfoRow';

import * as styles from '../right-preview.module.scss';

const Attachment = ({ attachment, onClick, active }) => <>
  <Row
    className={classnames(styles.attachment, { [styles.att_active]: active })}
    gutter={[0, 8]}>
    <Col span={19}>
      <AttachmentRow
        onClick={() => onClick(attachment)}
        attachment={attachment}
      />
    </Col>
    <Col span={5} className={styles.tr}>
      <Button type={'primary'} size={'small'}>Подписать</Button>
    </Col>
    <Col span={24}>
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Typography.Text className={styles.ecp_title} >Подписи вашей компании</Typography.Text>
        </Col>
      </Row>
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <div className={styles.ecp_wrapper}>
            <Ecp />
            <Row className={styles.ecp_content} gutter={[0, 8]}>
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
          <div className={styles.ecp_wrapper}>
            <Ecp />
            <Row className={styles.ecp_content} gutter={[0, 8]}>
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