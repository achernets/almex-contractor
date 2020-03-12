import React from 'react';
import { Row } from 'antd';
import { Ecp } from 'components/Icons';
import InfoRow from './InfoRow';
import moment from 'moment';
import * as styles from '../right-preview.module.scss';
import { I18n } from 'react-redux-i18n';

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
        title={I18n.t('MrkDigitalSignDetails.userName')}
        text={userName}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={I18n.t('MrkDigitalSignDetails.serialNumber')}
        text={serialNumber}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={I18n.t('MrkDigitalSignDetails.issuerDN')}
        text={issuerDN}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={I18n.t('MrkDigitalSignDetails.subjectDN')}
        text={subjectDN}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={I18n.t('MrkDigitalSignDetails.subjectSerialNumber')}
        text={subjectSerialNumber}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={I18n.t('MrkDigitalSignDetails.subjectSerialNumberIndividual')}
        text={subjectSerialNumberIndividual}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={I18n.t('MrkDigitalSignDetails.email')}
        text={email}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={I18n.t('MrkDigitalSignDetails.organization')}
        text={organization}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={I18n.t('MrkDigitalSignDetails.fullName')}
        text={fullName}
        leftColWidth={8}
        gutter={[0, 0]}
      />
      <InfoRow
        title={I18n.t('MrkDigitalSignDetails.signDate')}
        text={moment(signDate).format('DD.MM.YYYY HH:mm')}
        leftColWidth={8}
        gutter={[0, 0]}
      />
    </Row>
  </div>;

export default DigitalInformation;