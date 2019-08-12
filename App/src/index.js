import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import Layout from './Auth/index'
import Index from './Index/index'
import preprocess from './preprocess'
import { Spin } from 'antd'
import store from "store";

ReactDOM.render((
    <Spin size="large">
        <div style={{ width: '100%', height:'100vh'}}/>
    </Spin>
),document.getElementById('root'));

const LoginUser = ['admin', 'user', 'tourist'];

preprocess().then(() => {
    ReactDOM.render(<App/>, document.getElementById('root'));
}).catch(() => {
    const url =window.location.pathname.split('/')[1].toString();
    console.log(window.location.pathname);
    if(url ==='login'|| url=== 'register'){
        ReactDOM.render(<Layout/>, document.getElementById('root'));
    }
    else if(store.get('token').Api_Token!==null){
        ReactDOM.render(<Index/>, document.getElementById('root'));
    }
    else if(url === 'forgot'){
        ReactDOM.render(<Layout/>, document.getElementById('root'));
    }
});
