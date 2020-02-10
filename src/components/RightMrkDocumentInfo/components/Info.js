import React from 'react';
import { map } from 'lodash';
import InfoRow from './InfoRow';
import moment from 'moment';
import { getContentItemValue } from 'utils/helpers';

const Info = ({ mrkDocumentData }) => {
  const { document, items } = mrkDocumentData;
  return <>
    <InfoRow
      title={'Документ получен'}
      text={moment(document.createDate).format('HH.mm / DD.MM.YYYY')}
    />
    <InfoRow
      title={'Отправитель'}
      text={document.extCameFrom}
    />
    <InfoRow
      title={'Исходящий номер'}
      text={document.extNumber}
    />
    <InfoRow
      title={'Автор документа'}
      text={document.extAuthorName}
    />
    <InfoRow
      title={'Email'}
      text={document.extAuthorEmail}
    />
    {map(items, item => <InfoRow
      key={item.id}
      title={item.oName}
      text={getContentItemValue(item)}
    />)}
  </>;
};

export default Info;