import React, { useEffect } from 'react';
import { Modal } from 'components/Modals';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';
import ScriptLoader from 'react-render-props-script-loader';
import Loader from 'components/Loader';
import { uniqueId } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { getOnlyOfficeUrl, getAttachmentUrl, getFio, getTypeOnlyOffice, onlyOfficeCallBackUrl, getAttachmentName, getAttachmentExt } from 'utils/helpers';
import Empty from 'components/Empty';
import { MrkClientServiceClient } from 'api';
const editorId = uniqueId('editor_');
let editor = null;
const AttachmentEdit = ({ token, mrkAttachment, client, hideModal }) => {

  const loadEditor = () => {
    if (getTypeOnlyOffice(mrkAttachment) === null) return null;
    if (editor !== null) editor.destroyEditor();
    editor = new DocsAPI.DocEditor(editorId, {
      'events': {
        'onOutdatedVersion': () => hideModal('MODAL_ATTACHMENT_EDIT')
      },
      'document': {
        'fileType': getAttachmentExt(mrkAttachment),
        'key': `${mrkAttachment.id}_${mrkAttachment.fileVersion}`,
        'permissions': {
          'download': false,
          'edit': !mrkAttachment.hasDigitalSign,
          'print': !mrkAttachment.hasDigitalSign,
          'review': false
        },
        'title': getAttachmentName(mrkAttachment),
        'url': getAttachmentUrl(mrkAttachment)
      },
      'editorConfig': {
        'callbackUrl': onlyOfficeCallBackUrl(mrkAttachment),
        'lang': 'ru-RU',
        'mode': 'edit',
        'user': {
          'id': client.id,
          'name': getFio(client)
        },
        'plugins': {
          'url': '',
          'pluginsData': []
        }
      },
      'documentType': getTypeOnlyOffice(mrkAttachment),
      'height': '100%',
      'width': '100%',
      'type': 'desktop'
    });
  };

  useEffect(() => {
    if (editor !== null && mrkAttachment !== null) setTimeout(loadEditor, 200);
  }, [mrkAttachment]);

  useEffect(() => {
    let markInterval = null;
    const markAttachment = () => {
      MrkClientServiceClient.markAttachmentAsEditing(token, mrkAttachment.id);
    };
    if (!mrkAttachment.hasDigitalSign) {
      markInterval = setInterval(markAttachment, 15000);
      markAttachment();
    }
    return () => {
      clearTimeout(markInterval);
      if (editor !== null) {
        editor.destroyEditor();
        editor = null;
      }
    };
  }, []);
  return <Modal
    visible={true}
    centered
    width={'100%'}
    style={{
      height: '100%'
    }}
    onCancel={() => hideModal('MODAL_ATTACHMENT_EDIT')}
    maskClosable={false}
    bodyStyle={{
      height: 'calc(100vh - 55px)',
      padding: 0,
      overflowY: 'hidden'
    }}
    title={I18n.t('common.editor')}
    footer={null}
  >
    <ScriptLoader
      type="text/javascript"
      src={getOnlyOfficeUrl()}
      onLoad={() => setTimeout(loadEditor, 200)}
    >
      {({ loading, error }) => {
        if (loading) return <Loader />;
        if (error) return <h3>Failed to load onlyOfffice: {error.message}</h3>;
        return <div id={editorId} style={{
          height: '100%'
        }}>
          {mrkAttachment !== null && getTypeOnlyOffice(mrkAttachment) === null && <Empty description={I18n.t('common.no_view_or_edit_attachment')} />}
        </div>;
      }}
    </ScriptLoader>
  </ Modal>;
};

const mapStateToProps = state => ({
  token: state.auth.token,
  client: state.auth.client
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideModal: actions.hideModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AttachmentEdit);
