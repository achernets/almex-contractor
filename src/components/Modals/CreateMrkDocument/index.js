import React, { useEffect, useRef } from 'react';
import { Button, Tooltip, Col, Row } from 'antd';
import { Formik } from 'formik';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';
import { get, size, filter, map, isEmpty, uniqueId } from 'lodash';
import ListDocumentPatterns from './components/ListDocumentPatterns';
import FormData from './components/FormData';
import { Modal } from 'components/Modals';
import { log } from 'utils/helpers';
import { initState, prepareDraftDocument, getAllDocumentPatterns, createOrUpdateMrkDocument } from 'redux/actions/Modal/createMrkDocument';
import Loader from 'components/Loader';
import { MrkClientServiceClient, subscribe, unsubscribe } from 'api';
import * as Yup from 'yup';
const socketId = uniqueId('socket_update_doc_');

const CreateMrkDocument = ({ hideModal,
  token,
  newMrkDocument,
  parentId,
  extRespPatternId,
  extRespReq,
  step,
  documentPattern,
  isPrepareFetching,
  isFetching,
  mrkDocumentData,
  prepareDraftDocument,
  getAllDocumentPatterns,
  createOrUpdateMrkDocument,
  initState,
  accountId,
  showModal
}) => {
  const formRef = useRef(null);

  const updateAttachment = async (id) => {
    let result = null;
    try {
      result = await MrkClientServiceClient.getMrkAttachmentById(token, id);
      formRef.current.setValues({
        ...formRef.current.values, attachments: map(get(formRef, 'current.values.attachments', []), item => {
          if (get(item, 'attachment.id', null) === result.id) return { ...item, attachment: result };
          return item;
        })
      });
    } catch (error) {
      log(error);
    }
    return result;
  };

  useEffect(() => {
    subscribe(socketId, `/ws/${accountId}`, (msg) => {
      switch (msg.event) {
        case 'ATTACHMENT_EVENT_EDITING':
          updateAttachment(msg.id);
          break;
        default:
          break;
      }
    });
    if (!newMrkDocument) return;
    if (extRespReq === MrkDocResponceType.REQUIRED_SAME) {
      prepareDraftDocument(extRespPatternId, parentId);
    } else {
      getAllDocumentPatterns(extRespPatternId, parentId);
    }
    return () => {
      initState();
      unsubscribe(socketId);
    };
  }, []);

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={Yup.object({
        document: Yup.object({
          name: Yup.string().required(I18n.t('form.required'))
        })
      })}
      innerRef={formRef}
      initialValues={{
        ...mrkDocumentData,
        certificate: null,
        send: false,
        attachments: get(mrkDocumentData, 'atts', []).map(item => Object.assign({
          attachment: item,
          file: null
        }))
      }}
      onSubmit={(values) => {
        const data = new MrkDocumentData({
          ...values,
          atts: values.attachments.map(item => item.attachment)
        });
        createOrUpdateMrkDocument(data, values.send, values.certificate);
      }}
    >{({ handleSubmit, values, setValues, setFieldValue }) => {
      const isEditing = size(filter(values.attachments, item => {
        return get(item, 'attachment.isEditing', false);
      })) > 0;
      return (
        <Modal
          visible={true}
          width={720}
          centered
          bodyStyle={{
            height: 'calc(100vh - 180px)',
            padding: 0,
            overflowY: 'hidden'
          }}
          maskClosable={false}
          title={I18n.t('CreateMrkDocument.title')}
          onCancel={() => hideModal('MODAL_CREATE_MRK_DOCUMENT')}
          footer={step === 2 ? [
            <Row type="flex" gutter={[16, 0]} justify="end" key="step=2">
              <Col>
                <Tooltip title={I18n.t('common.attchment_editing')} trigger={isEditing ? 'hover' : 'none'}>
                  <Button icon="lock" key="id" type="primary" disabled={isEditing} loading={isFetching}
                    onClick={() => showModal('MODAL_FILE_SIGN', {
                      submitModal: async (result) => {
                        setValues({ ...values, certificate: result, send: true });
                        handleSubmit();
                      }
                    })}
                  >
                    {I18n.t('CreateMrkDocument.send_doc_ecp')}
                  </Button>
                </Tooltip>
              </Col>
              <Col>
                <Tooltip title={I18n.t('common.attchment_editing')} trigger={isEditing ? 'hover' : 'none'}>
                  <Button key="back" loading={isFetching} disabled={isEditing} onClick={(e) => {
                    setValues({
                      ...values, certificate: null, send: true
                    });
                    handleSubmit(e);
                  }}>
                    {I18n.t('CreateMrkDocument.send_doc')}
                  </Button>
                </Tooltip>
              </Col>
              <Col>
                <Button key="submit" loading={isFetching} onClick={(e) => {
                  setValues({
                    ...values, certificate: null, send: false
                  });
                  handleSubmit(e);
                }}>
                  {I18n.t('CreateMrkDocument.send_in_draft')}
                </Button>
              </Col>
            </Row>
          ] : [<Button key="submit" loading={isPrepareFetching} disabled={isEmpty(documentPattern)} onClick={() => prepareDraftDocument(documentPattern.id, parentId)}>
            {I18n.t('common.next')}
          </Button>
            ]}
        >
          {isFetching && <Loader />}
          {step === 1 && <ListDocumentPatterns extRespPatternId={extRespPatternId} parentId={parentId} />}
          {step === 2 && <FormData showModal={showModal} removeEcp={async (attachment, index) => {
            try {
              const newAttachment = new MrkAttachment({ ...attachment, hasDigitalSign: false, digitalSigns: [], isEditing: true });
              showModal('MODAL_ATTACHMENT_EDIT', {
                mrkAttachment: newAttachment
              });
            } catch (error) {
              log(error);
            }
          }} />}
        </Modal>
      );
    }}
    </Formik>
  );
};
const mapStateToProps = state => ({
  token: state.auth.token,
  accountId: state.auth.accountId,
  step: state.modal.createMrkDocument.step,
  documentPattern: state.modal.createMrkDocument.documentPattern,
  mrkDocumentData: state.modal.createMrkDocument.mrkDocumentData,
  isFetching: state.modal.createMrkDocument.isFetching,
  isPrepareFetching: state.modal.createMrkDocument.isPrepareFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideModal: actions.hideModal,
      showModal: actions.showModal,
      prepareDraftDocument,
      getAllDocumentPatterns,
      createOrUpdateMrkDocument,
      initState
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CreateMrkDocument);