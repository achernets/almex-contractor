import React, { useEffect } from 'react';
import { Form, Checkbox } from 'formik-antd';
import { Formik } from 'formik';
import { Button, Typography, Row, Col } from 'antd';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFullAccountInfo, changeAccountInfo } from 'redux/actions/profile';
import Client from './client';
import { get } from 'lodash';
import Organization from './organization';
import Loader from 'components/Loader';
import * as styles from './profile.module.scss';

//import * as Yup from 'yup';

const FormData = ({ getFullAccountInfo, changeAccountInfo, mrkAccount, isFetching, isSaving }) => {
  useEffect(() => {
    getFullAccountInfo();
  }, []);
  const formItemProps = {
    labelAlign: 'left',
    labelCol: { span: 9 },
    wrapperCol: { span: 15 }
  };
  const organization = get(mrkAccount, 'organization', null);
  return <div className={styles.wrapper}>
    <Row type="flex" align="middle" justify="center">
      <Typography.Title level={3}>{I18n.t('Profile.title')}</Typography.Title>
    </Row>
    {isFetching ? <Loader /> : <Formik
      enableReinitialize={true}
      initialValues={{
        ...mrkAccount,
        useOrganization: organization !== null
      }}
      // validationSchema={Yup.object().shape({
      //   login: Yup.string().required(I18n.t('form.required')),
      //   password: Yup.string().required(I18n.t('form.required'))
      // })}
      onSubmit={async (values) => {
        changeAccountInfo(values);
      }}
    >
      {({ setValues, values }) => (
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
                <Organization formItemProps={formItemProps} /> :
                <Client prefix="clientList.0." formItemProps={formItemProps} />
              }
            </Col>
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
  </div>;
};

const mapStateToProps = state => ({
  mrkAccount: state.profile.mrkAccount,
  isFetching: state.profile.isFetching,
  isSaving: state.profile.isSaving
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFullAccountInfo,
      changeAccountInfo
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(FormData);