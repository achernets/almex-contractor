import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Select } from 'formik-antd';
import { get, find, map, compact, debounce } from 'lodash';
import { useFormikContext } from 'formik';
import { MrkClientServiceClient } from 'api';
import { getFioAlmex, log } from 'utils/helpers';
import { useMountedState } from 'react-use';

const UserChoice = ({ token, name, patternId, settingLayout }) => {
  const { values, setFieldValue } = useFormikContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMounted = useMountedState();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (text) => {
    if (isMounted()) setLoading(true);
    const fioFilterItem = text ? [new FilterItem({
      field: 'FIO',
      value: text,
      condition: FilterCondition.CONTAIN,
      fType: FilterFieldType.STRING
    })] : [];

    const patterIdFilter = patternId ? [new FilterItem({
      field: 'allowedInContent',
      value: patternId,
      condition: FilterCondition.EQUAL,
      fType: FilterFieldType.STRING,
      additionValue: get(values, `${name}.key`, null)
    })] : [];

    const filter = new KazFilter({
      position: 0,
      countFilter: 15,
      orders: [],
      items: [...fioFilterItem, ...patterIdFilter]
    });
    try {
      const result = await MrkClientServiceClient.getAllUsers(token, filter);
      if (isMounted()) {
        setUsers(result);
        setLoading(false);
      }
    } catch (error) {
      log('getAllUsers', error);
      if (isMounted()) setLoading(false);
    }
  };

  const fetchUsersDebounce = debounce(fetchUsers, 800);
  const currentValue = compact(get(values, `${name}.users`, []));

  return <Form.Item
    {...settingLayout}
    hasFeedback={false}
    name={`${name}.users`}
  >
    <Select
      loading={loading}
      name={`${name}.users`}
      showSearch
      mode="multiple"
      value={map(currentValue, item => item.id)}
      onChange={(e) => setFieldValue(`${name}.users`, e.map(el => new UserOrGroup(find([...users, ...currentValue], { id: el }))))}
      filterOption={false}
      optionLabelProp="children"
      onSearch={fetchUsersDebounce}
    >
      {map(users).map((itm, index) => <Select.Option key={index} value={itm.id}>{getFioAlmex(itm)}</Select.Option>)}
    </Select>
  </Form.Item >;
};

const mapStateToProps = state => ({
  token: state.auth.token
});
export default connect(mapStateToProps)(UserChoice);