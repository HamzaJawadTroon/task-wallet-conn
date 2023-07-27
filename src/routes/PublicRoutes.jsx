import LoginPage from 'pages/auth/login/Login';
import FormWeb3 from 'pages/form/FormWeb3';

import {
  LOGIN,
  Form_Web3
} from 'helpers/page-urls';

const ROUTES = [
  {
    routeName: 'LogIn',
    path: LOGIN,
    component: LoginPage
  },
  {
    routeName: 'Form Web3',
    path: Form_Web3,
    component: FormWeb3
  }
];

export default ROUTES;
