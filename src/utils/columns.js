import React from 'react';
import { invert } from 'lodash';
import { Attach, Mark } from 'components/Icons';
import { Tooltip, Icon } from 'antd';
import { I18n } from 'react-redux-i18n';
import { getSignInSystemText, isDataTime } from 'utils/helpers';
import moment from 'moment';

const getMarkDocument = (respStatus) => {
  switch (respStatus) {
    case MrkDocumentRespStatus.REQUIRED:
      return <Mark fill={'rgba(250, 173, 20, 0.4)'} stroke={'#FAAD14'} />;
    case MrkDocumentRespStatus.OPTIONAL:
    case MrkDocumentRespStatus.PROHIBITED:
      return <Mark fill={'#fffff'} stroke={'#C4C4C4'} />;
    case MrkDocumentRespStatus.DRAFT:
      return <Mark fill={'rgba(150, 226, 199, 0.3)'} stroke={'#96E2C7'} />;
    case MrkDocumentRespStatus.SEND:
      return <Mark fill={'rgba(92, 194, 103, 0.4)'} stroke={'#5CC267'} />;
    default:
      return <Mark fill={'rgba(196, 196, 196, 0.4)'} stroke={'#C4C4C4'} />;
  }
};

const name = {
  title: 'MrkDocument.name',
  dataIndex: 'name',
  render: (text, { hasAttachments = false, respStatus }) => {
    return <span style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Tooltip title={I18n.t(`MrkDocumentRespStatus.${invert(MrkDocumentRespStatus)[respStatus]}`)}>
        {getMarkDocument(respStatus)}
      </Tooltip>
      <span style={{
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginLeft: 4,
        marginRight: 4
      }}>{text}</span>
      {hasAttachments && <Tooltip title={I18n.t('MrkDocument.hasAttachments')}>
        <Attach />
      </Tooltip>}
    </span>;
  },
  ellipsis: true
};

const patternName = {
  title: 'MrkDocument.patternName',
  dataIndex: 'patternName',
  ellipsis: true
};

const extNumberAndDate = {
  title: 'MrkDocument.extNumberAndDate',
  dataIndex: 'externalNumber',
  width: 200,
  render: (_, { externalNumber, externalRegDate }) => {
    let text = '';
    if (externalNumber !== null) text = externalNumber;
    if (isDataTime(externalRegDate)) text = `${text} от ${moment(externalRegDate).format('DD.MM.YYYY')}`;
    return text;
  },
  ellipsis: true
};

const numberAndDate = {
  title: 'MrkDocument.numberAndDate',
  dataIndex: 'documentNumber',
  width: 200,
  render: (_, { documentNumber, documentRegDate }) => {
    let text = '';
    if (documentNumber !== null) text = documentNumber;
    if (isDataTime(documentRegDate)) text = `${text} от ${moment(documentRegDate).format('DD.MM.YYYY')}`;
    return text;
  },
  ellipsis: true
};

const extCameFrom = {
  title: 'MrkDocument.extCameFrom',
  dataIndex: 'extCameFrom',
  width: 120,
  ellipsis: true
};

const extAuthorName = {
  title: 'MrkDocument.extAuthorName',
  dataIndex: 'extAuthorName',
  width: 120,
  ellipsis: true
};

const createDate = {
  title: 'MrkDocument.createDate',
  key: 'createDate',
  width: 100,
  render: ({ createDate }) => moment(createDate).format('DD.MM.YYYY'),
  ellipsis: true
};

const signInSystem = {
  title: 'MrkDocument.signInSystem',
  dataIndex: 'signInSystem',
  ellipsis: false,
  width: 140,
  render: (signInSystem) => {
    switch (signInSystem) {
      case SignInSystem.ALMEX:
        return <span style={{
          color: '#F4B435',
          display: 'block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }}>{getSignInSystemText(signInSystem)}</span>;
      case SignInSystem.EXTERNAL:
        return <span style={{
          color: '#F4B435', display: 'block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }}>{getSignInSystemText(signInSystem)}</span>;
      case SignInSystem.BOTH:
        return <span style={{
          color: '#61B039', display: 'block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }}>{getSignInSystemText(signInSystem)}</span>;
      default:
        return '';
    }
  }
};

const remove = {
  title: null,
  key: 'remove',
  dataIndex: 'id',
  width: 40,
  render: () => <Icon type="delete" />,
  ellipsis: true
};

export const DOCUMENTS_DRAFT = [name, numberAndDate, createDate, remove];
export const DOCUMENTS_INPUT = [name, extNumberAndDate, extCameFrom, extAuthorName, createDate, signInSystem];
export const DOCUMENTS_OUTPUT = [name, numberAndDate, patternName, createDate, signInSystem];