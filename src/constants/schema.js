
import * as Yup from 'yup';
import { I18n } from 'react-redux-i18n';

const MrkClientSchema = () => Yup.object().shape({
  lastName: Yup.string().nullable().required(I18n.t('form.required')),
  firstName: Yup.string().nullable().required(I18n.t('form.required')),
  middleName: Yup.string().nullable().required(I18n.t('form.required')),
  position: Yup.string().nullable().required(I18n.t('form.required')),
  login: Yup.string().nullable().required(I18n.t('form.required')),
  inn: Yup.string().nullable().required(I18n.t('form.required')),
  birthDate: Yup.number().min(0, I18n.t('form.required')),
  contacts: Yup.array().min(2).of(
    Yup.object().shape({
      cType: Yup.number().nullable().required(I18n.t('form.required')),
      cValue: Yup.mixed().when('cType', {
        is: val => {
          return val === MrkContactType.PHONE;
        },
        then: Yup.string().nullable().required(I18n.t('form.required')),
        otherwise: Yup.string().nullable().email(I18n.t('form.email')).required(I18n.t('form.required'))
      })
    })
  )
});

const MrkOrganizationSchema = () => Yup.object().shape({
  name: Yup.string().nullable().required(I18n.t('form.required')),
  edrpo: Yup.string().nullable().required(I18n.t('form.required')),
  adress: Yup.string().nullable().required(I18n.t('form.required'))
});

export {
  MrkClientSchema,
  MrkOrganizationSchema
};