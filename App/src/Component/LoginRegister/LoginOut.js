import React from 'react'
import { Button } from "antd";
import store from 'store'
export default class LoginOut extends React.Component{
    constructor(props){
        super(props);
    }
    LoginOut(){
        store.remove('token');
        window.location.href='/login'
    }
    render() {
        return(
                <Button type="danger" onClick={this.LoginOut}>
                    登出
                </Button>
        )
    }
}
