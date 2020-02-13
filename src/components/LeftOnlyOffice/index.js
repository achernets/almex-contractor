import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';
import ScriptLoader from 'react-render-props-script-loader';
import Loader from 'components/Loader';
import { uniqueId } from 'lodash';
import { getOnlyOfficeUrl, getAttachmentUrl, getAttachmentName, getAttachmentExt, log } from 'utils/helpers';
import { Close } from 'components/Icons';
const editorId = uniqueId('editor_');

const LeftOnlyOffice = ({ mrkAttachment, close }) => {
  const [editor, setEditor] = useState(null);
  const loadEditor = () => {
    log(mrkAttachment);
    setEditor(new DocsAPI.DocEditor(editorId, {
      'document': {
        'fileType': getAttachmentExt(),
        'key': mrkAttachment.id,
        'permissions': {
          'download': false,
          'edit': false,
          'print': true,
          'review': false
        },
        'title': getAttachmentName(mrkAttachment),
        'url': getAttachmentUrl(mrkAttachment)
      },
      'editorConfig': {
        'lang': 'ru-RU',
        'mode': 'view',
      },
      'documentType': 'text',
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

  return <Drawer
    width={'100%'}
    style={{ width: mrkAttachment !== null ? 'calc(100% - 496px)' : 0 }}
    placement={'left'}
    closable={false}
    mask={false}
    onClose={false}
    destroyOnClose={true}
    visible={mrkAttachment !== null}
    bodyStyle={{ height: '100%', padding: 'unset', paddingTop: 24, position: 'relative' }}
  >
    <Close
      onClick={close}
    />
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
        }}></div>;
      }}
    </ScriptLoader>

  </Drawer>;

};
const mapStateToProps = state => ({
  mrkAttachment: state.mrkDocument.mrkAttachment
});
export default connect(mapStateToProps, null)(LeftOnlyOffice);