import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Formik } from 'formik';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';
import { isEmpty } from 'lodash';
import { log, NotificationError } from 'utils/helpers';
import ListDocumentPatterns from './components/ListDocumentPatterns';
import FormData from './components/FormData';
import { MrkClientServiceClient } from 'api';
import { Modal } from 'components/Modals';
import { getMrkDocuments } from 'redux/actions/mrkDocuments';

const CreateMrkDocument = ({ token, hideModal, getMrkDocuments }) => {
  const [step, setStep] = useState(1);
  const [documentPattern, setDocumentPattern] = useState(null);
  const [isLoadingDocumentData, setLoadingDocumentData] = useState(false);
  const [documentData, setDocumentData] = useState({});
  useEffect(() => {
    if (documentPattern === null) return;
    let isCancelled = false;
    const prepareDocumentByPattern = async () => {
      if (!isCancelled) setLoadingDocumentData(true);
      try {
        const result = await MrkClientServiceClient.prepareDocumentByPattern(token, documentPattern.id);
        if (!isCancelled) setDocumentData(result);
        log('prepareDocumentByPattern', { ...result });
      } catch (error) {
        NotificationError(error, 'prepareDocumentByPattern');
      }
      if (!isCancelled) setLoadingDocumentData(false);
    };
    prepareDocumentByPattern();
    return () => {
      isCancelled = true;
    };
  }, [documentPattern]);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        ...documentData,
        ECP: false,
        send: false,
        attachments: []
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const data = new MrkDocumentData({
          ...values,
          atts: values.attachments.map(item => item.attachment)
        });
        log(data);
        try {
          const resultDocument = await MrkClientServiceClient.createOrUpdateMrkDocument(token, data);
          if (values.send) {
            await MrkClientServiceClient.sendDocument(token, resultDocument.document.id);
          }
          setSubmitting(false);
          getMrkDocuments();
          hideModal('MODAL_CREATE_MRK_DOCUMENT');
        } catch (error) {
          NotificationError(error, 'createOrUpdateMrkDocument');
          setSubmitting(false);
        }
      }}
    >{({ handleSubmit, isSubmitting, values, setValues }) => {
      return (
        <Modal
          visible={true}
          width={720}
          centered
          bodyStyle={{
            height: 'calc(100vh - 180px)',
            padding: 0,
            overflowY: 'auto'
          }}
          maskClosable={false}
          title={I18n.t('CreateMrkDocument.title')}
          onCancel={() => hideModal('MODAL_CREATE_MRK_DOCUMENT')}
          footer={step === 2 ? [
            <Button icon="lock" key="id" type="primary" loading={isSubmitting} onClick={(e) => {
              setValues({
                ...values, ECP: true, send: true
              });
              handleSubmit(e);
            }}>
              {I18n.t('CreateMrkDocument.send_doc_ecp')}
            </Button>,
            <Button key="back" loading={isSubmitting} onClick={(e) => {
              setValues({
                ...values, ECP: false, send: true
              });
              handleSubmit(e);
            }}>
              {I18n.t('CreateMrkDocument.send_doc')}
            </Button>,
            <Button key="submit" loading={isSubmitting} onClick={(e) => {
              setValues({
                ...values, ECP: false, send: false
              });
              handleSubmit(e);
            }}>
              {I18n.t('CreateMrkDocument.send_in_draft')}
            </Button>
          ] : [<Button key="submit" loading={isLoadingDocumentData} disabled={isEmpty(documentData)} onClick={() => setStep(2)}>
            {I18n.t('common.next')}
          </Button>
            ]}
        >
          {step === 1 && <ListDocumentPatterns documentPattern={documentPattern} setDocumentPattern={setDocumentPattern} />}
          {step === 2 && <FormData />}
        </Modal>
      );
    }}
    </Formik>
  );
};
const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideModal: actions.hideModal,
      getMrkDocuments
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CreateMrkDocument);