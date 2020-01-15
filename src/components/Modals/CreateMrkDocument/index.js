import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { Formik } from 'formik';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';
import { isEmpty } from 'lodash';
import { log } from 'utils/helpers';
import ListDocumentPatterns from './components/ListDocumentPatterns';
import FormData from './components/FormData';
import { MrkClientServiceClient } from 'api';

const CreateMrkDocument = ({ token, hideModal }) => {
  const [step, setStep] = useState(2);
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
        log(result);
      } catch (error) {
        log(error);
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
        typeSave: 1
      }}
      onSubmit={async (values, { setSubmitting }) => {
        log(values);
      }}
    >{({ handleSubmit, isSubmitting, values, setValues, initialValues }) => {
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
          title={I18n.t('CreateMrkDocument.title')}
          onCancel={() => hideModal('MODAL_CREATE_MRK_DOCUMENT')}
          footer={step === 2 ? [
            <Button key="id" type="primary" loading={isSubmitting} onClick={(e) => {
              setValues({ ...values, typeSave: 1 });
              handleSubmit(e);
            }}>
              Отправить с ЭЦП
            </Button>,
            <Button key="back" onClick={(e) => {
              setValues({ ...values, typeSave: 2 });
              handleSubmit(e);
            }}>
              Отправить
            </Button>,
            <Button key="submit" loading={isSubmitting} onClick={(e) => {
              setValues({ ...values, typeSave: 3 });
              handleSubmit(e);
            }}>
              В черновики
            </Button>
          ] : [<Button key="submit" loading={isLoadingDocumentData} disabled={isEmpty(documentData)} onClick={() => setStep(2)}>
            Дальше
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
      hideModal: actions.hideModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CreateMrkDocument);