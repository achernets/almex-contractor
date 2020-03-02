import React from 'react';
import { Row } from 'antd';
import { Ecp } from 'components/Icons';
import InfoRow from './InfoRow';
import moment from 'moment';
import * as styles from '../right-preview.module.scss';

const DigitalInformation = ({
  userName,
  serialNumber,
  issuerDN,
  subjectDN,
  signDate,
  subjectSerialNumber,
  subjectSerialNumberIndividual,
  email,
  organization,
  fullName
}) => <div className={styles.ecp_wrapper}>
    <Ecp style={{ width: 18, height: 28 }} />
    <Row className={styles.ecp_content} gutter={[0, 8]}>
      <InfoRow
        title={'userName'}
        text={userName}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={'serialNumber'}
        text={serialNumber}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={'issuerDN'}
        text={issuerDN}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={'subjectDN'}
        text={subjectDN}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={'subjectSerialNumber'}
        text={subjectSerialNumber}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={'subjectSerialNumberIndividual'}
        text={subjectSerialNumberIndividual}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={'email'}
        text={email}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={'organization'}
        text={organization}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={'fullName'}
        text={fullName}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={'Подписано'}
        text={moment(signDate).format('HH.mm / DD.MM.YYYY')}
        leftColWidth={8}
        gutter={[0, 0]}
      />
    </Row>
  </div>;

export default DigitalInformation;