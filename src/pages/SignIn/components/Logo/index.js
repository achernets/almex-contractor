import React from 'react';
import * as styles from './logo.module.scss';

const Logo = () => <div className={styles.wrapper}>
    <img src="/assets/img/Logo.svg" alt="logo" />
    <span className={styles.text}>contractor</span>
</div>;

export default Logo;