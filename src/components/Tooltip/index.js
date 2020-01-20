import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as ATooltip } from 'antd';

const Tooltip = ({ children, trigger = 'hover', title = '', ...props }) => <ATooltip trigger={trigger} title={title} {...props}>
  {children}
</ATooltip>;

Tooltip.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired
};

export default Tooltip;