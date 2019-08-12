import React from 'react'
import { Menu } from 'antd';
import './index.less'
import Login from '../Component/LoginRegister/Login'
import Register from '../Component/LoginRegister/Register'
import ForgotPassword from '../Component/LoginRegister/ForgotPassword'
import { Route, Switch, Redirect,BrowserRouter } from "react-router-dom";

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: window.location.pathname.split('/')[1]
        }
    }

    componentDidMount() {


    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        },function () {
            window.location.href=`/${this.state.current}`
        });


        // let promise = new Promise(resolve => {
        //     this.setState({
        //         current:e.key
        //     })
        //     resolve();
        // })
        // promise.then(()=>{
        //     window.location.href = `/${this.state.current}`
        // })
    };




    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                        className="tabs"
                    >
                        <Menu.Item key="register" className="register">注册</Menu.Item>
                        <Menu.Item key="login" className="login">登陆</Menu.Item>
                    </Menu>
                    <div className="form-container">
                        <Switch>
                            <Route exact path='/' component={()=><Redirect to={this.state.current}/>}/>
                            <Route path='/login' component={Login}/>
                            <Route path='/register' component={Register}/>
                            <Route path='/forgot' component={ForgotPassword}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default Layout
