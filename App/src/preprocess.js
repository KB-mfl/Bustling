// import http from 'axios'
import httpService from './service'

export default () => new Promise((resolve, reject) => {
    window.roles = [
        {id:'1', alias:'admin', name:'管理员'},
        {id:'2', alias:'vip', name:'用户'},
        {id:'3', alias:'tourist',name:'游客'}
    ];
    httpService.get('auth').then(r => {
        window.auth = r.data;
        resolve();
    }).catch(e => {
       reject();
    });
});
