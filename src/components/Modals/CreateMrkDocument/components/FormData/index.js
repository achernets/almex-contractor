import React from 'react';
import { Typography, Row, Col, Button, Upload } from 'antd';
import { Form, Input, DatePicker } from 'formik-antd';
import { useFormikContext, FieldArray } from 'formik';
import { I18n } from 'react-redux-i18n';
import { get, map } from 'lodash';
import { UploadFile } from 'components/Attachment';
import Attachment from 'components/RightMrkDocumentInfo/components/Attachment';
import { ATTACHMENT_ACCEPT } from 'constants/general';
import ContentItemTemplate from 'components/ContentItemTemplate';
import Scrollbar from 'components/Scrollbar';
import moment from 'moment';
const FormData = ({ showModal }) => {
  const { values, setFieldValue } = useFormikContext();
  return <Scrollbar>
    <div style={{ padding: '12px 24px' }}>
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
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="document.documentNumber"
            label={I18n.t('MrkDocument.documentNumber')}
          >
            <Input name="document.documentNumber" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="document.documentRegDate"
            label={I18n.t('MrkDocument.documentRegDate')}
          >
            <DatePicker
              name={'document.documentRegDate'}
              placeholder={''}
              format={'DD.MM.YYYY HH:mm'}
              showTime={{ format: 'HH:mm' }}
              value={get(values, 'document.documentRegDate', -1) === -1 ? null : moment(get(values, 'document.documentRegDate', null))}
              onChange={(e) => setFieldValue('document.documentRegDate', e === null ? -1 : e.valueOf())}
            />
          </Form.Item>
          {map(values.items, (item, index) => <ContentItemTemplate
            key={index}
            item={item}
            name={`items.${index}`}
            patternId={get(values, 'document.patternId', null)}
          />)}
          <FieldArray
            name="attachments"
            render={arrayHelpers => (
              <Form.Item
                labelAlign="left"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                hasFeedback={false}
                name={`attachments`}
                label={I18n.t('common.attachments')}
              >
                <Row gutter={[0, 16]}>
                  {map(values.attachments, (item, index) => <Col span={24} key={index}>
                    {item.attachment === null ?
                      <UploadFile
                        file={item.file}
                        setAttachment={(el) => arrayHelpers.replace(index, {
                          attachment: el,
                          file: null
                        })}
                      /> :
                      <Attachment
                        onClick={() => showModal('MODAL_ATTACHMENT_EDIT', {
                          mrkAttachment: item.attachment
                        })}
                        removeAttachment={(e) => {
                          e.stopPropagation();
                          arrayHelpers.remove(index);
                        }}
                        attachment={item.attachment}
                      />}
                  </Col>)}
                  <Col span={24}>
                    <Upload fileList={[]} multiple={true}
                      accept={ATTACHMENT_ACCEPT}
                      beforeUpload={(file) => {
                        arrayHelpers.push({
                          attachment: null,
                          file
                        });
                        return false;
                      }}>
                      <Button icon="paper-clip">{I18n.t('common.add_file')}</Button>
                    </Upload>
                  </Col>
                </Row>
              </Form.Item>
            )}
          />
        </Form>
      </Row>
    </div>
  </Scrollbar>;
};

export default FormData;