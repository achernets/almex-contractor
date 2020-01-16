import React from 'react';
import { Form, Input, Checkbox, DatePicker, Radio, Select } from 'formik-antd';
import moment from 'moment';
import { get, keys } from 'lodash';
import { useFormikContext } from 'formik';

const { Option } = Select;

const ContentItemTemplate = ({ item, name }) => {
  const { values, setFieldValue } = useFormikContext();
  const settingLayout = {
    labelAlign: 'left',
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    name,
    label: item.oName
  };
  switch (item.type) {
    case ContentItemType.TEXT_FIELD:
      return <Form.Item
        {...settingLayout}
        name={`${name}.value.strValue`}
      >
        <Input
          name={`${name}.value.strValue`}
        />
      </Form.Item>;
    case ContentItemType.COMBO_BOX:
      return <Form.Item
        {...settingLayout}
        name={`${name}.value.strValue`}
      >
        <Select
          name={`${name}.value.strValue`}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </Form.Item>;
    case ContentItemType.CHECKBOX:
      return <Form.Item
        {...settingLayout}
        name={`${name}.value.strValue`}
      >
        <Checkbox
          name={`${name}.value.strValue`}
          checked={get(values, `${name}.value.strValue`, 'false') === 'true'}
          onChange={(e) => setFieldValue(`${name}.value.strValue`, `${e.target.checked}`)}
        />
      </Form.Item>;
    case ContentItemType.CALENDAR:
      const value = Number(get(values, `${name}.value.strValue`, -1));
      return <Form.Item
        {...settingLayout}
        name={`${name}.value.strValue`}
      >
        <DatePicker
          name={`${name}.value.strValue`}
          placeholder={''}
          format={'DD.MM.YYYY HH:mm'}
          showTime={{ format: 'HH:mm' }}
          value={value === -1 ? null : moment(value)}
          onChange={(e) => setFieldValue(`${name}.value.strValue`, e === null ? null : `${e.format('x')}`)}
        />
      </Form.Item>;
    case ContentItemType.MULTILINE_TEXT_FIELD:
      return <Form.Item
        {...settingLayout}
        name={`${name}.value.strValue`}
      >
        <Input.TextArea
          name={`${name}.value.strValue`}
          rows={3}
        />
      </Form.Item>;
    case ContentItemType.SWITCH_ITEM:
      return <Form.Item
        {...settingLayout}
        name={`${name}.value.strValue`}
      >
        <Radio.Group name={`${name}.value.strValue`}>
          <Radio value={1}>ACOMBO_BOX</Radio>
          <Radio value={2}>BCOMBO_BOX</Radio>
          <Radio value={3}>CCOMBO_BOX</Radio>
          <Radio value={4}>DCOMBO_BOX</Radio>
        </Radio.Group>
      </Form.Item>;
    default:
      return <Form.Item
        {...settingLayout}
        name={`${name}.value.strValue`}
      >
        {keys(ContentItemType)[item.type]}
      </Form.Item>;
  }
};

export default ContentItemTemplate;