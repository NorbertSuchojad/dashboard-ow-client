import { createGlobalStyle } from 'styled-components';

import sfuiMedium from './SFUIText-Medium.woff';
import sfuiSemibold from './SFUIText-Semibold.woff';

export default createGlobalStyle`
@font-face {
    font-family: 'sfuiMedium';
    font-style: normal;
    font-weight: normal;
    src: local('sfuiMedium'), url(${sfuiMedium}) format('woff');
}
@font-face {
    font-family: 'sfuiSemibold';
    font-style: normal;
    font-weight: normal;
    src: local('sfuiSemibold'), url(${sfuiSemibold}) format('woff');
}
`;