import React, { useState, useEffect } from 'react';
import { Modal } from 'components/Modals';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';
import ScriptLoader from 'react-render-props-script-loader';
import Loader from 'components/Loader';
import { uniqueId } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { getOnlyOfficeUrl, getAttachmentUrl, getFio, getTypeOnlyOffice, onlyOfficeCallBackUrl, getAttachmentName, getAttachmentExt, log } from 'utils/helpers';
import Empty from 'components/Empty';
const editorId = uniqueId('editor_');

const AttachmentEdit = ({ mrkAttachment, client, hideModal }) => {
  const [editor, setEditor] = useState(null);
  const loadEditor = () => {
    if (getTypeOnlyOffice(mrkAttachment) === null) return null;
    log('mrkAttachment', mrkAttachment);
    log('url', getAttachmentUrl(mrkAttachment));
    log('callback', onlyOfficeCallBackUrl(mrkAttachment));
    setEditor(new DocsAPI.DocEditor(editorId, {
      'document': {
        'fileType': getAttachmentExt(mrkAttachment),
        'key': mrkAttachment.id,
        'permissions': {
          'download': false,
          'edit': true,
          'print': true,
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
    }));
  };

  useEffect(() => {
    if (editor !== null && mrkAttachment !== null) setTimeout(loadEditor, 200);
    return () => {
      if (editor !== null) editor.destroyEditor();
    };
  }, [mrkAttachment]);

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
    title={I18n.t('ONLY_OFFICE')}
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
