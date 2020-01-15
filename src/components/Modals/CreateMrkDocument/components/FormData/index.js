import React from 'react';
import { Typography, Row } from 'antd';
import { Form, Input } from 'formik-antd';
import { useFormikContext } from 'formik';
import { I18n } from 'react-redux-i18n';
import { get } from 'lodash';
const FormData = () => {
  const { values } = useFormikContext();
  return <div style={{ padding: '12px 24px' }}>
    <Row>
      <Typography.Text strong>{get(values, 'document.name', 's1')}</Typography.Text>
    </Row>
    <Row style={{ marginTop: 12 }} >
      <Form layout={'horizontal'}>
        <Form.Item
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="document.name"
          label={I18n.t('MrkDocument.name')}
        >
          <Input.TextArea name="document.name" rows={3} />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="document.name"
          label={I18n.t('MrkDocument.name')}
        >
          <Input name="document.name" />
        </Form.Item>
      </Form>
    </Row>
  </div>;
};

export default FormData;