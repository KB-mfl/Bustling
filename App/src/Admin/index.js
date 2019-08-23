import React from 'react'
import {Switch,Route,Redirect,BrowserRouter} from "react-router-dom";
import HomePage from "../Component/HomePage/HomePage";
import Dashboard from './Dashboard/Dashboard'
import Profit from "../Component/Profit/Profit";
import NetPartnerMessage from "../Component/Notification/NotificationItem/NetPartnerMessage";
import SystemMessage from "../Component/Notification/NotificationItem/SystemMessage";
import Setting from './Setting/Setting'
import ArticleLayout from "../Component/Article/ArticleLayout";

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageID:window.location.pathname.split('/')[4]||1
        }
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/admin' component={() =><Redirect to='/admin/homePage'/>}/>
                    <Route path='/admin/homepage' component={HomePage}/>
                    <Route path='/admin/dashboard' component={Dashboard}/>
                    <Route path='/admin/profit' component={Profit}/>
                    <Route path='/admin/notification/netPartnerMessage/' component={NetPartnerMessage}/>
                    <Route path='/admin/notification/systemMessage' component={SystemMessage}/>
                    <Route path='/admin/setting' component={Setting}/>
                    <Route path='/admin/article/:articleId' component={ArticleLayout}/>
                </Switch>
            </div>
        )
    }
}
