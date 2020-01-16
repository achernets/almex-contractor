import React from 'react';
import { Typography, Row, Button, Upload } from 'antd';
import { Form, Input } from 'formik-antd';
import { useFormikContext, FieldArray } from 'formik';
import { I18n } from 'react-redux-i18n';
import { get, map } from 'lodash';
import Attachment, { UploadFile } from 'components/Attachment';
import ContentItemTemplate from 'components/ContentItemTemplate';
const FormData = () => {
  const { values } = useFormikContext();

  return <div style={{ padding: '12px 24px' }}>
    <Row>
      <Typography.Text strong>{get(values, 'document.patternName', '')}</Typography.Text>
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
        {map(values.items, (item, index) => <ContentItemTemplate
          key={index}
          item={item}
          name={`items.${index}`}
        />)}
        <FieldArray
          name="attachments"
          render={arrayHelpers => (
            <Form.Item
              labelAlign="left"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              name={`attachments`}
              label={I18n.t('common.attachments')}
            >
              {map(values.attachments, (item, index) => item.attachment === null ?
                <UploadFile
                  key={index}
                  file={item.file}
                  setAttachment={(el) => arrayHelpers.replace(index, {
                    attachment: el,
                    file: null
                  })}
                /> :
                <Attachment
                  key={index}
                  attachment={item.attachment}
                  removeAttachment={() => arrayHelpers.remove(index)}
                />
              )}
              <Upload fileList={[]} multiple={true}
                beforeUpload={(file) => {
                  arrayHelpers.push({
                    attachment: null,
                    file
                  });
                  return false;
                }}>
                <Button icon="paper-clip">{I18n.t('common.add_file')}</Button>
              </Upload>
            </Form.Item>
          )}
        />
      </Form>
    </Row>
  </div>;
};

export default FormData;