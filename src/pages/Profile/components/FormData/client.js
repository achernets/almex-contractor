import React from 'react';
import { Form, Input, DatePicker } from 'formik-antd';
import { FieldArray, useFormikContext } from 'formik';
import { I18n } from 'react-redux-i18n';
import { Button, Row, Col, Form as AForm } from 'antd';
import { map, get } from 'lodash';
import moment from 'moment';

const Client = ({ formItemProps, prefix = '' }) => {
  const { values, setFieldValue } = useFormikContext();
  return <>
    <Form.Item name={`${prefix}lastName`}
      {...formItemProps}
      label={I18n.t('MrkClient.lastName')}
    >
      <Input name={`${prefix}lastName`} placeholder={I18n.t('form.enter_value')} size={'large'} />
    </Form.Item>
    <Form.Item name={`${prefix}firstName`}
      {...formItemProps}
      label={I18n.t('MrkClient.firstName')}
    >
      <Input name={`${prefix}firstName`} placeholder={I18n.t('form.enter_value')} size={'large'} />
    </Form.Item>
    <Form.Item name={`${prefix}middleName`}
      {...formItemProps}
      label={I18n.t('MrkClient.middleName')}
    >
      <Input name={`${prefix}middleName`} placeholder={I18n.t('form.enter_value')} size={'large'} />
    </Form.Item>
    <Form.Item name={`${prefix}position`}
      {...formItemProps}
      label={I18n.t('MrkClient.position')}
    >
      <Input name={`${prefix}position`} placeholder={I18n.t('form.enter_value')} size={'large'} />
    </Form.Item>
    <Form.Item name={`${prefix}birthDate`}
      {...formItemProps}
      label={I18n.t('MrkClient.birthDate')}
    >
      <DatePicker
        size={'large'}
        name={`${prefix}birthDate`}
        placeholder={I18n.t('form.select_date')}
        format={'DD.MM.YYYY'}
        showTime={false}
        value={get(values, `${prefix}birthDate`, -1) === -1 || get(values, `${prefix}birthDate`, -1) === null ? null : moment(get(values, `${prefix}birthDate`, -1), 'x')}
        onChange={(e) => setFieldValue(`${prefix}birthDate`, e === null ? null : e.format('x'))}
      />
    </Form.Item>
    <FieldArray
      name={`${prefix}contacts`}
      render={arrayHelpers => (
        <AForm.Item
          {...formItemProps}
          label={I18n.t('MrkClient.contacts_email')}
        >
          <Row gutter={[0, 24]}>
            {map(get(values, `${prefix}contacts`, []), (item, index) =>
              item.cType === MrkContactType.EMAIL ? <Col key={index}>
                <Input name={`${prefix}contacts.${index}.cValue`} placeholder={I18n.t('form.enter_value')} size={'large'} />
              </Col> : null
            )}
            <Col>
              <Button icon="plus" type="ghost" onClick={() => arrayHelpers.push(new MrkContactInfo({
                cType: MrkContactType.EMAIL,
                cValue: ''
              }))}>{I18n.t('common.add_more')}</Button>
            </Col>
          </Row>
        </AForm.Item>
      )}
    />
    <FieldArray
      name={`${prefix}contacts`}
      render={arrayHelpers => (
        <AForm.Item
          {...formItemProps}
          label={I18n.t('MrkClient.contacts_phone')}
        >
          <Row gutter={[0, 16]}>
            {map(get(values, `${prefix}contacts`, []), (item, index) =>
              item.cType === MrkContactType.PHONE ? <Col key={index}>
                <Input name={`${prefix}contacts.${index}.cValue`} placeholder={I18n.t('form.enter_value')} size={'large'} />
              </Col> : null
            )}
            <Col>
              <Button icon="plus" type="ghost" onClick={() => arrayHelpers.push(new MrkContactInfo({
                cType: MrkContactType.PHONE,
                cValue: ''
              }))}>{I18n.t('common.add_more')}</Button>
            </Col>
          </Row>
        </AForm.Item>
      )}
    />
    <Form.Item name={`${prefix}inn`}
      {...formItemProps}
      label={I18n.t('MrkClient.inn')}
    >
      <Input name={`${prefix}inn`} placeholder={I18n.t('form.enter_value')} size={'large'} />
    </Form.Item>
  </>;
};

export default Client;