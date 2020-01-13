import React from 'react';
import { SubLayout } from 'components/LayoutApp';
import HeaderDocs from './components/HeaderDocs';
import Content from './components/Content';
const MrkDocuments = () => <>
  <HeaderDocs />
  <SubLayout>
    <Content />
  </SubLayout>
</>;

export default MrkDocuments;