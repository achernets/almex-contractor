import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';
import scriptLoader from 'react-async-script-loader';
import Loader from 'components/Loader';
import { uniqueId } from 'lodash';
import { Close } from 'components/Icons';
const editorId = uniqueId('editor_');

const LeftOnlyOffice = ({ isScriptLoaded, mrkAttachment, close }) => {
  useEffect(() => {
    let editor = null;
    const loader = () => {
      editor = new DocsAPI.DocEditor(editorId, {
        'document': {
          'fileType': 'docx',
          'key': 'aa2d732c-8476-44c9-b0f1-60275c2c9665_0',
          'permissions': {
            'download': false,
            'edit': false,
            'print': true,
            'review': false
          },
          'title': 'Новый документ Word',
          'url': 'https://qa.almexecm.com:8443/kaz-server-almexecm-qa/attachment?token=44a142a6-f694-4970-b786-2458e5da36ef_ru&id=aa2d732c-8476-44c9-b0f1-60275c2c9665&type=0&policyType=0'
        },
        'editorConfig': {
          'lang': 'ru-RU',
          'mode': 'view',
        },
        'documentType': 'text',
        'height': '100%',
        'width': '100%',
        'type': 'desktop'
      });
    };
    if (mrkAttachment !== null) setTimeout(loader, 200);
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
    {!isScriptLoaded && <Loader />}
    <Close
      onClick={close}
    />
    <div id={editorId} style={{
      height: '100%'
    }}></div>
  </Drawer>;

};
const mapStateToProps = state => ({
  mrkAttachment: state.mrkDocument.mrkAttachment
});
export default scriptLoader(['https://only.almexecm.com/web-apps/apps/api/documents/api.js'])(connect(mapStateToProps, null)(LeftOnlyOffice));