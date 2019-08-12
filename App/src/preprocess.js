// import http from 'axios'
import httpService from './service'

export default () => new Promise((resolve, reject) => {
    window.roles = [
        {id:'0', alias:'admin', name:'管理员'},
        {id:'1', alias:'user', name:'用户'},
        {id:'-1', alias:'tourist',name:'游客'}
    ];
    httpService.get('/auth/auth').then(r => {
        console.log(r.data);
        window.authInfor = r.data;
        window.authIndex = r.data.role.roleId;
        window.authname=r.data.username;
        window.role=window.roles[window.authIndex].alias;
        console.log(window.role);
        resolve();
    }).catch(e => {
        window.role = 'tourist';
       reject();
       console.log("err")
    });
});
