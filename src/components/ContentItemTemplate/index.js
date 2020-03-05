import React from 'react';
import { Form, Input, Checkbox, DatePicker, Radio, Select } from 'formik-antd';
import moment from 'moment';
import { get, keys, map } from 'lodash';
import { useFormikContext } from 'formik';
import UserChoice from './UserChoice';
import HandBook from './HandBook';

const ContentItemTemplate = ({ item, name, patternId }) => {
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
    case ContentItemType.USER_CHOICE:
      return <UserChoice
        name={name}
        settingLayout={settingLayout}
        patternId={patternId}
      />;
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
          {map(item.fields).map((itm, index) => <Select.Option key={index} value={itm}>{itm}</Select.Option>)}
        </Select>
      </Form.Item >;
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
          {map(item.fields).map((itm, index) => <Radio key={index} value={itm}>{itm}</Radio>)}
        </Radio.Group>
      </Form.Item>;
    case ContentItemType.HAND_BOOK:
      return <HandBook
        name={name}
        settingLayout={settingLayout}
      />;
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