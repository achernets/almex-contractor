import React, { useEffect } from 'react';
import { actions } from 'react-redux-modals';
import { Form, Checkbox } from 'formik-antd';
import { Formik } from 'formik';
import { Button, Typography, Row, Col, Form as AForm } from 'antd';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFullAccountInfo, changeAccountInfo, signProfile } from 'redux/actions/profile';
import { Client, Organization } from 'components/FormData';
import { get } from 'lodash';
import Loader from 'components/Loader';
import { MrkClientSchema, MrkOrganizationSchema } from 'constants/schema';
import Scrollbar from 'components/Scrollbar';
import * as styles from './profile.module.scss';
import * as Yup from 'yup';

const FormData = ({ getFullAccountInfo, changeAccountInfo, signProfile, showModal, mrkAccount, isFetching, isSaving, MAX_CLIENTS_ORGANIZATION }) => {
  useEffect(() => {
    getFullAccountInfo();
  }, []);
  const formItemProps = {
    labelAlign: 'left',
    labelCol: { span: 9 },
    wrapperCol: { span: 15 }
  };
  const organization = get(mrkAccount, 'organization', null);
  return <Scrollbar>
    <div className={styles.wrapper}>
      <Row type="flex" align="middle" justify="center">
        <Typography.Title level={3}>{I18n.t('Profile.title')}</Typography.Title>
      </Row>
      {isFetching ? <Loader /> : <Formik
        enableReinitialize={true}
        initialValues={{
          ...mrkAccount,
          useOrganization: organization !== null,
          certificate: null
        }}
        validationSchema={Yup.object().shape({
          organization: Yup.object().nullable().when('useOrganization', {
            is: true,
            then: MrkOrganizationSchema()
          }),
          clientList: Yup.array().min(1).max(MAX_CLIENTS_ORGANIZATION).of(MrkClientSchema())
        })}
        onSubmit={async (values) => {
          changeAccountInfo(values);
        }}
      >
        {({ setValues, values, handleSubmit, dirty }) => (
          <Form layout={'horizontal'} className={styles.form}>
            <Row type="flex" align="middle" justify="center" gutter={[16, 16]}>
              {organization === null && <Col span={24}>
                <Form.Item
                  {...formItemProps}
                  label={I18n.t('Profile.type_account')}
                  name={'useOrganization'}
                >
                  <Checkbox name={'useOrganization'} onChange={e => {
                    setValues({ ...values, useOrganization: e.target.checked, organization: e.target.checked ? new MrkOrganization() : null });
                  }} size={'large'}>{I18n.t('Profile.legal_entity')}</Checkbox>
                </Form.Item>
              </Col>}
              <Col span={24}>
                <Typography.Text strong>{I18n.t(values.useOrganization ? 'Profile.info_legal_entity' : 'Profile.info_basic')}</Typography.Text>
              </Col>
              <Col span={24}>
                {values.organization !== null ?
                  <Organization formItemProps={formItemProps} MAX_CLIENTS_ORGANIZATION={MAX_CLIENTS_ORGANIZATION} /> :
                  <Client prefix="clientList.0." formItemProps={formItemProps} />
                }
              </Col>
              {(!values.signed || dirty) && <Col span={24}>
                <AForm.Item
                  {...formItemProps}
                  label={I18n.t('Profile.verify_your_identity')}
                >
                  <Button type="primary" htmlType="button" loading={isSaving}
                    onClick={() => showModal('MODAL_FILE_SIGN', {
                      submitModal: async (result) => {
                        if (dirty) {
                          setValues({ ...values, certificate: result });
                          handleSubmit();
                        } else {
                          signProfile(result);
                        }
                      }
                    })}
                  >
                    {I18n.t(dirty ? 'common.save_changes_with_ecp' : 'common.confirm_with_ecp')}
                  </Button>
                </AForm.Item>
              </Col>}
              <Col span={24}>
                <Row type="flex" justify="space-between" align="middle">
                  <Col>
                    <Button disabled={isSaving} htmlType="reset">
                      {I18n.t('common.reset')}
                    </Button>
                  </Col>
                  <Col>
                    <Button type="primary" htmlType="submit" loading={isSaving}>
                      {I18n.t('common.save_changes')}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>)
        }
      </Formik>}
    </div>
  </Scrollbar>;
};

const mapStateToProps = state => ({
  mrkAccount: state.profile.mrkAccount,
  isFetching: state.profile.isFetching,
  isSaving: state.profile.isSaving,
  MAX_CLIENTS_ORGANIZATION: state.settings.MAX_CLIENTS_ORGANIZATION
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFullAccountInfo,
      changeAccountInfo,
      signProfile,
      showModal: actions.showModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(FormData);