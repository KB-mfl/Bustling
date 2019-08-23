import React from 'react'
import {Switch,Route,Redirect,BrowserRouter} from "react-router-dom";
import HomePage from "../Component/HomePage/HomePage";
import Profit from "../Component/Profit/Profit";
import NetPartnerMessage from "../Component/Notification/NotificationItem/NetPartnerMessage";
import SystemMessage from "../Component/Notification/NotificationItem/SystemMessage";
import ViewProcess from "./Writing/ViewProcess";
import WritePaper from "./Writing/WritePaper";
import ArticleLayout from "../Component/Article/ArticleLayout";

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageID:window.location.pathname.split('/')[4]||1
        }
    }
    componentDidMount() {
        console.log(window.auth);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/user" component={() =><Redirect to="/user/homePage"/>}/>
                    <Route path='/user/homepage' component={HomePage}/>
                    <Route path='/user/writing/writePapers' component={WritePaper}/>
                    <Route path='/user/writing/viewProcess' component={ViewProcess}/>
                    <Route path='/user/profit' component={Profit}/>
                    <Route path='/user/notification/netPartnerMessage/' component={NetPartnerMessage}/>
                    <Route path='/user/notification/systemMessage' component={SystemMessage}/>
                    <Route path='/user/article/:articleId' component={ArticleLayout}/>
                </Switch>
            </div>
        )
    }
}
