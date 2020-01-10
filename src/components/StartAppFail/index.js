import React from 'react';
import { Alert, Row, Button } from 'antd';
import * as styles from './start-app-fail.module.scss';

const StartAppFail = () => <Row
  type="flex"
  justify="center"
  align="middle"
  className={styles.wrapper}
>
  <Alert
    message="Error: failed to connect, server not responding"
    description={
      <Row type="flex" justify="center">
        <Button type="danger" onClick={() => window.location.reload()}>
          Try again
        </Button>
      </Row>
    }
    type="error"
  />
</Row>;

export default StartAppFail;