import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import preprocess from './preprocess'
import Auth from './Auth/loginIndex'
import Layout from  './Auth/Layout'
import { Spin } from 'antd'
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
  <Spin size="large">
      <div style={{ width: '100%', height:'100vh'}}/>
  </Spin>
),document.getElementById('root'));

const LoginUser = ['admin', 'vip', 'tourist'];

const getPathname = () => {
    const pathIndex = window.location.pathname.split('/');
    const path = pathIndex[1] || '';
    return LoginUser.indexOf(path);

};
if (getPathname()){
    preprocess().then(() => {
        ReactDOM.render(<App/>, document.getElementById('root'));
    }).catch(() => {
        ReactDOM.render(<App/>, document.getElementById('root'));
    });
} else {
    ReactDOM.render(<Layout/>, document.getElementById('root'));
}
