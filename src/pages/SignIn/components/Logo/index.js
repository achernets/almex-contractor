import React from 'react';
import { LOGO } from 'constants/img';
import * as styles from './logo.module.scss';

const Logo = () => <div className={styles.wrapper}>
    <img src={LOGO} alt="logo" />
    <span className={styles.text}>contractor</span>
</div>;

export default Logo;