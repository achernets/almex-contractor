import CreateMrkDocument from './CreateMrkDocument';
import ChangePassword from './ChangePassword';
import GetFileSign from './GetFileSign';
import AttachmentEdit from './AttachmentEdit';
import React from 'react';
import { Modal as AModal, ConfigProvider } from 'antd';
import { getAntdLocale } from 'utils/helpers';

export const Modal = ({ children, ...props }) => <ConfigProvider locale={getAntdLocale()}>
  <AModal {...props}>
    {children}
  </AModal>
</ConfigProvider>;

export const MODAL_CREATE_MRK_DOCUMENT = CreateMrkDocument;
export const MODAL_CHANGE_PASSWORD = ChangePassword;
export const MODAL_FILE_SIGN = GetFileSign;
export const MODAL_ATTACHMENT_EDIT = AttachmentEdit;