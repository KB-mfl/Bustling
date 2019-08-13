import React from 'react'
import {Switch,Route,Redirect,BrowserRouter} from "react-router-dom";
import HomePage from "../Component/HomePage/HomePage";
import Dashboard from '../Component/HomePage/HomePage'
import Writing from "./Writing/Writing";
import Profit from "../Component/Profit/Profit";
import Notification from '../Component/Notification/Notification'
import NetPartnerMessage from "../Component/Notification/NotificationItem/NetPartnerMessage";
import SystemMessage from "../Component/Notification/NotificationItem/SystemMessage";
import ViewProcess from "./Writing/ViewProcess";
import WritePaper from "./Writing/WritePaper";

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
                    <Route path='/user/dashboard' component={Dashboard}/>
                    <Route path='/user/writing/writePapers' component={WritePaper}/>
                    <Route path='/user/writing/viewProcess' component={ViewProcess}/>
                    <Route path='/user/profit' component={Profit}/>
                    <Route path={`/user/notification/netPartnerMessage/${this.state.pageID}`} component={NetPartnerMessage}/>
                    <Route path='/user/notification/systemMessage' component={SystemMessage}/>
                </Switch>
            </div>
        )
    }
}
