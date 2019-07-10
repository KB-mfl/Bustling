import React, { Component } from 'react';
import { Button, Layout, Icon} from 'antd';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import ProfitRoute from '../Component/Profit/Profit';
import lazyload from '../lazyload'
import './App.less';
import './FootMenu';
import './TopMenu';
import LeftMenu from './LeftMenu';
const { Header, Footer, Sider, Content } = Layout;
class App extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
    return (
        <BrowserRouter>
            <Layout style={{minHeight: '100vh'}}>
                <LeftMenu/>
                <Layout>
                    <Header style={{background: '#bde3ff', padding: 0}}>
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff'}}>
                        <Switch>
                            <Route exact path="/" component={() => <Redirect to="/dashboard"/>}/>
                            <Route path="/dashboard" component={lazyload(() => import('../Component/Dashboard/Dashboard'))}/>
                            <Route path="/notification" component={lazyload(() => import('../Component/Notification/Notification'))}/>
                            <Route path="/profit" component={ProfitRoute}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
  }
}

export default App;
