import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Select } from 'formik-antd';
import { get, find, map, debounce } from 'lodash';
import { useFormikContext } from 'formik';
import { MrkClientServiceClient } from 'api';
import { getHbValue, log } from 'utils/helpers';
import { useMountedState, useFirstMountState } from 'react-use';

const HandBook = ({ token, locale, name, settingLayout }) => {
  const { values, setFieldValue } = useFormikContext();
  const [hbValues, setHbValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMounted = useMountedState();
  const isFirstMount = useFirstMountState();

  const column = get(values, `${name}.value.hbValue.column`, null);

  useEffect(() => {
    if (isFirstMount) getHandBookValues();
  }, []);

  const getHandBookValues = async (text) => {
    if (isMounted()) setLoading(true);
    const searchFilterItem = text ? [new FilterItem({
      field: 'rValue',
      value: text,
      condition: FilterCondition.CONTAIN,
      fType: FilterFieldType.STRING
    }), new FilterItem({
      field: 'rColumnId',
      value: column.id,
      condition: FilterCondition.EQUAL,
      fType: FilterFieldType.STRING
    })] : [];

    const filter = new KazFilter({
      position: 0,
      countFilter: 15,
      orders: [],
      items: [...searchFilterItem]
    });
    try {
      const result = await MrkClientServiceClient.getAllHandBookRows(token, get(values, `${name}.handBookId`, null), filter);
      if (isMounted()) {
        setHbValues(result);
        setLoading(false);
      }
    } catch (error) {
      log('getAllUsers', error);
      if (isMounted()) setLoading(false);
    }
  };

  const getHandBookValuesDebounce = debounce(getHandBookValues, 800);

  const getPrefix = () => {
    switch (column.columnType) {
      case HBColumnType.NUMBER:
        return `value.any`;
      case HBColumnType.USER_CHOICE:
        return `user.id`;
      default:
        return `value.${locale}`;
    }
  };

  const formName = getPrefix();

  return <Form.Item
    {...settingLayout}
    hasFeedback={false}
    name={`${name}.value.hbValue.row.row.values.${column.id}.${formName}`}
  >
    <Select
      loading={loading}
      name={`${name}.value.hbValue.row.values.${column.id}.${formName}`}
      showSearch
      value={getHbValue(get(values, `${name}.value.hbValue.row.values.${column.id}`, null), locale)}
      //optionLabelProp={'children'}
      onChange={(e) => setFieldValue(`${name}.value.hbValue.row`, e ? find(hbValues, { id: e }) : null)}
      filterOption={false}
      onSearch={getHandBookValuesDebounce}
    >
      {map(hbValues).map((itm, index) => <Select.Option key={index} value={itm.id}>{getHbValue(get(itm, `values.${column.id}`), locale)}</Select.Option>)}
    </Select>
  </Form.Item >;
};

const mapStateToProps = state => ({
  token: state.auth.token,
  locale: state.i18n.locale
});
export default connect(mapStateToProps)(HandBook);