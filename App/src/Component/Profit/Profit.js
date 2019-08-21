import React from 'react'
import { Button,Card } from "antd";
import LoginOut from '../LoginRegister/LoginOut'
import store from 'store'
import PersonalInfor from "./PersonalInfor";
import ChangePassword from './ChangePassword'
import ChangePersonalInfor from './ChangePersonalInfor'
class profit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            key:'username',
            nowTitleKey:`username`
        }
    }
    componentDidMount() {
    }

    loginOut = () => {
        store.remove('token');
        window.location.href='/login'
    }

    onChangeTab = (key,type) => {
        this.setState({
            [type]:key
        })
    }

    render() {
        const titles = [{
            key:'username',
            tab:`${window.authname}的个人信息`
        },{
            key:'changePassword',
            tab:'更改密码'
        },{
            key:'updateProfit',
            tab:'更改个人信息'
        }];
        const contentList = {
            username:<PersonalInfor/>,
            changePassword:<ChangePassword/>,
            updateProfit:<ChangePersonalInfor/>
        }
        return (
            <Card
            tabList={titles}
            bordered={false}
            defaultActiveTabKey={this.state.key}
            onTabChange={key => {
                this.onChangeTab(key,'nowTitleKey')
            }}
            >
                {contentList[this.state.nowTitleKey]}
            </Card>
        )
    }
}

export default profit
