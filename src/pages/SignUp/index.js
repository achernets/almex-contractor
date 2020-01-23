import React from 'react';
import { SubLayout, LayoutApp, HeaderLogo } from 'components/LayoutApp';
import FormData from './components/FormData';
const SignUp = () => <LayoutApp>
  <HeaderLogo enableMenu={false} />
  <SubLayout>
    <FormData />
  </SubLayout>
</LayoutApp>;

export default SignUp;