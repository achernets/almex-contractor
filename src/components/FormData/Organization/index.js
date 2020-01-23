import React from 'react';
import { Form, Input, Checkbox } from 'formik-antd';
import { Button, Row, Form as AForm, Icon } from 'antd';
import { I18n } from 'react-redux-i18n';
import { useFormikContext, FieldArray } from 'formik';
import { get } from 'lodash';
import Client from '../Client';
import { mrkClient } from 'utils/structures';
import * as styles from '../styles.module.scss';

const Organization = ({ formItemProps, MAX_CLIENTS_ORGANIZATION }) => {
  const { values, setFieldValue, setValues } = useFormikContext();
  return <>
    <Form.Item name="organization.name"
      {...formItemProps}
      label={I18n.t('MrkOrganization.name')}
    >
      <Input name="organization.name" placeholder={I18n.t('form.enter_value')} size={'large'} />
    </Form.Item>
    <Form.Item name="organization.adress"
      {...formItemProps}
      label={I18n.t('MrkOrganization.adress')}
    >
      <Input name="organization.adress" placeholder={I18n.t('form.enter_value')} size={'large'} />
    </Form.Item>
    <Form.Item name="organization.edrpo"
      {...formItemProps}
      label={I18n.t('MrkOrganization.edrpo')}
    >
      <Input name="organization.edrpo" placeholder={I18n.t('form.enter_value')} size={'large'} />
    </Form.Item>
    <FieldArray
      name={'clientList'}
      render={arrayHelpers => (<>
        {get(values, 'clientList', []).map((_, index) => <div key={index} className={styles.organization}>
          <AForm.Item
            {...formItemProps}
            label={<strong>{I18n.t('Profile.client')} {index + 1}</strong>}
            key={index}
            name={`clientList.${index}.chief`}
          >
            <Checkbox name={`clientList.${index}.chief`} size={'large'}
              disabled={get(values, 'clientList', []).length < 2}
              onChange={e => {
                if (e.target.checked) {
                  setValues({
                    ...values, clientList: get(values, 'clientList', []).map((item, idx) => {
                      return mrkClient({
                        ...item,
                        chief: index === idx
                      });
                    })
                  });
                } else {
                  setValues({
                    ...values, clientList: get(values, 'clientList', []).map((item, idx) => {
                      return mrkClient({
                        ...item,
                        chief: idx === 0
                      });
                    })
                  });
                }
              }}
            >{I18n.t('Profile.select_chief')}</Checkbox>
          </AForm.Item>
          <Client prefix={`clientList.${index}.`} formItemProps={formItemProps} />
          {get(values, 'clientList', []).length > 1 && <Icon type="close-circle" onClick={() => {
            if (get(values, `clientList.${index}.chief`, false)) setFieldValue('clientList.0.chief', true);
            arrayHelpers.remove(index);
          }} className={styles.remove} />}
        </div>)}
        {MAX_CLIENTS_ORGANIZATION > get(values, 'clientList', []).length && <Row type="flex" align="middle" justify="center">
          <Button icon="plus" type="ghost" onClick={() => arrayHelpers.push(mrkClient())}>{I18n.t('Profile.add_user')}</Button>
        </Row>}
      </>
      )}
    />
  </>;
};

export default Organization;