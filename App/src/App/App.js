import React, { Component } from 'react';
import { Layout, Icon, Button,Avatar} from 'antd';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import ProfitRoute from '../Component/Profit/Profit';
import './App.less';
import './FootMenu';
import './TopMenu';
import LeftMenu from './LeftMenu';
import AdminRouter from '../Admin'
import UserRouter from '../User'
import LoginOut from "../Component/LoginRegister/LoginOut";
const { Header, Footer, Sider, Content } = Layout;
class App extends Component {
    constructor(props){
        super(props);
        const url = window.role;
        if (window.location.pathname.split('/')[1]!==url){
            console.log(123);
            window.location.href = `/${url}`;
        }
    }

    componentDidMount() {
        console.log(window.authInfor);
        console.log(window.role);
        // console.log(window.location.pathname);
    }

    goToLogin = () => {
       window.location.href='/login'
    };

    render() {
    return (
        <BrowserRouter>
            <Layout style={{minHeight: '100vh'}}>
                <LeftMenu/>
                <Layout>
                    <Header style={{background: '#bde3ff', padding: 0}}>
                        <div style={{float:"right",paddingRight:10}}>
                            {window.role ==='tourist' && <Button
                                onClick={this.goToLogin}
                                type="primary"
                            >
                                登录
                            </Button>}
                            {(window.role==='user'||window.role==='admin') &&<LoginOut/>}
                        </div>
                    </Header>
                    <Content style={{margin: '10px 10px', padding: 20, background: '#fff'}}>
                        <Switch>
                            <Route exact path='/' component={()=><Redirect to={window.role}/>}/>
                            <Route path='/admin' component={AdminRouter}/>
                            <Route path='/user' component={UserRouter}/>
                            <Route exact path="/" component={() =><Redirect to="/HomePage"/>}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
  }
}

export default App;
