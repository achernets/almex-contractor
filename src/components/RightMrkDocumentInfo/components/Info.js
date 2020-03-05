import React from 'react';
import { map } from 'lodash';
import InfoRow from './InfoRow';
import moment from 'moment';
import { getContentItemValue, isDataTime } from 'utils/helpers';
import { I18n } from 'react-redux-i18n';

const Info = ({ mrkDocumentData }) => {
  const { document, items } = mrkDocumentData;
  return <>
    <InfoRow
      title={I18n.t('MrkDocument.createDate')}
      text={moment(document.createDate).format('DD.MM.YYYY HH:mm')}
    />
    <InfoRow
      title={I18n.t('MrkDocument.extCameFrom')}
      text={document.extCameFrom}
    />
    <InfoRow
      title={I18n.t('MrkDocument.documentNumber')}
      text={document.documentNumber}
    />
    <InfoRow
      title={I18n.t('MrkDocument.documentRegDate')}
      text={isDataTime(document.documentRegDate) ? moment(document.documentRegDate).format('DD.MM.YYYY HH:mm') : null}
    />
    <InfoRow
      title={I18n.t('MrkDocument.extCameFrom')}
      text={document.extAuthorName}
    />
    <InfoRow
      title={I18n.t('MrkDocument.extAuthorEmail')}
      text={document.extAuthorEmail}
    />
    <InfoRow
      title={I18n.t('MrkDocument.externalNumber')}
      text={document.externalNumber}
    />
    <InfoRow
      title={I18n.t('MrkDocument.externalRegDate')}
      text={isDataTime(document.externalRegDate) ? moment(document.externalRegDate).format('DD.MM.YYYY HH:mm') : null}
    />
    {map(items, item => <InfoRow
      key={item.id}
      title={item.oName}
      text={getContentItemValue(item)}
    />)}
  </>;
};

export default Info;