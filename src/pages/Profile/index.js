import React from 'react';
import { SubLayout, HeaderLogo } from 'components/LayoutApp';
import ListDocumentPatterns from 'components/Modals/CreateMrkDocument/components/ListDocumentPatterns';
const Profile = () => <>
  <HeaderLogo />
  <SubLayout>
    <ListDocumentPatterns />
  </SubLayout>
</>;

export default Profile;