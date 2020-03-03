import React from 'react';
import { map } from 'lodash';
import InfoRow from './InfoRow';
import moment from 'moment';
import { getContentItemValue } from 'utils/helpers';
import { I18n } from 'react-redux-i18n';

const Info = ({ mrkDocumentData }) => {
  const { document, items } = mrkDocumentData;
  return <>
    <InfoRow
      title={I18n.t('MrkDocument.createDate')}
      text={moment(document.createDate).format('HH.mm / DD.MM.YYYY')}
    />
    <InfoRow
      title={I18n.t('MrkDocument.extCameFrom')}
      text={document.extCameFrom}
    />
    <InfoRow
      title={I18n.t('MrkDocument.extNumber')}
      text={document.extNumber}
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
      text={document.externalRegDate !== -1 && document.externalRegDate !== null ? moment(document.externalRegDate).format('HH.mm / DD.MM.YYYY') : null}
    />
    {map(items, item => <InfoRow
      key={item.id}
      title={item.oName}
      text={getContentItemValue(item)}
    />)}
  </>;
};

export default Info;