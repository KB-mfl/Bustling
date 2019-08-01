import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import Layout from './Auth/index'
import Index from './Index/index'
import preprocess from './preprocess'
import { Spin } from 'antd'

ReactDOM.render((
    <Spin size="large">
        <div style={{ width: '100%', height:'100vh'}}/>
    </Spin>
),document.getElementById('root'));

const LoginUser = ['admin', 'user', 'tourist'];

preprocess().then(() => {
    console.log(22);
    ReactDOM.render(<App/>, document.getElementById('root'));
}).catch(() => {
    const url =window.location.pathname.split('/')[1].toString();
    if (url ==='login'|| 'register'){
        ReactDOM.render(<Layout/>, document.getElementById('root'));
    }
    else if(url === 'forgot'){
        ReactDOM.render(<Layout/>, document.getElementById('root'));
    } else {
        ReactDOM.render(<Index/>, document.getElementById('root'));
    }
});
