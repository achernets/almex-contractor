import React, { useState } from 'react';
import { Form, Checkbox } from 'formik-antd';
import { Formik } from 'formik';
import { Button, Typography, Row, Col, notification } from 'antd';
import { I18n } from 'react-redux-i18n';
import { Client, Organization } from 'components/FormData';
import { mrkClient, mrkOrganization } from 'utils/structures';
import Loader from 'components/Loader';
import { MrkClientServiceClient } from 'api';
import { Redirect } from 'react-router-dom';
import * as styles from '../../signup.module.scss';
import * as Yup from 'yup';
import { NotificationError } from 'utils/helpers';
import { MrkClientSchema, MrkOrganizationSchema } from 'constants/schema';

const FormData = ({ isFetching, isSaving }) => {
  const [isRegistration, setRegistration] = useState(false);
  const formItemProps = {
    labelAlign: 'left',
    labelCol: { span: 9 },
    wrapperCol: { span: 15 }
  };
  if (isRegistration) return <Redirect
    to={{
      pathname: '/signIn'
    }}
  />;
  return <div className={styles.wrapper}>
    <Row type="flex" align="middle" justify="center">
      <Typography.Title level={3}>{I18n.t('SignUp.title')}</Typography.Title>
    </Row>
    {isFetching ? <Loader /> : <Formik
      enableReinitialize={true}
      initialValues={{
        ...new MrkAccount({
          clientList: [mrkClient({ chief: true })],
          organization: null
        }),
        useOrganization: false
      }}
      validationSchema={Yup.object().shape({
        organization: Yup.object().nullable().when('useOrganization', {
          is: true,
          then: MrkOrganizationSchema()
        }),
        clientList: Yup.array().min(1).max(1).of(MrkClientSchema())
      })}
      onSubmit={async (values) => {
        try {
          await MrkClientServiceClient.registration(values.clientList[0], 'xc12XC!@', values.organization);
          setRegistration(true);
          notification.success({
            key: 'registration',
            message: I18n.t('notification.registration_message'),
            description: I18n.t('notification.registration_description'),
          });
        } catch (error) {
          NotificationError(error, 'registration');
        }
      }}
    >
      {({ setValues, values }) => {
        return (
          <Form layout={'horizontal'} className={styles.form}>
            <Row type="flex" align="middle" justify="center" gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  {...formItemProps}
                  label={I18n.t('Profile.type_account')}
                  name={'useOrganization'}
                >
                  <Checkbox name={'useOrganization'} onChange={e => {
                    setValues({ ...values, useOrganization: e.target.checked, organization: e.target.checked ? mrkOrganization() : null });
                  }} size={'large'}>{I18n.t('Profile.legal_entity')}</Checkbox>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Typography.Text strong>{I18n.t(values.useOrganization ? 'Profile.info_legal_entity' : 'Profile.info_basic')}</Typography.Text>
              </Col>
              <Col span={24}>
                {values.useOrganization ?
                  <Organization formItemProps={formItemProps} MAX_CLIENTS_ORGANIZATION={1} /> :
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
                      {I18n.t('SignUp.registration')}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>);
      }}
    </Formik>}
  </div>;
};

export default FormData;