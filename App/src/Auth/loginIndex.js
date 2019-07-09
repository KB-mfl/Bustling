import React from 'react'
import { Menu } from 'antd';
import './auth.less'
import Login from './login'
import Rigister from './register'
class loginIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 'login'
        }
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
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
                    { this.state.current === 'login' && <Login/> }
                    { this.state.current === 'register' && <Rigister/> }
                </div>
            </div>
        )
    }
}

export default loginIndex
