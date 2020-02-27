import React from 'react';
import { Typography, Row, Button, Col } from 'antd';
import { AttachmentRow } from 'components/Attachment';
import classnames from 'classnames';
import { map, size, reduce, filter } from 'lodash';
import DigitalInformation from './DigitalInformation';
import * as styles from '../right-preview.module.scss';


const Attachment = ({ attachment, onClick, active }) => {
  const almexSigns = reduce(attachment.digitalSigns, (hash, item) => {
    hash.push(...filter(item.signDetails, { signInSystem: 'ALMEX' }));
    return hash;
  }, []);
  const externalSigns = reduce(attachment.digitalSigns, (hash, item) => {
    hash.push(...filter(item.signDetails, { signInSystem: 'EXTERNAL' }));
    return hash;
  }, []);
  return <>
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
      {size(attachment.digitalSigns) > 0 && <>
        <Col span={24} style={{ paddingLeft: 31 }}>
          {size(almexSigns) > 0 && <><Row gutter={[0, 8]}>
            <Col span={24}>
              <Typography.Text className={styles.ecp_title} >Подписи отправителя</Typography.Text>
            </Col>
          </Row>
            <Row gutter={[0, 8]} style={{ fontSize: 12 }}>
              <Col span={24}>
                {map(almexSigns, (digitalSign, index) => <DigitalInformation key={index} {...digitalSign} />)}
              </Col>
            </Row>
          </>}
          {size(externalSigns) > 0 && <><Row gutter={[0, 8]}>
            <Col span={24}>
              <Typography.Text className={styles.ecp_title} >Подписи вашей компании</Typography.Text>
            </Col>
          </Row>
            <Row gutter={[0, 8]} style={{ fontSize: 12 }}>
              <Col span={24}>
                {map(externalSigns, (digitalSign, index) => <DigitalInformation key={index} {...digitalSign} />)}
              </Col>
            </Row>
          </>}
        </Col>
      </>}
    </Row>
  </>;
};

export default Attachment;