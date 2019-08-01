// import http from 'axios'
import httpService from './service'

export default () => new Promise((resolve, reject) => {
    window.roles = [
        {id:'0', alias:'admin', name:'管理员'},
        {id:'1', alias:'user', name:'用户'},
        {id:'-1', alias:'tourist',name:'游客'}
    ];
    httpService.get('/auth/auth').then(r => {
        window.authIndex = r.data.role.roleId;
        window.role=window.roles[window.authIndex].alias;
        resolve();
    }).catch(e => {
        window.role = 'tourist';
       reject();
       console.log("err")
    });
});
