import axios from 'axios';
import store from 'store';
import {message,notification} from 'antd'

axios.defaults.baseURL = 'http://localhost:8000';

axios.interceptors.request.use(config => {
    if(store.get('token')){
        config.headers['Api_Token'] = store.get('token').Api_Token;
        return config
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
});
axios.interceptors.response.use(response=> {
    if (response.config.method === 'get') {
        //
    }
    return response;
},error => {
    const status = error.response.status;
    let errorMessage ;
    let logoutMessage;
    const auth = window.location.pathname.split('/')[1];
    console.log(window.location.pathname);
    if (status===401){
        if (auth===('user' ||'admin')){
            errorMessage = error.response.data.message || '身份信息过期或者未登录，请登录';
        }
        else if(auth==='login'){
            logoutMessage = error.response.data.message ||'欢迎登录'
        }
        else if (auth==='register'){
            logoutMessage = error.response.data.message ||'欢迎注册'
        }
    }
    else if(status===422){
        errorMessage = error.response.data.message || '请重新填写表单';
    }else {
        errorMessage = error.response.data.message || '暂时未定义错误';
    }
    if (!errorMessage && !logoutMessage) {
        return Promise.reject(error);
    }
    if (errorMessage){
        message.error(errorMessage);
    }
    else if (logoutMessage){
        message.info(logoutMessage);
    }
    return Promise.reject(error);
});

export default axios;
