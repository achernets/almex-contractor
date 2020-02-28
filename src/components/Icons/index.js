import React from 'react';
import { Icon } from 'antd';
import * as styles from './icons.module.scss';

const Close = (props) => <Icon type={'close'}
  className={styles.close}
  {...props}
/>;

const ECP_SVG = ({ color = '#1890FF', ...props }) => <svg width="24" height="34" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path d="M1.67874 13.1456L2.0949 13.4582C2.44769 13.7216 2.55695 14.2021 2.35304 14.5922L2.11654 15.0472C1.86935 15.5228 1.861 16.0874 2.09411 16.5703C2.32723 17.0532 2.77442 17.3977 3.30061 17.5001L3.79839 17.5971C4.23228 17.68 4.54101 18.0667 4.52563 18.5079L4.50972 19.0201C4.48703 19.5554 4.72145 20.0691 5.14022 20.4028C5.22913 20.4737 5.34569 20.5342 5.41244 20.5851V32.5995C5.41661 32.7458 5.49797 32.8787 5.62626 32.9492C5.75455 33.0193 5.91048 33.0162 6.0359 32.9411L12.0186 29.2749L18.0002 32.9411C18.0636 32.9797 18.1361 33 18.2101 33C18.2816 33.0003 18.352 32.9825 18.4153 32.9492C18.5439 32.8793 18.6258 32.746 18.6294 32.5995V20.5851C18.6962 20.5342 18.8127 20.4737 18.9017 20.4028C19.3217 20.0696 19.5577 19.5559 19.5368 19.0201L19.5186 18.5079C19.5027 18.0667 19.8112 17.68 20.2448 17.5971L20.742 17.5001C21.2682 17.3977 21.7154 17.0529 21.9483 16.5703C22.1814 16.0874 22.1728 15.5228 21.9256 15.0472L21.6894 14.5922C21.4852 14.2021 21.5944 13.7216 21.9472 13.4582L22.3637 13.1456C22.7915 12.8241 23.0432 12.32 23.0427 11.7847C23.0424 11.2496 22.79 10.7459 22.3618 10.4249L21.9488 10.1156C21.5952 9.85254 21.4854 9.37145 21.6899 8.98085L21.9256 8.52688C22.1728 8.05127 22.1811 7.48674 21.948 7.00383C21.7149 6.52091 21.2677 6.17646 20.7415 6.07399L20.2437 5.97699C19.8099 5.89407 19.5014 5.50763 19.5165 5.06618L19.5324 4.55406C19.5491 4.01796 19.3121 3.50532 18.8928 3.1713C18.4732 2.83701 17.921 2.71994 17.4021 2.85579L16.9082 2.98538C16.4816 3.09855 16.0363 2.88421 15.8582 2.4803L15.6493 2.01017C15.4316 1.51996 14.9956 1.16142 14.4728 1.04252C13.95 0.923355 13.4016 1.0579 12.9933 1.40549L12.6042 1.73664C12.2689 2.02399 11.774 2.02399 11.4387 1.73664L11.0494 1.40549C10.641 1.0579 10.0929 0.923355 9.57013 1.04252C9.04732 1.16142 8.61108 1.51996 8.39336 2.01017L8.18449 2.48057C8.00666 2.88447 7.5613 3.09855 7.13471 2.98538L6.64084 2.85579C6.12195 2.71994 5.56941 2.83701 5.15013 3.17104C4.73084 3.50532 4.49355 4.01796 4.51024 4.55406L4.52641 5.06618C4.54153 5.50763 4.2328 5.89407 3.79917 5.97699L3.3014 6.07399C2.7752 6.17646 2.32801 6.52091 2.0949 7.00383C1.86178 7.48674 1.87013 8.05127 2.11732 8.52688L2.35304 8.98085C2.55747 9.37145 2.44743 9.85254 2.09411 10.1156L1.68108 10.4249C1.25267 10.7459 1.00052 11.2496 1 11.7847C0.999739 12.32 1.25136 12.8241 1.67926 13.1456H1.67874ZM17.8284 31.8842L12.2394 28.4634C12.1059 28.3847 11.9404 28.3847 11.8071 28.4634L6.21347 31.8842V20.7741C6.35428 20.7718 6.49456 20.753 6.63094 20.7181L7.12975 20.5887C7.55686 20.4756 8.00275 20.6896 8.18163 21.0938L8.39179 21.5639C8.60769 22.0557 9.04497 22.415 9.56909 22.5319C9.69477 22.5608 9.82332 22.5751 9.95239 22.5754C10.3547 22.5751 10.7435 22.4309 11.0489 22.1689L11.4379 21.838C11.7735 21.5504 12.2684 21.5504 12.6037 21.838L12.9928 22.1689C13.4011 22.5165 13.9495 22.651 14.4723 22.5319C14.9951 22.413 15.431 22.0544 15.6488 21.5645L15.8579 21.0941C16.0357 20.6902 16.4811 20.4758 16.9077 20.589L17.4109 20.7186C17.5476 20.7533 17.6876 20.772 17.8284 20.7746V31.8842ZM2.16061 11.0658L2.57364 10.7566C3.24168 10.2591 3.44924 9.34981 3.06307 8.61162L2.82735 8.15765C2.69671 7.90603 2.69228 7.60747 2.81561 7.35219C2.93895 7.09665 3.17545 6.91439 3.45367 6.86041L3.95145 6.76341C4.77177 6.6067 5.35534 5.87581 5.32665 5.04115L5.31075 4.52903C5.30188 4.24533 5.4273 3.97441 5.64894 3.79762C5.87084 3.62083 6.16315 3.55903 6.43746 3.63074L6.93132 3.76034C7.73783 3.97441 8.58005 3.5692 8.91616 2.80572L9.12529 2.33533C9.24028 2.07614 9.47104 1.88631 9.74744 1.82347C10.0241 1.76037 10.3141 1.83155 10.53 2.01538L10.919 2.34654C11.5531 2.88995 12.489 2.88995 13.1231 2.34654L13.5122 2.01538C13.7281 1.83155 14.018 1.76037 14.2947 1.82347C14.5711 1.88631 14.8019 2.07614 14.9168 2.33533L15.126 2.80572C15.4623 3.5692 16.3043 3.97415 17.1108 3.76007L17.6047 3.63074C17.8792 3.55877 18.1715 3.62057 18.3934 3.79762C18.6153 3.97441 18.7405 4.24585 18.7316 4.52929L18.7157 5.04167C18.6868 5.87608 19.2706 6.60722 20.0907 6.76367L20.5885 6.86067C20.8669 6.91491 21.1034 7.09718 21.2268 7.35245C21.3499 7.60799 21.3457 7.90655 21.2148 8.15817L20.9791 8.61214C20.5929 9.35033 20.8004 10.2596 21.4688 10.7571L21.8815 11.0663C22.1081 11.2361 22.2416 11.5026 22.2419 11.7855C22.2419 12.0687 22.1089 12.3352 21.8826 12.5054L21.4661 12.8181C20.7997 13.3158 20.5929 14.224 20.9785 14.9614L21.2148 15.4167C21.3457 15.6683 21.3501 15.9669 21.2268 16.2222C21.1034 16.4777 20.8669 16.66 20.5885 16.714L20.0907 16.811C19.2706 16.9677 18.6868 17.6986 18.7157 18.5332L18.7316 19.0453C18.7405 19.3288 18.6151 19.6 18.3934 19.7768C18.1715 19.9535 17.8792 20.0153 17.6049 19.9434L17.1108 19.814C16.3046 19.6002 15.4623 20.0052 15.126 20.7687L14.9171 21.239C14.8019 21.4982 14.5713 21.6878 14.2947 21.7509C14.0183 21.8137 13.7283 21.7426 13.5122 21.5587L13.1231 21.2278C12.489 20.6842 11.5534 20.6842 10.9193 21.2278L10.5302 21.5587C10.3143 21.7426 10.0241 21.8137 9.7477 21.7509C9.47104 21.6878 9.24054 21.4982 9.12529 21.239L8.91642 20.7687C8.64602 20.1543 8.03821 19.7577 7.36704 19.7577C7.21997 19.7577 7.07369 19.7768 6.93158 19.814L6.43746 19.9434C6.16315 20.0153 5.87084 19.9535 5.6492 19.7768C5.4273 19.6 5.30188 19.3288 5.31075 19.0453L5.32665 18.5332C5.3556 17.6986 4.77204 16.9677 3.95197 16.811L3.4542 16.714C3.17571 16.6597 2.93921 16.4775 2.81614 16.2222C2.6928 15.9666 2.69723 15.6681 2.82787 15.4165L3.06411 14.9614C3.44976 14.224 3.24325 13.3158 2.57651 12.8178L2.16008 12.5052C1.93375 12.3352 1.80077 12.0687 1.80077 11.7855C1.80103 11.5023 1.93453 11.2358 2.16113 11.0661L2.16061 11.0658Z" fill={color} stroke={color} />
  <path d="M14.3433 9.79847L11.2323 12.737L9.73916 11.2009C9.57363 11.0305 9.30108 11.0266 9.13083 11.1921C8.96042 11.3578 8.95654 11.6302 9.12207 11.8006L10.9128 13.6389C11.0792 13.8063 11.3481 13.812 11.5213 13.6517L14.9432 10.4242C15.0263 10.3458 15.0749 10.2376 15.0781 10.1234C15.0813 10.0093 15.039 9.89859 14.9604 9.81566C14.7939 9.64255 14.5193 9.63497 14.3433 9.79847Z" fill={color} stroke={color} />
  <path d="M12.0347 5.27734C8.4791 5.27734 5.58798 8.16846 5.58798 11.724C5.58798 15.2798 8.4791 18.1709 12.0347 18.1709C15.5904 18.1709 18.4815 15.2798 18.4815 11.724C18.4815 8.16846 15.5904 5.27734 12.0347 5.27734ZM12.0347 17.3079C8.95376 17.3079 6.451 14.8007 6.451 11.724C6.451 8.64734 8.95376 6.14036 12.0347 6.14036C15.1186 6.14036 17.6185 8.64026 17.6185 11.724C17.6185 14.8078 15.1186 17.3079 12.0347 17.3079Z" fill={color} stroke={color} />
</svg>;

const MARK_SVG = ({ stroke = '#C4C4C4', fill = 'rgba(196, 196, 196, 0.4)', ...props }) => <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path d="M4.49001 0.5H20.9794L16.9511 5.69356L16.7134 6L16.9511 6.30644L20.9794 11.5H4.49001L0.611802 6L4.49001 0.5Z" fill={fill} stroke={stroke} />
</svg>;

const Mark = ({ fill, stroke, ...props }) => <Icon
  component={() => <MARK_SVG fill={fill} stroke={stroke} {...props} />}
  className={styles.ecp}
/>;

const Ecp = ({ fill, ...props }) => <Icon
  component={() => <ECP_SVG color={fill} {...props} />}
  className={styles.ecp}
/>;

const Chain = (props) => <Icon type={'link'}
  className={styles.chain}
  {...props}
/>;

const CaretUp = (props) => <Icon
  type={'caret-up'}
  className={styles.caret}
  {...props}
/>;

const CaretDown = (props) => <Icon
  type={'caret-down'}
  className={styles.caret}
  {...props}
/>;

const Attach = (props) => <Icon
  type={'paper-clip'}
  className={styles.caret}
  {...props}
/>;

export {
  Close,
  Mark,
  Ecp,
  Chain,
  CaretUp,
  CaretDown,
  Attach
};
