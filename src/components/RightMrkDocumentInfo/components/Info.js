import React from 'react';
import { Row } from 'antd';
import { map } from 'lodash';
import InfoRow from './InfoRow';
import moment from 'moment';
import { getContentItemValue } from 'utils/helpers';

const Info = ({ mrkDocumentData }) => {
  const { document, items } = mrkDocumentData;
  return <Row gutter={[0, 8]} >
    <InfoRow
      title={'Документ получен'}
      text={moment(document.createDate).format('HH.mm / DD.MM.YYYY')}
    />
    <InfoRow
      title={'Отправитель'}
      text={'Казахмыс Бухгалтерия'}
    />
    <InfoRow
      title={'Исходящий номер'}
      text={'12345677'}
    />
    <InfoRow
      title={'Автор документа'}
      text={document.creatorId}
    />
    <InfoRow
      title={'Email'}
      text={'Фамилия Имя Отчество'}
    />
    {map(items, item => <InfoRow
      key={item.id}
      title={item.oName}
      text={getContentItemValue(item)}
    />)}
  </Row>;
};

export default Info;