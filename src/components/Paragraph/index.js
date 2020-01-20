import React, { useState } from 'react';
import { Typography } from 'antd';
const Paragraph = ({ children, ellipsis, ...props }) => {
  const [count, setCount] = useState(0);

  return <Typography.Paragraph
    key={count}
    {...props}
    ellipsis={{
      ...ellipsis,
      onExpand: () => {
        setCount(count + 1);
      }
    }}>
    {children}
  </Typography.Paragraph>;
};

export default Paragraph;